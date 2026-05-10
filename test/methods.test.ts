import { expect, test } from "bun:test";
import { BcryptWorkerPool } from "../src/utils/pool";
import { compare, hash } from "bcrypt";


const passwords = "a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.aa.bb.cc.dd.ee.ff.gg.hh.ii.jj.kk.ll.mm.nn.oo.pp.qq"
.split(".")

const pool = BcryptWorkerPool.getInstance()

const SALT = 15

test("hashing runs with pool", async () => {
    const start = performance.now()

    const results = await Promise.all(passwords.map(p => pool.hash(p)))
    
    const elapsed = performance.now() - start
    console.log(`Pool: ${elapsed.toFixed(0)}ms`);

    results.forEach(h => expect(h).toBeString())
    results.forEach(h => console.log(h))
}, {timeout: 30000})

test("hashing runs without pool", async () => {
    const start = performance.now()

    const results = await Promise.all(passwords.map(p => hash(p, SALT)))

    const elapsed = performance.now() - start
    results.forEach(r => expect(r).toBeString())
    results.forEach(r => console.log)
}, {timeout: 30000})

const hash1 = await pool.hash(passwords[0]!)
const hash2 = await pool.hash(passwords[1]!)

test("comparing runs with pool", async () => {
    const result1 = pool.compare(passwords[0]!, hash1)
    const result2 = pool.compare(passwords[1]!, hash2)
    const result3 = pool.compare(passwords[1]!, hash1)
    
    expect(await result1).toBeTrue()
    expect(await result2).toBeTrue()
    expect(await result3).toBeFalse()
    console.log([await result1, await result2, await result3]);
})

test("comparing runs without pool", async () => {
    const result1 = compare(passwords[0]!, hash1)
    const result2 = compare(passwords[1]!, hash2)
    const result3 = compare(passwords[1]!, hash1)

    expect(await result1).toBeTrue()
    expect(await result2).toBeTrue()
    expect(await result3).toBeFalse()
})