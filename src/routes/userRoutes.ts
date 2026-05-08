import { Hono } from "hono";
import { sValidator } from "@hono/standard-validator";
import { superUserSchema } from "./zodSchemas/schemas";


import { hashPass } from "../utils/methods";

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
const userRoutes = new Hono()

userRoutes.post("/new", sValidator("json", superUserSchema), async c => {
    const reqJson = c.req.valid("json")


})

userRoutes.post("/login", sValidator("json", superUserSchema), async c => {
    c.req.valid("json")
})

export default userRoutes;