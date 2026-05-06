import { expect, test } from "bun:test";
import { comparePass, hashPass, isHashed } from "../src/utils/methods";

const pass1 = "awawa"
const pass2 = "wawa a"

test("isHashed runs", async () => {
    expect(isHashed("$1a$15")).toBeTrue()
    expect(isHashed("$1b$15")).toBeTrue()
    expect(isHashed("1$$1$$")).toBeFalse()
    expect(isHashed("$9y$11")).toBeFalse()
})

test("hashPass runs", async () => {
    const password1 = await hashPass(pass1)
    const password2 = await hashPass(pass2)
    console.log(password1.data)
    console.log(password2.data);
    
})

test("compare runs", async () => {
    const password1 = await hashPass(pass1)
    const password2 = await hashPass(pass2)
    
    expect(await comparePass(pass1, password1.data!)).toBeTrue()
    expect(await comparePass(pass2, password2.data!)).toBeTrue()
    expect(await comparePass(pass2, password1.data!)).toBeFalse()
})