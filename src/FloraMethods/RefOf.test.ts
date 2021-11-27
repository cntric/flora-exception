import { Flora, isFloraException } from "../Flora";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { $Any, $Document, $Number, $Object, $Ref, $String } from "../FloraTypes";
import * as q from "faunadb/query";
import {CreateCollection, Collection, Document} from "./Creation";
import { generate } from "shortid";
import {UpdateDocument} from "./Update";
import { values } from "faunadb";
import { RefOf } from "./RefOf";



export const CreationSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Simple RefOf", async()=>{

            const collection = generate();

            const resultA = await db.client.query(Flora(
                CreateCollection({name : collection})
            ))

            const resultB = await db.client.query<values.Document>(Flora(
                RefOf(
                    Document(
                        Collection(collection),
                       {
                           hello : "world"
                        }
                    )
                )
            ))

            const resultC = await db.client.query<values.Document>(Flora(
                RefOf(
                   q.Get(resultB) as unknown as values.Document
                )
            ))

            expect(resultC).toStrictEqual(resultB);


        })


    })


}; CreationSuiteA();