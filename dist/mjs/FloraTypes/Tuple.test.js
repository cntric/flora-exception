import { FaunaTestDb } from "fauna-test-setup";
import { $Number, $String } from "./Primitives";
import { $Tuple } from "./Tuple";
import { $Or } from "./Or";
export const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Simple $Tuple", async () => {
            const TestTuple = $Tuple($String, $Number);
            const result = await db.client.query(TestTuple([
                "Liam",
                3
            ]));
            expect(result).toBe(true);
        });
        test("Simple $Tuple fails...", async () => {
            const TestTuple = $Tuple($String, $Number);
            const result = await db.client.query(TestTuple([
                "Liam",
                "Monninger"
            ]));
            expect(result).toBe(false);
        });
        test("Or $Tuple...", async () => {
            const TestTuple = $Tuple($String, $Or($Number, $String));
            const result = await db.client.query(TestTuple([
                "Liam",
                "Monninger"
            ]));
            expect(result).toBe(true);
        });
    });
};
ExceptionSuiteA();
