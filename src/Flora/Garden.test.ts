import {
    query,
    Client,
    CreateCollection,
    Var,
    Exists,
    IsNumber,
    IsArray
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import {
    Garden,
    GardenI,
    isGarden,
    isGardenKey,
    IsHealthyGarden,
} from "./Garden";

const {
    Add,
    Create,
    Get
} = query;

export const GardenSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Garden initializes", async ()=>{

            const result = await db.client.query<GardenI<[number]>>(Garden({
                soil : [
                    Add(2, 2)
                ]
            }));
            
            expect(result.soil).toStrictEqual([4]);
            expect(result[isGardenKey]).toBe(true);
    
        }, 10000)


        test("Garden handles multiple soil inputs.", async ()=>{

            const result = await db.client.query<GardenI<[number, number, string]>>(Garden({
                soil : [
                    Add(2, 2),
                    Add(3, 3),
                    "Hello"
                ]
            }));
            
            expect(result.soil).toStrictEqual([4, 6, "Hello"]);
            expect(result[isGardenKey]).toBe(true);

        })

        test("Garden handles multiple soil inputs.", async ()=>{

            const result = await db.client.query<GardenI<[number, number, string]>>(Garden({
                soil : [
                    Add(2, 2),
                    Add(3, 3),
                    "Hello"
                ]
            }));
            
            expect(result.soil).toStrictEqual([4, 6, "Hello"]);
            expect(result[isGardenKey]).toBe(true);

        })

        test("Accepts name", async ()=>{
            const name = "Such a perfect garden.";
            const result = await db.client.query<GardenI<[number, number, string]>>(Garden({
                soil : [
                    Add(2, 2),
                    Add(3, 3),
                    "Hello"
                ],
                name : name
            }));
            
            expect(result.soil).toStrictEqual([4, 6, "Hello"]);
            expect(result.name).toBe(name);
            expect(result[isGardenKey]).toBe(true);
        })
        
        test("Checks healthy garden", async ()=>{
            const name = "Such a perfect garden.";
            const result = await db.client.query<GardenI<[number]>>(
                IsHealthyGarden(
                    Garden({
                        soil : [2],
                        name : name
                    }),
                    IsArray as ()=>boolean
                )
            )


        })

        
    })


}; GardenSuiteA();