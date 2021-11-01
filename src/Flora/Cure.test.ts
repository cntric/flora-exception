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
    CureBlight,
    isBlight,
    IsBlighted,
    isBlightKey,
} from "./Blight";
import {
    generate
} from "shortid";
import { Bother } from "./Bother";
import { Cure, CureI } from "./Cure";

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

        test("Initializes", async ()=>{


            const site = generate();

            const cure = await db.client.query<CureI>(Cure({
                site : site,
                expr : Add.toString()
            }))

            expect(cure.site).toBe(site);
            expect(cure.expr).toBe(Add.toString());

        })

        test("Resolves a blight", async ()=>{

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
            expect(
                await db.client.query(IsBlighted(blight))
            ).toBe(true);

            const cured = await db.client.query<BlightI>(
                CureBlight(
                    blight,
                    Cure()
                )
            );

            expect(cured.blighted).toBe(false);
            expect(cured.cured[0]).toStrictEqual(blight);

        })

    })


}; BlightSuiteA();