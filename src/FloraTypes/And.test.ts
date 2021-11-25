import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { $Object } from "./Object";
import { $And, $Extends} from "./And";
import {$Array} from "./Array";
import {$String, $Number} from "./Primitives"

export const AndSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Simple $And", async()=>{

            const $Dude = $Object({
                name : $String
            });

            const $Vacero = $Object({
                nombre : $String
            });

            const $Cowboy = $And($Dude, $Vacero);

            const result = await db.client.query(
                $Cowboy({
                    name : "Liam",
                    nombre : "Liam"
                })
            );

           expect(result).toBe(true);

        })

       test("Simple $And fails", async()=>{

            const $Dude = $Object({
                name : $String
            });

            const $Vacero = $Object({
                nombre : $String
            });

            const $Cowboy = $And($Dude, $Vacero);

            const result = await db.client.query(
                $Cowboy({
                    name : "Liam"
                })
            );

            expect(result).toBe(false); // you a dude, but y'ain't a cowboy.

        })

    })


}; AndSuiteA();