//response types

export interface superuser {
    name: string
    email: string
    //image?: File
    options?: {}
}

export interface staff {
    name: string
    email: string
    user: superuser
}

export interface client {
    name: string
    secNum: string
    address: string
    user: superuser
}

export interface payment {
    user: superuser
    staff: staff
    client: client
    product: product
    amount:number
    totalPrice:number
    expDate:Date
}

export interface product {
    name: string
    price: number
    user: superuser
}

export type Response = {
    status: "Success" | "Failure" | "Unknown"
    data?: any[]
    error?: string
}