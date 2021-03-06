import {
    Var,
    Add,
    IsString,
    Create,
    Get,
    Select,
    ContainsPath,
    IsArray,
    Collection,
    Let,
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { $Object, $Optional } from "./Object";
import { $Number, $String } from "./Primitives";
import { $Document } from "./Document";
import { CreateCollection} from "../FloraMethods";

export const documentTestCollectionName = "Document-Test";

export const ExceptionSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
            await db.client.query(CreateCollection({
                name : documentTestCollectionName
            }))
        })

        test("Simple $Document", async()=>{

            const Test$Document = $Document($Object({
                name : $String,
                amount : $Optional($Number)
            }))

            const testCollection = "test";

            const result = await db.client.query<any[]>(Let(
                {
                    [testCollection] : Create(
                        Collection(documentTestCollectionName),
                        {
                            data : {
                                name : "Liam",
                                amount : 2
                            }
                        }
                    )
                },
                [Var(testCollection), Test$Document(Var(testCollection))]
            ));

            expect(result[1]).toBe(true);

        })

        test("Simple $Document fails", async()=>{

            const Test$Document = $Document($Object({
                name : $String,
                amount : $Optional($Number)
            }))

            const testCollection = "test";

            const result = await db.client.query<any[]>(Let(
                {
                    [testCollection] : Create(
                        Collection(documentTestCollectionName),
                        {
                            data : {
                                name : "Liam",
                                amount : "cat"
                            }
                        }
                    )
                },
                [Var(testCollection), Test$Document(Var(testCollection))]
            ));

            expect(result[1]).toBe(false);

        })

    })


}; ExceptionSuiteA();