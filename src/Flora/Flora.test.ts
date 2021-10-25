import {
    query,
    Client,
    CreateCollection,
    IsNumber
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import {
    FloraException,
    FloraExceptionI,
    FloraExceptionStack,
    isFloraExceptionKey,
    FloraExceptionStackI,
    isFloraExceptionStackKey,
    AddToStack
} from "./FloraException";
import {
    Flora, FloraRuleI, FloraTupleT
} from "./Flora";

const {
    Add,
    Create,
    Get,
    IsString
} = query;

export const FloraexceptiontSuiteA = ()=>{


    describe("Flora basic functionality", ()=>{

        let db : FaunaTestDbI;
        beforeAll(async ()=>{

            db = await FaunaTestDb();

        })

        test("Flora handles no exception", async ()=>{

            const result = await db.client.query<FloraTupleT<number>>(Flora({
                expr : Add(2, 2) as number,
                Rule : IsNumber as FloraRuleI<number>,
                name : "Add"
            }));
            
            expect(result[0].exception).toBe(false);
            expect(result[1]).toBe(4);
    
        }, 5000)

        test("Flora handles exception", async ()=>{

            const result = await db.client.query<FloraTupleT<string>>(Flora({
                expr : "Hello" as string,
                Rule : IsNumber as FloraRuleI<string>,
                name : "ReturnHello"
            }));

            console.log(result);
            
            expect(result[0].exception).toBe(true);
            expect(result[1]).toBe("Hello");
            console.log(result[0].stack[0])
    
        }, 5000)

        test("FloraException initializes", async ()=>{

            const result = await db.client.query<FloraTupleT<number>>(Flora({
                expr : Add(2, 2) as number,
                Rule : IsNumber as FloraRuleI<number>,
                name : "Add"
            }));
            
            expect(result[0].exception).toBe(false);
            expect(result[1]).toBe(4);
    
        }, 5000)
    

        afterAll(async ()=>{

            await teardown();

        }, 5000)
        
    })


}; FloraexceptiontSuiteA();