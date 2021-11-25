import { Add } from "faunadb/query";
import { FaunaTestDb } from "fauna-test-setup";
import { blight, DefaultCheckPermission, Flora, FloraCollection, usedFloraIdentity, withIdentity, } from "./Flora";
import { Raise } from "./Raise";
import { FloraException } from "./Exception";
export const FloraSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Checks flora doc", async () => {
            const result = await db.client.query(DefaultCheckPermission({
                data: {
                    [usedFloraIdentity]: false,
                    [withIdentity]: "",
                    [blight]: {}
                }
            }));
        });
        test("Flora db creates", async () => {
            const result = await db.client.query(FloraCollection());
        }, 10000);
        test("Basic flora expression", async () => {
            const result = await db.client.query(Flora(Add(2, 2)));
            expect(result).toBe(4);
        }, 10000);
        test("Raises Flora Exception", async () => {
            const testException = FloraException({
                name: "Hello",
                msg: "fail"
            });
            const result = await db.client.query(Flora(Raise(testException)));
            expect(result.stack ? result.stack[0] : undefined).toStrictEqual(testException);
        });
    });
};
FloraSuiteA();
