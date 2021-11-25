import { Add } from "./FaunaMethods";
import { Flora, isFloraException } from "../Flora";
import { FaunaTestDb } from "fauna-test-setup";
export const AddSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Simple add", async () => {
            const result = await db.client.query(Flora(Add(2, 3)));
            expect(result).toBe(5);
        });
        test("Multi add", async () => {
            const result = await db.client.query(Flora(Add(2, 3, 4, 3, 2)));
            expect(result).toBe(14);
        });
        test("Fails no num...", async () => {
            const result = await db.client.query(Flora(Add(2, "2js3c4", 4, "234234", 2)));
            expect(isFloraException(result)).toBe(true);
        });
    });
};
AddSuiteA();
