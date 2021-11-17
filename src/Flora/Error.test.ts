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
import {FloraError, ContainsError, IsError, GetErrors, FloraErrorI} from "./Error";
import { Yield } from "./Yield";
import { extractArgs, FxArgI } from "./Fx";

const {
    Add,
    IsString,
    Create,
    Get,
    Select,
    ContainsPath,
    IsArray
} = query;

export const ErrorSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Is error", async()=>{

            const result = await db.client.query(IsError(
                FloraError()
            ));

           expect(result).toBe(true);

        })

        test("Contains error", async ()=>{

            const result = await db.client.query(Flora(
                ContainsError([1,2,FloraError()])
            ));

           expect(result).toBe(true);
            

        })

        test("Gets errors", async()=>{
            const result = await db.client.query<any[]>(Flora(
                GetErrors([1,2, FloraError(), 1, 2, FloraError(), 3])
            ));

           expect(result.length).toBe(2);
        })

        test("Gets complex errors", async()=>{

            const args : FxArgI<any>[] = [
                [[2, 2, 2, 2], IsArray as ()=>boolean],
                // ["dsfhks", IsArray as ()=>boolean]
            ]


            const result = await db.client.query<FloraErrorI[]>(Flora(
                extractArgs(args, "here") as any[]
            ));

            console.log("extraction: ", result);

            const secondResult = await db.client.query<FloraErrorI[]>(Flora(
                ContainsError(extractArgs(args, "here") as any[])
            ));

            console.log(secondResult);

        })

    })


}; ErrorSuiteA();