import { Hono } from "hono";
import { sValidator } from "@hono/standard-validator";
import { superUserSchema } from "./zodSchemas/schemas";
import { createNewEntry } from "../repository/db/dbOperations";
import type { Response } from "../repository/model/types";
import { sign } from "hono/jwt";

/**
 * Structure of the POST request to the user POST route:
 * 
 * {
 *  name:string
 *  email:string
 *  password:string
 *  image?:image
 *  options?:json
 * }
 * 
 * Structure of the GET request to the user GET route:
 * 
 * {
 *  name:string
 *  image:image
 *  options:json
 * }
 */
const JWT = process.env.JWT ?? "liil1"
const userRoutes = new Hono()

userRoutes.post("/new", sValidator("json", superUserSchema), async c => {
    const reqJson = c.req.valid("json")

    const data = await createNewEntry({...reqJson, table: "account_superuser"})
    if (data.status === "failure")
        return c.json({status: "failure", error: data.message} as Response, 500)
    return c.json({status: "success"} as Response, 201)
})

userRoutes.post("/login", sValidator("json", superUserSchema), async c => {
    const reqJson = c.req.valid("json")
    
})

export default userRoutes;