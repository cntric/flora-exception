import { Flora, isFloraException } from "../Flora";
import { FaunaTestDb } from "fauna-test-setup";
import { CreateCollection, Collection, Document } from "./Creation";
import { generate } from "shortid";
import { UpdateDocument } from "./Update";
import { Read } from "./Read";
import { Delete } from "./Delete";
export const CreationSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Updates", async () => {
            const collection = generate();
            const resultA = await db.client.query(Flora(CreateCollection({ name: collection })));
            const resultB = await db.client.query(Flora(Document(Collection(collection), {
                hello: "world"
            })));
            const resultC = await db.client.query(Flora(UpdateDocument(resultB.ref, {
                hello: "world"
            })));
            expect(resultC.data).toStrictEqual(resultB.data);
            const resultD = await db.client.query(Flora(UpdateDocument(resultC.ref, {
                hello: "friend"
            })));
            expect(resultD.data).toStrictEqual({
                hello: "friend"
            });
            const resultE = await db.client.query(Flora(Read(resultD.ref)));
            expect(resultE).toStrictEqual(resultD);
        });
        test("Deletes", async () => {
            const collection = generate();
            const resultA = await db.client.query(Flora(CreateCollection({ name: collection })));
            const resultB = await db.client.query(Flora(Document(Collection(collection), {
                hello: "world"
            })));
            const resultC = await db.client.query(Flora(UpdateDocument(resultB.ref, {
                hello: "world"
            })));
            expect(resultC.data).toStrictEqual(resultB.data);
            const resultD = await db.client.query(Flora(UpdateDocument(resultC.ref, {
                hello: "friend"
            })));
            expect(resultD.data).toStrictEqual({
                hello: "friend"
            });
            const resultE = await db.client.query(Flora(Read(resultD.ref)));
            expect(resultE).toStrictEqual(resultD);
            const resultF = await db.client.query(Flora(Delete(resultD.ref)));
            expect(resultF.ref).toStrictEqual(resultE.ref);
            const resultG = await db.client.query(Flora(Read(resultF.ref)));
            expect(isFloraException(resultG)).toBe(true);
        });
    });
};
CreationSuiteA();
