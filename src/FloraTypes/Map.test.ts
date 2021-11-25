import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { $Object } from "./Object";
import { $And, $Extends} from "./And";
import {$Array} from "./Array";
import {$String, $Number} from "./Primitives"
import {$Map} from "./Map";

export const MapSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Simple $Map", async()=>{

            const $SMap = $Map($String, $Number);

            const result = await db.client.query(
                $SMap({
                    liam : 3,
                    rory : 4,
                    mom : 5
                })
            );

           expect(result).toBe(true);

        })

       test("Simple $Map fails", async()=>{

            const $SMap = $Map($String, $Number);

            const result = await db.client.query(
                $SMap({
                    liam : 3,
                    rory : 4,
                    mom : "hello"
                })
            );


            expect(result).toBe(false); // you a dude, but y'ain't a cowboy.

        })

    })


}; MapSuiteA();