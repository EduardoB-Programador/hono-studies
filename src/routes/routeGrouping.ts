import clientRoutes from "./clientRoutes";
import payRoutes from "./paymentRoutes";
import productRoutes from "./productRoutes";
import userRoutes from "./userRoutes";
import staffRoutes from "./staffRoutes";
import app from "../..";
import type { MiddlewareHandler } from "hono";
import type { Response } from "../repository/model/types";

app.route("/user", userRoutes)
app.route("/clients", clientRoutes)
app.route("/pays", payRoutes)
app.route("/products", productRoutes)
app.route("/staffs", staffRoutes)

export const middleware: MiddlewareHandler = async (c, next) => {
    const obj = await c.req.json() as {id?:number}

    if (!obj.id)
        return c.json({status: "Failure", error: "No id in json"} as Response)

    await next()
}