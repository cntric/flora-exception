import { FaunaTestDb } from "fauna-test-setup";
import { $Or } from "./Or";
import { $Number, $String } from "./Primitives";
export const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Simple $Or", async () => {
            const $StringOrNumber = $Or($Number, $String);
            const result = await db.client.query($StringOrNumber("hello"));
            expect(result).toBe(true);
        });
    });
};
ExceptionSuiteA();
