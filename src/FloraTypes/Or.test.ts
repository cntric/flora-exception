import {
    query,
    Var,
    IsNumber,
    Do,
    And
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { $Object } from "./Object";
import { $Or } from "./Or";
import { $Number, $String } from "./Primitives";

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

        test("Simple $Or", async()=>{

            const $StringOrNumber = $Or(
                $Number,
                $String
            );

            const result = await db.client.query(
                $StringOrNumber("hello")
            );

           expect(result).toBe(true);

        })

    })


}; ExceptionSuiteA();