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
import {FloraException, ContainsException, IsException, GetExceptions, FloraExceptionI} from "./Exception";
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

export const ExceptionSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Is Exception", async()=>{

            const result = await db.client.query(IsException(
                FloraException()
            ));

           expect(result).toBe(true);

        })

        test("Contains Exception", async ()=>{

            const result = await db.client.query(Flora(
                ContainsException([1,2,FloraException()])
            ));

           expect(result).toBe(true);
            

        })

        test("Gets Exceptions", async()=>{
            const result = await db.client.query<any[]>(Flora(
                GetExceptions([1,2, FloraException(), 1, 2, FloraException(), 3])
            ));

           expect(result.length).toBe(2);
        })

        test("Gets complex Exceptions", async()=>{

            const args : FxArgI<any>[] = [
                [[2, 2, 2, 2], IsArray as ()=>boolean],
                // ["dsfhks", IsArray as ()=>boolean]
            ]


            const result = await db.client.query<FloraExceptionI[]>(Flora(
                extractArgs(args, "here") as any[]
            ));

            

            const secondResult = await db.client.query<FloraExceptionI[]>(Flora(
                ContainsException(extractArgs(args, "here") as any[])
            ));

            

        })

    })


}; ExceptionSuiteA();