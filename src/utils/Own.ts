import { Worker } from "node:worker_threads"

export type workerInput<T, Out> = {
    data: T,
    function: (param:T) => Out,
    options?: {}
}

export type workerOutput<T> = {
    data: T
}

export class Own {
    static own: Own
    totalThreads: number
    usedThreads: number
    sharedBuffer: SharedArrayBuffer
    array: Int32Array

    private constructor() {
        this.totalThreads = Number(process.env.MAX_THREADS)
        this.usedThreads = 0
        this.sharedBuffer = new SharedArrayBuffer(2)
        this.array = new Int32Array(this.sharedBuffer)
    }

    public static getInstance():Own {
        if (!Own.own) Own.own = new Own()
        return Own.own
    }

    public newWorker<T, Out>(param:workerInput<T, Out>):Promise<Worker> {
        if (this.usedThreads === this.totalThreads) {
            
        }
        
        this.usedThreads++
        console.log(`A new thread has been initiated, current amount of used threads ${this.usedThreads}`);
        return new Promise<Worker>((resolve, reject) => {
            const worker = new Worker("./run.ts", {workerData: param})
            
            worker.on("message", (msg: string | {}) => {
                console.log(msg);
                resolve(worker)
            })

            worker.on("error", (err) => reject)

            worker.on("exit", (code) => {
                if (code !== 0) 
                    reject(new Error(`Worker thread exited with code ${code}`))
                else {
                    this.usedThreads--
                    resolve(worker)
                }
            })
        })
    }
}