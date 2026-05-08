import { z } from 'zod'

const positiveNumber = z.number().positive()

export const superUserSchema = z.strictObject({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
    //image
    options: z.object().optional()
})

export const clientSchema = z.strictObject({
    name: z.string().min(1),
    sec_num: z.string().length(11),
    address: z.string().min(1),
    user_id: positiveNumber
})

export const staffSchema = z.strictObject({
    name: z.string().min(1),
    user_id: positiveNumber,
    email: z.email(),
    password: z.string().min(8)
})

export const productSchema = z.strictObject({
    name: z.string().min(1),
    price: positiveNumber,
    user_id: positiveNumber
})

export const paymentSchema = z.strictObject({
    user_id: positiveNumber,
    staff_id: positiveNumber,
    client_id: positiveNumber,
    product_id: positiveNumber,
    amount: positiveNumber,
    total_price: positiveNumber
})