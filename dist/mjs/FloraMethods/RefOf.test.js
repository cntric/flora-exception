import { Flora } from "../Flora";
import { FaunaTestDb } from "fauna-test-setup";
import { query as q } from "faunadb";
import { CreateCollection, Collection, Document } from "./Creation";
import { generate } from "shortid";
import { RefOf } from "./RefOf";
export const CreationSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Simple RefOf", async () => {
            const collection = generate();
            const resultA = await db.client.query(Flora(CreateCollection({ name: collection })));
            const resultB = await db.client.query(Flora(RefOf(Document(Collection(collection), {
                hello: "world"
            }))));
            const resultC = await db.client.query(Flora(RefOf(q.Get(resultB))));
            expect(resultC).toStrictEqual(resultB);
        });
    });
};
CreationSuiteA();
