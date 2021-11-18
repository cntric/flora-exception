import {
    query,
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { Fx, Flora } from "../Flora";
import { $Number } from "../FloraTypes";

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

        test("Composed Add", async()=>{

            const ComposedAdd = (a : number, b : number) : number=>{
                return Fx(
                    [ [a, $Number], [b, $Number] ],
                    $Number,
                    (a, b)=>{
                        return Add(a, b) as number
                    }
                ) as number
            }

            const result = await db.client.query(Flora(
                ComposedAdd(2, 2)
            ));

           expect(result).toBe(4);

        })

    })


}; ExceptionSuiteA();