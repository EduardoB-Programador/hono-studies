import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono()

app.use('/*', cors())
app.get('/', async (c) => {
    // Adds a new header to the response
    c.header("X-Message", "Header de bem vindo")
    
    // prints all request headers
    console.log(c.req.header());
    return c.json({message: "Tudo bem Cauan?"})
})

export default app