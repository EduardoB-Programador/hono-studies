import { parentPort, workerData } from "node:worker_threads";
import type { operation } from "./Own";
import { comparePass, hashPass, type Hashed } from "./methods";

const operation = workerData as {method?:string}

function assertDataType(data:any): data is operation {
    if (!data.method || !data.data)
        return false

    if (data.method === "hash" || data.method === "compareHash")
        return true
    return false
}

if (assertDataType(operation)) {
    let data
    if (operation.method === "hash" && typeof operation.data === "string")
        data = await hashPass(operation.data)
    else
        data = await comparePass(operation.data[0], operation.data[1] as Hashed)

    parentPort?.postMessage(["Done", data])
}

parentPort?.close()