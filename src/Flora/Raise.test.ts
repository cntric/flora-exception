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
import {Raise, Reraise} from "./Raise";
import { FloraError, FloraErrorI } from "./Error";
import { Yield } from "./Yield";

const {
    Add,
    IsString,
    Create,
    Get,
    Select,
    ContainsPath
} = query;

export const RaiseSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Reraises", async ()=>{

            const testError = FloraError({
                name : "Hello",
                msg : "fail"
            });

            const result = await db.client.query<FloraErrorI[]>(Flora(
                Do(
                    Reraise([Raise(testError)], FloraError()),
                    GetStack()
                )
            ));

           expect(result[1].at).toStrictEqual([testError]);
            

        })

        test("Deep reraises", async ()=>{

            const testError = FloraError({
                name : "Hello",
                msg : "fail"
            });

            const result = await db.client.query<FloraErrorI[]>(Flora(
                Do(
                    Reraise([Reraise([Raise(testError),],FloraError())], FloraError()),
                    GetStack()
                )
            ));

            

           expect(result[1].at).toStrictEqual([testError]);
            

        })


    })


}; RaiseSuiteA();