import { parentPort, workerData } from "node:worker_threads";
import type { workerInput } from "./Own";

const data = workerData as workerInput<any, any>

const result = data.function(data)

parentPort?.postMessage(result)