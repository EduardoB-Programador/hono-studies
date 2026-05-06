import { Worker } from "node:worker_threads"
import { hashPass } from "./methods"

type method = "hash" | "compareHash"
type operation<T extends method> = {
    method: method,
    data: string
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

    public newWorker(param:any, method:method) {
        
        this.usedThreads++
        console.log(`A new thread has been initiated, current amount of used threads ${this.usedThreads}`);
        const worker = new Worker("./run.ts")
        worker.on("message", (ev) => {
            const operation = ev as method
            if (method === "hash")
                hashPass(param)
        })
    }
}