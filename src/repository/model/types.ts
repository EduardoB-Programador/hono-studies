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
    user: superuser | number
}

export interface client {
    name: string
    secNum: string
    address: string
    user: superuser | number
}

export interface payment {
    user: superuser | number
    staff: staff | number
    client: client | number
    product: product | number
    amount:number
    totalPrice:number
    expDate:Date
}

export interface product {
    name: string
    price: number
    user: superuser | number
}

export type Response = {
    status: "success" | "failure" | "unknown"
    data?: any[]
    error?: string
}