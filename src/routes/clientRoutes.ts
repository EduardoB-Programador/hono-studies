import { Hono } from "hono";

const clientRoutes = new Hono()

clientRoutes.get("/:id[0-9]+", async c => {
    
})

clientRoutes.post("/", async c => {
    
})


export default clientRoutes;