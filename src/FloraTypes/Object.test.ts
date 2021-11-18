import {
    query,
    Var,
    IsNumber,
    Do,
    And
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { $Object, $Optional } from "./Object";
import { $Number, $String } from "./Primitives";

const {
    Add,
    IsString,
    Create,
    Get,
    Select,
    ContainsPath,
    IsArray
} = query;

export const ExceptionSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Simple $Object", async()=>{

            const Test$Object = $Object({
                name : IsString as ()=>boolean,
                amount : IsNumber as ()=>boolean
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
                name : IsString as ()=>boolean,
                amount : IsNumber as ()=>boolean
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
                name : IsString as ()=>boolean,
                amount : IsNumber as ()=>boolean
            })

            const Wrapper$Object = $Object({
                type : IsString as ()=>boolean,
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
                name : IsString as ()=>boolean,
                amount : IsNumber as ()=>boolean
            })

            const Wrapper$Object = $Object({
                type : IsString as ()=>boolean,
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