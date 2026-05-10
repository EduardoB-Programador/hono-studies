import { Hono } from "hono";
import { cors } from "hono/cors";
import repoRoutes from "./src/routes/routeGrouping";

const app = new Hono()

app.use('/*', cors())
app.get('/', async (c) => {
    // Adds a new header to the response
    c.header("X-Message", "Header de bem vindo")
    
    // prints all request headers
    const reqHeaders = c.req.header()
    return c.json({message: JSON.stringify(reqHeaders)})
})

app.route("/repo", repoRoutes)

export default app