import { Flora, isFloraException } from "../Flora";
import { FaunaTestDb } from "fauna-test-setup";
import { $Number, $Object, $String } from "../FloraTypes";
import { CreateCollection, Collection, Document } from "./Creation";
import { generate } from "shortid";
import { query as q } from "faunadb";
export const CreationSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Simple Collection", async () => {
            const result = await db.client.query(Flora(q.IsCollection(CreateCollection({
                name: generate()
            }))));
            expect(result).toBe(true);
        });
        test("Documents", async () => {
            const collection = generate();
            const resultA = await db.client.query(Flora(CreateCollection({ name: collection })));
            const result = await db.client.query(Flora(q.IsDoc(Document(Collection(collection), {
                hello: "world"
            }))));
            expect(result).toBe(true);
        });
        test("Catches bad document", async () => {
            const $Player = $Object({
                name: $String,
                amount: $Number
            });
            const collection = generate();
            const resultA = await db.client.query(Flora(CreateCollection({ name: collection })));
            const result = await db.client.query(Flora(Document(Collection(collection), {
                hello: "world"
            }, $Player)));
            expect(isFloraException(result)).toBe(true);
        });
    });
};
CreationSuiteA();
