import { IsArray } from "faunadb/query";
import { FaunaTestDb } from "fauna-test-setup";
import { Flora, } from "./Flora";
import { FloraException, ContainsException, IsException, GetExceptions } from "./Exception";
import { extractArgs } from "./Fx";
export const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Is Exception", async () => {
            const result = await db.client.query(IsException(FloraException()));
            expect(result).toBe(true);
        });
        test("Contains Exception", async () => {
            const result = await db.client.query(Flora(ContainsException([1, 2, FloraException()])));
            expect(result).toBe(true);
        });
        test("Gets Exceptions", async () => {
            const result = await db.client.query(Flora(GetExceptions([1, 2, FloraException(), 1, 2, FloraException(), 3])));
            expect(result.length).toBe(2);
        });
        test("Gets complex Exceptions", async () => {
            const args = [
                [[2, 2, 2, 2], IsArray],
                // ["dsfhks", IsArray as ()=>boolean]
            ];
            const result = await db.client.query(Flora(extractArgs(args, "here")));
            const secondResult = await db.client.query(Flora(ContainsException(extractArgs(args, "here"))));
        });
    });
};
ExceptionSuiteA();
