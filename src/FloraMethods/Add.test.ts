import {Add} from "./FaunaMethods";
import { Flora, isFloraException } from "../Flora";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";



export const AddSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Simple add", async ()=>{

           const result = await db.client.query(Flora(
                Add(2, 3)
            ))

            expect(result).toBe(5);
        
        })

        test("Multi add", async ()=>{

            const result = await db.client.query(Flora(
                 Add(2, 3, 4, 3, 2)
             ))
 
             expect(result).toBe(14);
         
         })

         test("Fails no num...", async()=>{
           
            const result = await db.client.query(Flora(
                Add(2, "2js3c4" as unknown as number, 4, "234234" as unknown as number, 2)
            ))

            expect(isFloraException(result)).toBe(true);


         })

    })


}; AddSuiteA();