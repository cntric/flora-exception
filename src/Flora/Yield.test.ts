import {
    query,
    Client,
    CreateCollection,
    Var,
    Exists,
    IsNumber,
    IsString
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import {
    Yield,
} from "./Yield";
import {
    generate
} from "shortid";
import { Bother, BotherI } from "./Bother";
import { mkDefaultResolve, mkResolve } from "./Resolve";

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

            const result = await db.client.query<number>(Yield({
                soil : [Add(2, 2) as number],
                spring : (sum : number) : number =>{
                    
                    return Add(sum, 2) as number
                },
                guide : (sum : number) : boolean =>{
                    
                    return IsNumber(sum) as boolean
                },
                resolve : mkResolve(
                    (blight)=>{return blight},
                    (interpret)=>{return Bother()}
                )
            }));
            
            expect(result).toBe(6);
    
        }, 10000)

        test("Nested yields", async ()=>{

            const InterestingFunc = (sum : number) =>{
                return Yield({
                    soil : [sum],
                    spring : (sum : number) : number=>{
                        return Add(sum, 2) as number
                    },
                    guide : (sum : number)=>{
                        return IsNumber(sum) as boolean;
                    },
                    resolve : mkResolve(
                        (blight)=>{return blight},
                        (interpret)=>{return Bother()}
                    )
                })
            }
    
            const result = await db.client.query<number>(InterestingFunc(
                InterestingFunc(2) as number
            ));

            expect(result).toBe(6);
            

        });

        test("Blight", async ()=>{

            const InterestingFunc = (sum : number) : number =>{
                return Yield({
                    soil : [sum],
                    spring : (sum) : number=>{
                        return Add(sum, 2) as number
                    },
                    guide : (sum)=>{
                        return IsString(sum) as boolean;
                    },
                    resolve : mkResolve(
                        (blight)=>{return blight},
                        (interpret)=>{return Bother()}
                    )
                })
            }
    
            const result = await db.client.query<number>(InterestingFunc(
                2
            ));

            console.log(result);

            

        })

    })


}; YieldSuiteA();