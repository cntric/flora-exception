import {
    Add
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { Fx, Flora } from "../Flora";
import { $Number } from "../FloraTypes";


export const ExceptionSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Composed Add", async()=>{

            /**
             * Adds two numbers.
             * @param a 
             * @param b 
             * @returns 
             */
            const ComposedAdd = (a : number, b : number) : number=>{
                return Fx(
                    [ [a, $Number], [b, $Number] ],
                    $Number,
                    (a, b)=>{
                        return Add(a, b) as unknown as number
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