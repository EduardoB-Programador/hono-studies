import { Pool } from "pg";
import type { superuser, client, payment, product, staff } from "../model/types";
import { BcryptWorkerPool } from "../../utils/pool";

const psqlPool = new Pool({
    host: process.env.HOST_DB ?? "",
    port: Number(process.env.PORT_DB) ?? Number(), 
    user: process.env.USER_DB ?? "",
    password: process.env.PASS_DB ?? "",
    database: process.env.NAME_DB ?? ""
})
const workersPool: BcryptWorkerPool = BcryptWorkerPool.getInstance()

type dbUser = superuser & {password: string}
type dbStaff = staff & {password: string}
type table = (dbUser | dbStaff | client | payment | product) & {table: "account_superuser" | "client" | "staff" | "product" | "payment"}
type data = {
    status: "success" | "failure" | "unknown"
    rowAmount?: number
    data?: any[]
    message?: string | unknown
}

function getColumns(data:table) {
    const columns = Object.keys(data)
    columns.pop()
    return "(" + columns.join(", ") + ")"
}

function getValues(data:table) {
    const values = Object.values(data)
    values.pop()
    return "('" + values.join("', '") + "')"
}

export async function createNewEntry(entry:table):Promise<data> {
    if ((entry as dbUser).password)
        (entry as dbUser).password = await workersPool.hash((entry as dbUser).password)
        
    const statement = `INSERT INTO ${entry.table} ${getColumns(entry)} VALUES${getValues(entry)};`
    //console.log(statement);
    
    try {
        const data = await psqlPool.query(statement)
        
        return {status: "success"}
    } catch (err) {
        if (err instanceof Error)
            return {status: "failure", message: err.message}
        return {status: "unknown", message: err}
    }
}

