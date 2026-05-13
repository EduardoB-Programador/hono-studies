import { Pool } from "pg";
import type { superuser, client, payment, product, staff } from "../model/types";

const psqlPool = new Pool({
    host: process.env.HOST_DB ?? "",
    port: Number(process.env.PORT_DB) ?? Number(), 
    user: process.env.USER_DB ?? "",
    password: process.env.PASS_DB ?? "",
    database: process.env.NAME_DB ?? ""
})

type dbUser = superuser & {password: string}
type dbStaff = staff & {password: string}
type table = (dbUser | dbStaff | client | payment | product) & {table: "account_superuser" | "client" | "staff" | "product" | "payment"}
type data = {
    status: "success" | "failure" | "unknown"
    rowAmount?: number
    message?: string | unknown
    code?: 201 | 200 | 404 | 500
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
    const statement = `INSERT INTO ${entry.table} ${getColumns(entry)} VALUES${getValues(entry)};`
    //console.log(statement);
    
    try {
        const data = await psqlPool.query(statement)
        
        return {status: "success", code: 201}
    } catch (err) {
        if (err instanceof Error)
            return {status: "failure", message: err.message, code: 500}
        return {status: "unknown", message: err, code: 500}
    }
}

type rows = {
    name: string
    email: string
    password: string
    image?: string
    options?: {}
}

export async function fetchUser(user:dbUser):Promise<data & {data?: rows[]}> {

    const statement = `SELECT name, email, password, image, options FROM account_superuser WHERE email = '${user.email}' AND active = true;`

    try {
        const data = (await psqlPool.query(statement)).rows as rows[] | undefined
        if (!data)
            return {status: "failure", message: "No entry found", code: 404}
        return {status: "success", data: data}
    } catch (err) {
        if (err instanceof Error) 
            return {status: "failure", message: err.message, code: 500}
        return {status: "unknown", message: err, code: 500}
    }
}