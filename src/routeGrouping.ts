import { Hono, type MiddlewareHandler } from "hono"
import clientRoutes from "./routes/clientRoutes"
import payRoutes from "./routes/paymentRoutes"
import productRoutes from "./routes/productRoutes"
import staffRoutes from "./routes/staffRoutes"
import type { Response } from "./repository/model/types"


const repoRoutes = new Hono()

repoRoutes.route("/clients", clientRoutes)
repoRoutes.route("/pays", payRoutes)
repoRoutes.route("/products", productRoutes)
repoRoutes.route("/staffs", staffRoutes)

export const middleware: MiddlewareHandler = async (c, next) => {
    const obj = await c.req.json() as {id?:number}

    if (!obj.id)
        return c.json({status: "failure", error: "No id in json"} as Response)

    await next()
}

export default repoRoutes