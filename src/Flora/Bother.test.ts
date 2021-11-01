import {
    query,
    Client,
    CreateCollection,
    Var,
    Exists
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import {
    Bother,
    BotherI,
    isBother,
    isBotherKey,
} from "./Bother";

const {
    Add,
    Create,
    Get
} = query;

export const BotherSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Bother initializes", async ()=>{

            const result = await db.client.query<BotherI>(Bother({
                result : Add(2,2)
            }));
            
            expect(result.result).toBe(4);
            expect(result[isBotherKey]).toBe(true);
    
        }, 10000)

        test("No arg initialization.", async ()=>{

            const result = await db.client.query<BotherI>(Bother());
            console.log(result);
            expect(isBother(result)).toBe(true);

        })

        test("Takes message", async ()=>{
            const msg = "This is an important message.";
            const result = await db.client.query<BotherI>(Bother({
                msg : msg
            }));
            expect(result.msg).toBe(msg);
        })

        
    })


}; BotherSuiteA();