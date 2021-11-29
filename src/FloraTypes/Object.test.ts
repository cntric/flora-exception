import {
    Var,
    Do,
    And
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { $Object, $Optional } from "./Object";
import { $Number, $String } from "./Primitives";


export const ExceptionSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Simple $Object", async()=>{

            const Test$Object = $Object({
                name : $String,
                amount : $Number as unknown as ()=>boolean
            })

            const result = await db.client.query(
                Test$Object({
                    name : "Liam",
                    amount : 9
                })
            );

           expect(result).toBe(true);

        })

        test("Simple $Object fail", async()=>{

            const Test$Object = $Object({
                name : $String,
                amount : $Number
            })

            const result = await db.client.query(
                Test$Object({
                    name : "Liam",
                    amount : "Not number"
                })
            );

           expect(result).toBe(false);

        })

        test("Nested $Object", async()=>{

            const Test$Object = $Object({
                name : $String,
                amount : $Number
            })

            const Wrapper$Object = $Object({
                type : $String,
                obj : Test$Object
            })

            const result = await db.client.query(
                Wrapper$Object({
                    type : "any",
                    obj : {
                        name : "Liam",
                        amount : 9
                    }
                })
            );

            expect(result).toBe(true);

        })

        test("Nested $Object fails", async()=>{

            const Test$Object = $Object({
                name : $String,
                amount : $Number
            })

            const Wrapper$Object = $Object({
                type : $String,
                obj : Test$Object
            })

            const result = await db.client.query(
                Wrapper$Object({
                    type : "any",
                    obj : {
                        name : "Liam",
                        amount : "Not number"
                    }
                })
            );

            expect(result).toBe(false);

        })

        test("$Optional", async()=>{

            const Test$Object = $Object({
                name : $Optional($String),
                amount : $Number
            })


            const result = await db.client.query(
                Test$Object({
                    amount : 9
                })
            );

            expect(result).toBe(true);

        })

        test("$Optional fails", async()=>{

            const Test$Object = $Object({
                name : $Optional($String),
                amount : $Number
            })


            const result = await db.client.query(
                Test$Object({
                    name : 9,
                    amount : 9
                })
            );

            expect(result).toBe(false);

        })

    })


}; ExceptionSuiteA();