import { z } from 'zod'

export const superUserSchema = z.object({
    name: z.string().nonoptional(),
    email: z.email().nonoptional(),
    password: z.string().min(8).nonoptional(),
    //image
    options: z.object().optional()
})

