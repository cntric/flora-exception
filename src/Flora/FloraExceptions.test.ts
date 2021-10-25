import {
    query,
    Client,
    CreateCollection
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

const {
    Add,
    Create,
    Get
} = query;

export const FloraexceptiontSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;
        beforeAll(async ()=>{

            db = await FaunaTestDb();

        })

        test("FloraException initializes", async ()=>{

            const result = await db.client.query<FloraExceptionI>(FloraException({
                result : Add(2, 2)
            }));
            
            expect(result.result).toBe(4);
            expect(result[isFloraExceptionKey]).toBe(true);
    
        }, 5000)

        test("FloraExceptionStack initializes", async ()=>{

            const result = await db.client.query<FloraExceptionStackI>(
                FloraExceptionStack()
            )
    
            expect(result.stack).toBeInstanceOf(Array);
            expect(result.stack.length).toBe(0);
            expect(result.exception).toBe(false);
            expect(result[isFloraExceptionStackKey]).toBe(true);
    
    
        })

        test("Adds to FloraExceptionStack", async ()=>{

            const initialStack = await db.client.query<FloraExceptionStackI>(
                FloraExceptionStack()
            );

            expect(initialStack.stack).toBeInstanceOf(Array);
            expect(initialStack.stack.length).toBe(0);
            expect(initialStack.exception).toBe(false);
            expect(initialStack[isFloraExceptionStackKey]).toBe(true);

            const updateStack = await db.client.query<FloraExceptionStackI>(
                AddToStack(
                    initialStack,
                    FloraException({
                        result : Add(2, 2)
                    })
                )
            )

            expect(updateStack.stack).toBeInstanceOf(Array);
            expect(updateStack.stack.length).toBe(1);
            expect(updateStack.exception).toBe(true);
            expect(updateStack[isFloraExceptionStackKey]).toBe(true);


        })

        test("Multiple adds to FloraExceptionStack", async ()=>{

            const initialStack = await db.client.query<FloraExceptionStackI>(
                FloraExceptionStack()
            );

            expect(initialStack.stack).toBeInstanceOf(Array);
            expect(initialStack.stack.length).toBe(0);
            expect(initialStack.exception).toBe(false);
            expect(initialStack[isFloraExceptionStackKey]).toBe(true);

            const updateStack = await db.client.query<FloraExceptionStackI>(
               AddToStack(
                    AddToStack(
                        AddToStack(
                            initialStack,
                            FloraException({
                                result : Add(2, 2)
                            })
                        ),
                        FloraException({
                            result : Add(3, 3)
                        })
                    ),
                    FloraException({
                        result : Add(4, 4)
                    })
               )
            )

            expect(updateStack.stack).toBeInstanceOf(Array);
            expect(updateStack.stack.length).toBe(3);
            expect(updateStack.exception).toBe(true);
            expect(updateStack[isFloraExceptionStackKey]).toBe(true);

            const stackResults = updateStack.stack.map((exception)=>{
                return exception.result;
            })
            expect(stackResults).toStrictEqual([4, 6, 8])


        })

        test("Concept", async ()=>{

            const DoAdd = (a : number, b : number, add : Function)=>{

                return add(a, b);

            }

            const result = await db.client.query(
                DoAdd(2, 2, Add)
            )

            console.log(result);

        })
    

        afterAll(async ()=>{

            await teardown();

        }, 5000)
        
    })


}; FloraexceptiontSuiteA();