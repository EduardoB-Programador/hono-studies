import { parentPort, Worker } from "node:worker_threads"
import { hashPass } from "./methods"

type method = "hash" | "compareHash" | undefined
export type operation = {
    method: method
    data: string | [string, string]
}

export class Own {
    static own: Own
    totalThreads: number
    usedThreads: number

    private constructor() {
        this.totalThreads = Number(process.env.MAX_THREADS)
        this.usedThreads = 0
    }

    public static getInstance():Own {
        if (!Own.own) Own.own = new Own()
        return Own.own
    }

    public newWorker(data:string, method:method):Promise<Worker> {
        
        this.usedThreads++
        console.log(`A new thread has been initiated, current amount of used threads ${this.usedThreads}`);
        const worker = new Worker("./run.ts", {workerData: {data: data, method: method}})
        
        return new Promise((resolve, reject) => {
            worker.on("message", (v) => {
                const message = v as string
                if (message === "Done")
                    resolve(worker)
            })

            worker.on("error", reject)
            worker.on("exit", (code) => {
                if (code !== 0) reject(new Error("Worker died with exit code " + code))
            })
        })
    }
}