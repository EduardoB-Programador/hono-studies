import { expect, test } from "bun:test";
import { Own } from "../src/utils/Own";

test("Own class property test", async () => {
    const own1 = Own.getInstance()
    const own2 = Own.getInstance()

    expect(own1 === own2).toBeTrue()
    expect(own1.totalThreads).toBe(8)
    console.log(own1)
})