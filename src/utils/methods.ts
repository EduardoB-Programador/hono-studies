import { compare, hash } from "bcrypt"
import { Own } from "./Own"

const own = Own.getInstance()

const saltAmount = 15
type Hashed = `$${number}$${number}${string}`

type hashResponse = {
    type: "error" | "success",
    data?: Hashed
}

export async function hashPass(pass:string): Promise<hashResponse> {
    const hashedPass = await hash(pass, saltAmount)
    
    if (isHashed(hashedPass)) {
        return {type: 'success', data: hashedPass}
    }
    return {type: "error"}
}

export async function comparePass(pass1:string, pass2:Hashed): Promise<boolean> {
    return await compare(pass1, pass2)
}

export function isHashed(pass:string): pass is Hashed {
    let currentIndex = 0
    if (pass.at(currentIndex) !== "$")
        return false
    
    currentIndex++
    if (!(pass.at(currentIndex)! in "1234567890".split("")))
        return false
    
    currentIndex++
    if (!/[aby]/.test(pass.at(currentIndex)!))
        return false

    currentIndex++
    if (pass.at(currentIndex)! !== "$")
        return false
    
    currentIndex++
    if (pass.substring(currentIndex, currentIndex + 2) !== saltAmount.toString())
        return false
    
    return true
}