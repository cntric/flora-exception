import { query, Sum, } from "faunadb";
import { FaunaTestDb } from "fauna-test-setup";
import { Fx, Flora } from "../Flora";
import { $Array, $Number } from "../FloraTypes";
import { performance } from "perf_hooks";
const { Add, IsString, Create, Get, Select, ContainsPath, IsArray } = query;
export const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Composed sum", async () => {
            const ComposedSum = (a) => {
                return Fx([[a, $Array($Number)]], $Number, (a) => {
                    return Sum(a);
                });
            };
            const longArray = Array(100000).fill(0).map(() => {
                return Math.floor(Math.random() * 1000);
            });
            const m0 = performance.now();
            const result = await db.client.query(Flora(ComposedSum(longArray)));
            const m1 = performance.now();
            const b0 = performance.now();
            const secondResult = await db.client.query(Flora(Sum(longArray)));
            const b1 = performance.now();
            const c0 = performance.now();
            const thirdResult = longArray.reduce((agg, val) => {
                return agg + val;
            }, 0);
            const c1 = performance.now();
            console.log(m1 - m0, b1 - b0, c1 - c0);
            expect(result).toBe(thirdResult);
        }, 200000);
    });
};
ExceptionSuiteA();
