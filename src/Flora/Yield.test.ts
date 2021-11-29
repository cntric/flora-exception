
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import {
    blight,
    DefaultCheckPermission,
    Flora,
    FloraCollection,
    FloraDocumentT,
    GetStack,
    usedFloraIdentity,
    withIdentity,
} from "./Flora";
import {Raise} from "./Raise";
import { FloraException, FloraExceptionI, isFloraException } from "./Exception";
import { Yield } from "./Yield";
import {
    query
} from "faunadb";

const {
    Add
} = query;


export const YieldSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Simple yield", async ()=>{

           const result = await db.client.query(Flora(
                Yield({
                    args : [2, 2],
                    expr : (a, b)=>{
                        return Add(2, 2)
                    }
                })
           ))

           expect(result).toBe(4);
            

        })

        test("Yield within yield", async ()=>{


            const InterestingFunc = (a : number) : number=>{
                return Yield({
                    args : [a],
                    expr : (a)=>{
                        return Add(a, 2)
                    }
                }) as unknown as number
            }

            const result = await db.client.query(Flora(
                InterestingFunc(InterestingFunc(2))
           ))

           expect(result).toBe(6);

        })

        test("Handles Exception in yield", async()=>{

            const InterestingFunc = (a : number) : number=>{
                return Yield({
                    args : [a],
                    expr : (a)=>{
                        
                        return Add(a, 2)
                    }
                }) as unknown as  number
            }

            const result = await db.client.query<FloraExceptionI>(Flora(
                InterestingFunc(FloraException() as unknown as number)
           ))

           expect(isFloraException(result)).toBe(true);
           expect(result.at?.length).toBe(1);
           expect(result.location).toBe(InterestingFunc.name);

        })

        test("Handles Exception in yield in yield", async ()=>{


            const InterestingFunc = (a : number) : number=>{
                return Yield({
                    args : [a],
                    expr : (a)=>{
                        return Add(a, 2)
                    }
                }) as unknown as number
            }

            const result = await db.client.query<FloraExceptionI>(Flora(
                InterestingFunc(InterestingFunc(FloraException() as unknown as number))
           ))

           expect(isFloraException(result)).toBe(true);
           expect(result.at?.length).toBe(1);
           expect(result.location).toBe(InterestingFunc.name);

        })

    })


}; YieldSuiteA();