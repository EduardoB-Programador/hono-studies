import { Worker } from "node:worker_threads"

type JobType = "hash" | "compare"

type Job = {
    id: number
    resolve: (value: string | boolean) => void
    reject: (reason:Error) => void
}

type WorkerState = {
    busy: boolean
    worker: Worker
}

export class BcryptWorkerPool {
    private static pool: BcryptWorkerPool
    private workers: WorkerState[] = []
    private queue: Array<{type: JobType; data: string | [string, string]; job: Job}> = []
    private pendingJobs = new Map<number, Job>()
    private jobCounter = 0

    private constructor(workers: number) {
        for (let i = 0; i < workers; i++)
            this.spawnWorker()
    }

    public static getInstance() {
        const amount = Number(process.env.MAX_THREADS) ?? 4
        if (!BcryptWorkerPool.pool)
            BcryptWorkerPool.pool = new BcryptWorkerPool(amount)
        return BcryptWorkerPool.pool
    }

    private spawnWorker() {
        const worker = new Worker("./src/utils/worker.ts")
        const state: WorkerState = {worker, busy: false}

        worker.on("message", ({id, result, error}) => {
            const job = this.pendingJobs.get(id)
            if (!job)
                return

            this.pendingJobs.delete(id)
            state.busy = false

            if (error)
                job.reject(new Error(error))
            else
                job.resolve(result)

            this.drain(state)
        })

        worker.on("error", (err) => {
            this.pendingJobs.forEach(job => job.reject(new Error(err as string)))
            this.pendingJobs.clear()
            this.workers = this.workers.filter(s => s !== state)
            this.spawnWorker()
        })

        this.workers.push(state)
    }


    private drain(state:WorkerState) {
        if (this.queue.length === 0)
            return

        const next = this.queue.shift()!
        state.busy = true
        this.pendingJobs.set(next.job.id, next.job)
        state.worker.postMessage({ id: next.job.id, type: next.type, data: next.data })
    }

    private enqueue(type: JobType, data: string | [string, string]): Promise<string|boolean> {
        return new Promise((resolve, reject) => {
            const job: Job = {id:this.jobCounter++, resolve, reject}
            const freeWorker = this.workers.find(w => !w.busy)

            if (freeWorker) {
                freeWorker.busy = true
                this.pendingJobs.set(job.id, job)
                freeWorker.worker.postMessage({id: job.id, type, data})
            } else {
                this.queue.push({type, data, job})
            }
        })
    }

    public hash(password: string):Promise<string> {
        return this.enqueue("hash", password) as Promise<string> 
    }

    public compare(password:string, hash:string):Promise<boolean> {
        return this.enqueue("compare", [password, hash]) as Promise<boolean>
    }
}