import {
    query
} from "faunadb";
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
import { FloraException, FloraExceptionI } from "./Exception";
const {
    Add,
    Var,
    IsNumber,
    Do,
    And
} = query;

export const FloraSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Checks flora doc", async ()=>{

           const result = await db.client.query(DefaultCheckPermission({
                data : {
                    [usedFloraIdentity] : false,
                    [withIdentity] : "",
                    [blight] : {
                    }
                }
            } as unknown as FloraDocumentT))

            

        })

        test("Flora db creates", async ()=>{

            const result = await db.client.query(FloraCollection());
    
        }, 10000)

        test("Basic flora expression", async ()=>{

            const result = await db.client.query(Flora(Add(2,2)));
            expect(result).toBe(4);
    
        }, 10000)

        test("Raises Flora Exception", async()=>{

            const testException = FloraException({
                name : "Hello",
                msg : "fail"
            });

            const result = await db.client.query<FloraExceptionI>(Flora(
                Raise(testException),
            ));

            expect(result.stack ? result.stack[0] : undefined).toStrictEqual(testException);

        })



    })


}; FloraSuiteA();