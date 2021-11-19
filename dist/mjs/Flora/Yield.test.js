import { query } from "faunadb";
import { FaunaTestDb } from "fauna-test-setup";
import { Flora, } from "./Flora";
import { FloraException, isFloraException } from "./Exception";
import { Yield } from "./Yield";
const { Add, IsString, Create, Get, Select, ContainsPath } = query;
export const YieldSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Simple yield", async () => {
            const result = await db.client.query(Flora(Yield({
                args: [2, 2],
                expr: (a, b) => {
                    return Add(2, 2);
                }
            })));
            expect(result).toBe(4);
        });
        test("Yield within yield", async () => {
            const InterestingFunc = (a) => {
                return Yield({
                    args: [a],
                    expr: (a) => {
                        return Add(a, 2);
                    }
                });
            };
            const result = await db.client.query(Flora(InterestingFunc(InterestingFunc(2))));
            expect(result).toBe(6);
        });
        test("Handles Exception in yield", async () => {
            const InterestingFunc = (a) => {
                return Yield({
                    args: [a],
                    expr: (a) => {
                        return Add(a, 2);
                    }
                });
            };
            const result = await db.client.query(Flora(InterestingFunc(FloraException())));
            expect(isFloraException(result)).toBe(true);
            expect(result.at?.length).toBe(1);
            expect(result.location).toBe(InterestingFunc.name);
        });
        test("Handles Exception in yield in yield", async () => {
            const InterestingFunc = (a) => {
                return Yield({
                    args: [a],
                    expr: (a) => {
                        return Add(a, 2);
                    }
                });
            };
            const result = await db.client.query(Flora(InterestingFunc(InterestingFunc(FloraException()))));
            expect(isFloraException(result)).toBe(true);
            expect(result.at?.length).toBe(1);
            expect(result.location).toBe(InterestingFunc.name);
        });
    });
};
YieldSuiteA();
