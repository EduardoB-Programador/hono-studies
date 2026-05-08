import { Pool } from "pg";
import type { superuser, client, payment, product, staff } from "../model/types";

const psqlPool = new Pool

type dbUser = superuser & {password: string}
type dbStaff = staff & {password: string}
type dbCliente = client
type table = dbUser | dbStaff | client | payment | product
type data = {}

export async function createNewEntry<table>(client:table):Promise<data> {
    let statement = "INSERT INTO "
    return {}
}

