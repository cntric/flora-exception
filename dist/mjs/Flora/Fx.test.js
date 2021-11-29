import { query } from "faunadb";
import { FaunaTestDb } from "fauna-test-setup";
import { Flora, } from "./Flora";
import { isFloraException } from "./Exception";
import { Yield } from "./Yield";
import { extractArgs, Fx, mFx } from "./Fx";
import { $String, $Number } from "../FloraTypes";
const { IsNumber, IsArray, Sum, Concat, ToString, Add, IsString } = query;
export const FxSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Simple Fx", async () => {
            const CoolFunc = (a, b) => {
                return Fx([
                    [a, IsNumber],
                    [b, IsNumber]
                ], $Number, (a, b) => {
                    return Add(a, b);
                });
            };
            const result = await db.client.query(Flora(CoolFunc(2, 2)));
            expect(result).toBe(4);
        });
        test("Array Fx", async () => {
            const CoolFunc = (a) => {
                return Fx([
                    [a, IsArray],
                ], $Number, (a) => {
                    return Sum(a);
                });
            };
            const result = await db.client.query(Flora(CoolFunc([2, 2, 2, 2])));
            expect(result).toBe(8);
        });
        test("Mixed Fx", async () => {
            const CoolFunc = (a, b) => {
                return Fx([
                    [a, IsArray],
                    [b, IsString]
                ], $String, (a, b) => {
                    return Concat([ToString(Sum(a)), b], "");
                });
            };
            const result = await db.client.query(Flora(CoolFunc([2, 2, 2, 2], " is Liam's score.")));
            expect(result).toBe("8 is Liam's score.");
        });
        test("Can get extracted Exceptions", async () => {
            const args = [
                [2, IsNumber],
                ["3", IsString],
                [[4, 5, 6], IsString]
            ];
            const result = await db.client.query(Flora(extractArgs(args, "Here")));
            const secondResult = await db.client.query(Flora(Yield({
                args: extractArgs(args, "Here"),
                expr: (a, b, c) => {
                    return [a, b, c];
                }
            })));
        });
        test("Exception", async () => {
            const ExceptionFunc = (a) => {
                return Fx([
                    [a, IsString],
                ], $String, (a) => {
                    return Concat([a, " great time."], "");
                });
            };
            const result = await db.client.query(Flora(ExceptionFunc([2, 2, 2, 2])));
            expect(isFloraException(result)).toBe(true);
        });
        test("Complex Exception", async () => {
            const ExceptionFunc = (a, b) => {
                return Fx([
                    [a, IsArray],
                    [b, IsArray]
                ], $String, (a, b) => {
                    return Concat([ToString(Sum(a)), b], "");
                });
            };
            const result = await db.client.query(Flora(ExceptionFunc([2, 2, 2, 2], " a thing")));
        });
        test("Basic mfx", async () => {
            const FloraAdd = mFx([$Number, $Number], $Number, (a, b) => {
                return Add(a, b);
            });
            const result = await db.client.query(Flora(FloraAdd(2, 2)));
            expect(result).toBe(4);
        });
        test("Failed mfx", async () => {
            const FloraAdd = mFx([$Number, $Number], $Number, (a, b) => {
                return Add(a, b);
            });
            const result = await db.client.query(Flora(FloraAdd(2, "hello")));
            expect(isFloraException(result)).toBe(true);
        });
        test("Return exception", async () => {
            const FloraAdd = mFx([$Number, $Number], $Number, (a, b) => {
                return "hello";
            });
            const result = await db.client.query(Flora(FloraAdd(2, 2)));
            expect(isFloraException(result)).toBe(true);
        });
    });
};
FxSuiteA();
