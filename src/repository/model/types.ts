import { genSalt, hash } from "bcrypt";

type password = string

export function hashPass(pass:string):password {

    return ""
} 

export type superuser = {
    name: string,
    email: string,
    password?: password,
    //image?: File
    options?: object
}

export type staff = {

}