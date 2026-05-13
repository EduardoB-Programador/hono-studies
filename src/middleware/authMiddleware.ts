import type { MiddlewareHandler } from "hono";
import type { Response } from "../repository/model/types";
import { verify } from "hono/jwt";

const JWT = process.env.JWT ?? "liil1"

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const authHeader = c.req.header("Authorization")

    if (!authHeader || authHeader.startsWith("Bearer "))
        return c.json({status: "failure", error: "unauthorized"} as Response, 401)

    const token = authHeader.split(" ")[1]!

    try {
        const payload = await verify(token, JWT, "HS256")
        console.log(payload);
        c.set("jwtPayload", payload)
        await next()
    } catch (err) {
        if (err instanceof Error)
            return c.json({status: "failure", error: err.message} as Response, 401)
        return c.json({status: "unknown", error: err} as Response, 500)
    }
}