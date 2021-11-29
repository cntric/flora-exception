import { Flora, isFloraException } from "../Flora";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { $Any, $Document, $Number, $Object, $Ref, $String } from "../FloraTypes";
import {query as q} from "faunadb";
import {CreateCollection, Collection, Document} from "./Creation";
import { generate } from "shortid";
import {UpdateDocument} from "./Update";
import { values } from "faunadb";
import { Read } from "./Read";
import { Delete } from "./Delete";



export const CreationSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Updates", async()=>{

            const collection = generate();

            const resultA = await db.client.query(Flora(
                CreateCollection({name : collection})
            ))

            const resultB = await db.client.query<values.Document>(Flora(
                    Document(
                        Collection(collection),
                       {
                           hello : "world"
                        }
                    )
            ))

            const resultC = await db.client.query<values.Document>(Flora(
                UpdateDocument(
                    resultB.ref,
                    {
                        hello : "world"
                    }
                )
            ));

            expect(resultC.data).toStrictEqual(resultB.data);

            const resultD = await db.client.query<values.Document>(Flora(
                UpdateDocument(
                    resultC.ref,
                    {
                        hello : "friend"
                    }
                )
            ))

            expect(resultD.data).toStrictEqual({
                hello : "friend"
            })

            const resultE = await db.client.query<values.Document>(Flora(
                Read(resultD.ref)
            ));

            expect(resultE).toStrictEqual(resultD);

        })

        test("Deletes", async()=>{

            const collection = generate();

            const resultA = await db.client.query(Flora(
                CreateCollection({name : collection})
            ))

            const resultB = await db.client.query<values.Document>(Flora(
                    Document(
                        Collection(collection),
                       {
                           hello : "world"
                        }
                    )
            ))

            const resultC = await db.client.query<values.Document>(Flora(
                UpdateDocument(
                    resultB.ref,
                    {
                        hello : "world"
                    }
                )
            ));

            expect(resultC.data).toStrictEqual(resultB.data);

            const resultD = await db.client.query<values.Document>(Flora(
                UpdateDocument(
                    resultC.ref,
                    {
                        hello : "friend"
                    }
                )
            ))

            expect(resultD.data).toStrictEqual({
                hello : "friend"
            })

            const resultE = await db.client.query<values.Document>(Flora(
                Read(resultD.ref)
            ));

            expect(resultE).toStrictEqual(resultD);

            const resultF = await db.client.query<values.Document>(Flora(
                Delete(resultD.ref)
            ));

            expect(resultF.ref).toStrictEqual(resultE.ref);

            const resultG = await db.client.query<values.Document>(Flora(
                Read(resultF.ref)
            ));

            expect(isFloraException(resultG)).toBe(true);


        })

    })


}; CreationSuiteA();