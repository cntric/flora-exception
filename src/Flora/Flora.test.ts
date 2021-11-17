import {
    query,
    Var,
    IsNumber,
    Do,
    And
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
import { FloraError } from "./Error";

const {
    Add,
    IsString,
    Create,
    Get,
    Select,
    ContainsPath
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

        test("Raises Flora error", async()=>{

            const testError = FloraError({
                name : "Hello",
                msg : "fail"
            });

            const result = await db.client.query(Flora(
                Do(
                    Raise(testError),
                    GetStack()
                )
            ));

            expect(result).toStrictEqual([testError]);

        })



    })


}; FloraSuiteA();