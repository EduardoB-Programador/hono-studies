import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import { staffSchema } from "./zodSchemas/schemas";

const staffRoutes = new Hono()

staffRoutes.post("/new", sValidator("json", staffSchema), async c => {
    
})



export default staffRoutes;