import { Flora, isFloraException } from "../Flora";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { $Number, $Object, $String } from "../FloraTypes";
import { Dot, NestedSelect, Select } from "./Select";
import * as q from "faunadb/query";



export const SelectSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Simple Select", async ()=>{

            const $Player = $Object({
                name : $String,
                number : $Number
            })

           const result = await db.client.query(Flora(
                Select(
                    "name",
                    {
                        name : "liam",
                        number : 3
                    },
                    $Player
                )
            ))

            expect(result).toBe("liam");
        
        })

       /* test("Simple Dot", async()=>{


            const $Player = $Object({
                name : $String,
                number : $Number
            })


           const result = await db.client.query(Flora(
                Dot({
                    name : "Liam",
                    amount : 3
                }).name
            ))

            expect(result).toBe("Liam");

        })

        test("Deep Dot", async()=>{

           const result = await db.client.query(Flora(
                Dot({
                    name : "Liam",
                    amount : 3,
                    bestFriend : {
                        name : "Doug"
                    }
                }).bestFriend.name
            ))

            expect(result).toBe("Doug");

        })

        test("Deeper dot still", async()=>{

            const result = await db.client.query(Flora(
                Dot({
                    name : "Liam",
                    amount : 3,
                    bestFriend : {
                        name : "Doug",
                        bestFriend : {
                            name : "Friend",
                            bestFriend : {
                                name : "Super Friend"
                            }
                        }
                    }
                }).bestFriend.bestFriend.bestFriend.name
            ))

            expect(result).toBe("Super Friend")

        })

        test("Nested select of nested select", async ()=>{

        })


        test("Dot with doc", async()=>{


            const result = await db.client.query(Flora(Dot(
                q.ToObject([
                    ["name", "Hello"],
                    ["inner", q.ToObject([["name", "inner"]])]
                ])
                )
            ))

            expect(result).toBe("Hello");

        })*/

    })


}; SelectSuiteA();