import {
    query,
    Client,
    CreateCollection,
    Var,
    Exists,
    IsNumber
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import {
    Yield,
} from "./Yield";
import {
    SeedI
} from "./Seed";
import {
    generate
} from "shortid";
import { Bother } from "./Bother";
import {F} from "./Fruit";

const {
    Add,
    Create,
    Get
} = query;

export const YieldSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Yield works", async ()=>{

            const name = generate();
            const result = await db.client.query<SeedI<number>>(Yield({
                soil : [Add(2, 2) as F<number>],
                spring : (sum : F<number>)=>Add(sum, 2),
                guide : (sum : F<number>)=>IsNumber(sum) as boolean
            }));
            
            expect(result[0]).toBe(6);
    
        }, 10000)

    })


}; YieldSuiteA();