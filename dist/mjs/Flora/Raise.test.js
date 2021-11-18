import { query } from "faunadb";
import { FaunaTestDb } from "fauna-test-setup";
import { Flora, } from "./Flora";
import { Raise, Reraise } from "./Raise";
import { FloraException } from "./Exception";
const { Add, IsString, Create, Get, Select, ContainsPath } = query;
export const RaiseSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Reraises", async () => {
            const testException = FloraException({
                name: "Hello",
                msg: "fail"
            });
            const result = await db.client.query(Flora(Reraise([Raise(testException)], FloraException())));
            expect(result.stack ? result.stack[1].at : undefined).toStrictEqual([testException]);
        });
        test("Deep reraises", async () => {
            const testException = FloraException({
                name: "Hello",
                msg: "fail"
            });
            const result = await db.client.query(Flora(Reraise([Reraise([Raise(testException),], FloraException())], FloraException())));
            expect(result.stack ? result.stack[1].at : undefined).toStrictEqual([testException]);
        });
    });
};
RaiseSuiteA();
