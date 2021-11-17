import {
    query,
    Client,
    CreateCollection,
    Var,
    Exists,
    IsNumber,
    IsArray,
    Do,
    Delete,
    Collection,
    CurrentIdentity,
    And
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import {
    blight,
    DefaultCheckPermission,
    Flora,
    FloraCollection,
    FloraDocumentT,
    FloraEnvironmentI,
    FloraI,
    UpdateBlightOnFloraDocument,
    usedFloraIdentity,
    withIdentity,
} from "./Flora";
import { floraDocumentKey } from "./Key";
import { Yield } from "./Yield";
import { BlightI } from "./Blight";

const {
    Add,
    IsString,
    Create,
    Get,
    Select,
    ContainsPath
} = query;

export const FloraSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Checks flora doc", async ()=>{

           const result = await db.client.query(DefaultCheckPermission({
                data : {
                    [usedFloraIdentity] : false,
                    [withIdentity] : "",
                    [blight] : {
                    }
                }
            } as unknown as FloraDocumentT))

            

        })

        test("Flora db creates", async ()=>{

            const result = await db.client.query(FloraCollection());

            
        
    
        }, 10000)

        test("Basic flora query", async ()=>{

            const result = await db.client.query(Flora(Var(floraDocumentKey)));

        })

        test("Yield with flora", async ()=>{
            const result = await db.client.query(Flora(Yield({
                soil : [2, 2],
                spring : (a, b)=>Add(a, b),
                guide : (a, b)=>And(
                    IsNumber(a),
                    IsNumber(b)
                ) as boolean
            })));
            expect(result).toBe(4);
        })

        test("Updates blight", async ()=>{

            const testName = "test";
            const test : BlightI = {
                name : testName,
                blighted : false,
                spread : [],
                isBlight : true,
                cured : []
            };
            const updatedTest : BlightI = {
                ...test,
                spread : [
                    {
                        isBother : true,
                        msg : "nothing",
                        type : "Bother",
                        result : "thing",
                        garden : {
                            isGardenKey : true,
                            name : "garden",
                            soil : "thing"
                        }
                    }
                ]
            };
            const anotherTestName = "anything";
            const anotherTest : BlightI = {
                name : anotherTestName,
                blighted : false,
                spread : [],
                isBlight : true,
                cured : []
            };

            const result =  await db.client.query<any>(
                Flora(Do(
                    UpdateBlightOnFloraDocument(test),
                    UpdateBlightOnFloraDocument(updatedTest),
                    UpdateBlightOnFloraDocument(anotherTest),
                )));
                expect(result.data.blights[anotherTestName]).toStrictEqual(anotherTest);
                expect(result.data.blights[testName]).toStrictEqual(updatedTest)
        })

        test("Blight with flora", async ()=>{
            const result = await db.client.query(
                Flora(Do(
                    Yield({
                        soil : [2, 2],
                        guide : (a, b)=>And(
                            IsString(a),
                            IsString(b)
                        ) as boolean,
                        spring : (a, b)=>Add(a, b),
                    }),
                   Get(Select("ref",Var(floraDocumentKey)))
                ))
            );

            

        })

    })


}; FloraSuiteA();