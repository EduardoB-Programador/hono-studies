import { parentPort } from "node:worker_threads";
import { compare, hash } from "bcrypt";

const SALT = 15

parentPort?.on("message", async ({id, type, data}) => {
    try {
        let result:string|boolean

        if (type === "hash")
            result = await hash(data as string, SALT)
        else 
            result = await compare(data[0] as string, data[1] as string)

        parentPort?.postMessage({id, result})
    } catch (err) {
        parentPort?.postMessage({id, error: (err as Error).message})
    }
})