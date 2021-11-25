import { FaunaTestDb } from "fauna-test-setup";
import { $Array } from "./Array";
import { $String, $Number } from "./Primitives";
export const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Simple $Array", async () => {
            const $Numbers = $Array($Number);
            const result = await db.client.query($Numbers([1, 2, 4]));
            expect(result).toBe(true);
        });
        test("Simple $Array fails", async () => {
            const $Numbers = $Array($String);
            const result = await db.client.query($Numbers([1, 2, 4]));
            expect(result).toBe(false);
        });
        test("Mixed $Array fails", async () => {
            const $Numbers = $Array($Number);
            const result = await db.client.query($Numbers([1, "dog", 4]));
            expect(result).toBe(false);
        });
    });
};
ExceptionSuiteA();
