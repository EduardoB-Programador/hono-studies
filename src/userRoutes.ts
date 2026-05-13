import { Hono } from "hono";
import { sValidator } from "@hono/standard-validator";
import { superUserSchema } from "./zodSchemas/schemas";
import { createNewEntry, fetchUser } from "../repository/db/dbOperations";
import type { Response } from "../repository/model/types";
import { sign } from "hono/jwt";
import { BcryptWorkerPool } from "../utils/pool";

const workersPool: BcryptWorkerPool = BcryptWorkerPool.getInstance()

const JWT = process.env.JWT ?? "liil1"
const userRoutes = new Hono()

userRoutes.post("/new", sValidator("json", superUserSchema), async c => {
    const reqJson = c.req.valid("json")

    reqJson.password = await workersPool.hash(reqJson.password)

    const data = await createNewEntry({...reqJson, table: "account_superuser"})

    if (data.status === "failure" || data.status === "unknown")
        return c.json({status: "failure", error: data.message} as Response, data.code)
    return c.json({status: "success"} as Response, data.code)
})

userRoutes.post("/login", sValidator("json", superUserSchema), async c => {
    const reqJson = c.req.valid("json")
    
    try {
        const data = await fetchUser(reqJson)
        if (data.status === 'failure' || data.status === "unknown")
            return c.json({status: data.status, error: data.message} as Response, data.code)

        const valid = await workersPool.compare(reqJson.password, data.data![0]!.password)
        if (!valid)
            return c.json({status: "failure", error: "Incorrect credentials"} as Response, 400)

        const token = await sign({
            userPayload:{
                userName: data.data![0]!.name,
                email: data.data![0]!.email
            },
            exp: Math.floor(Date.now() / 1000 / 60 / 60 / 24)
        }, JWT, "HS256")

        return c.json({status: "success", token: `Bearer ${token}`} as Response)
    } catch (err) {
        if (err instanceof Error)
            return c.json({status: "failure", error: err.message} as Response)
        return c.json({status: "unknown", error: err} as Response)
    }
})

export default userRoutes;