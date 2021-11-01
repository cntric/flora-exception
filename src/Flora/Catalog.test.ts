import {
    query,
    Client,
    CreateCollection,
    Var,
    Exists
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import {
    AddToBlight,
    Blight,
    BlightI,
    isBlight,
    isBlightKey,
} from "./Blight";
import {
    generate
} from "shortid";
import { Bother } from "./Bother";

const {
    Add,
    Create,
    Get
} = query;

export const BlightSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Blight initializes", async ()=>{

            const name = generate();
            const result = await db.client.query<BlightI>(Blight({
                name : name
            }));
            
            expect(result.name).toBe(name);
            expect(result.blighted).toBe(false);
            expect(result.spread.length).toBe(0);
            expect(result[isBlightKey]).toBe(true);
    
        }, 10000)

        test("Adding bother to blight", async ()=>{

            const name = generate();
            const result = await db.client.query<BlightI>(Blight({
                name : name
            }));

            const addition = await db.client.query<BlightI>(AddToBlight(result, Bother({
                msg : "A new bother to the blight"
            })))

            expect(addition.blighted).toBe(true);
            expect(addition.spread.length).toBe(1);

        })

        test("Adds and arbitrary number of bothers", async ()=>{

            const name = generate();
            const i = Math.floor(Math.random() * 100) + 10;

            const blight = await Array(i).fill(null).reduce<Promise<BlightI>>(async (blight, val, index)=>{

                return await db.client.query(AddToBlight(await blight, Bother({
                    msg : `${index}`
                })));

            }, db.client.query<BlightI>(Blight({
                name : name
            })))

            expect(blight.spread.length).toBe(i);
            expect(blight.name).toBe(name);


        })

    })


}; BlightSuiteA();