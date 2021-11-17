import {
    query,
    Client,
    CreateCollection,
    Var,
    Exists
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import {
    InterpretI,
    DefaultInterpret
} from "./Interpret";

const {
    Add,
    Create,
    Get
} = query;

export const InterpretSuiteA = ()=>{


    describe("DefaultInterpret works...", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Interpret initializes", async ()=>{

            /*const result = await db.client.query<InterpretI<[number]>>(Interpret({
                soil : [
                    Add(2, 2)
                ]
            }));
            
            expect(result.soil).toStrictEqual([4]);
            expect(result[isInterpretKey]).toBe(true);*/
    
        }, 10000)


        test("Interpret handles multiple soil inputs.", async ()=>{

            /*const result = await db.client.query<InterpretI<[number, number, string]>>(Interpret({
                soil : [
                    Add(2, 2),
                    Add(3, 3),
                    "Hello"
                ]
            }));
            
            expect(result.soil).toStrictEqual([4, 6, "Hello"]);
            expect(result[isInterpretKey]).toBe(true);*/

        })

        
    })


}; InterpretSuiteA();