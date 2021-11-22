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
import {Raise, Reraise} from "./Raise";
import { FloraException, FloraExceptionI } from "./Exception";
import { Yield } from "./Yield";


export const RaiseSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Reraises", async ()=>{

            const testException = FloraException({
                name : "Hello",
                msg : "fail"
            });

            const result = await db.client.query<FloraExceptionI>(Flora(
                Reraise([Raise(testException)], FloraException()),
            ));

           expect(result.stack ? result.stack[1].at : undefined).toStrictEqual([testException]);
            

        })

        test("Deep reraises", async ()=>{

            const testException = FloraException({
                name : "Hello",
                msg : "fail"
            });

            const result = await db.client.query<FloraExceptionI>(Flora(
                Reraise([Reraise([Raise(testException),],FloraException())], FloraException()),
            ));
            

           expect(result.stack ? result.stack[1].at : undefined).toStrictEqual([testException]);
            

        })


    })


}; RaiseSuiteA();