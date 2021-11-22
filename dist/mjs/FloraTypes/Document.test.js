import { query, Var, Collection, Let } from "faunadb";
import { FaunaTestDb } from "fauna-test-setup";
import { $Object, $Optional } from "./Object";
import { $Number, $String } from "./Primitives";
import { $Document } from "./Document";
const { Add, IsString, Create, Get, Select, ContainsPath, IsArray } = query;
export const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Simple $Document", async () => {
            const Test$Document = $Document($Object({
                name: $String,
                amount: $Optional($Number)
            }));
            const testCollection = "test";
            const result = await db.client.query(Let({
                [testCollection]: Create(Collection("test"), {
                    data: {
                        name: "Liam",
                        amount: 2
                    }
                })
            }, [Var(testCollection), Test$Document(Var(testCollection))]));
            expect(result[1]).toBe(true);
        });
        test("Simple $Document fails", async () => {
            const Test$Document = $Document($Object({
                name: $String,
                amount: $Optional($Number)
            }));
            const testCollection = "test";
            const result = await db.client.query(Let({
                [testCollection]: Create(Collection("test"), {
                    data: {
                        name: "Liam",
                        amount: "cat"
                    }
                })
            }, [Var(testCollection), Test$Document(Var(testCollection))]));
            expect(result[1]).toBe(false);
        });
    });
};
ExceptionSuiteA();
