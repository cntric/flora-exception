import {
    query,
    Var,
    IsNumber,
    Do,
    And,
    IsArray,
    Sum,
    Concat,
    ToString
} from "faunadb";
import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import {
    blight,
    DefaultCheckPermission,
    Flora,
    FloraCollection,
    FloraDocumentT,
    GetStack,
    usedFloraIdentity,
    withIdentity,
} from "./Flora";
import {Raise, Reraise} from "./Raise";
import { FloraError, FloraErrorI, isFloraError } from "./Error";
import { Yield } from "./Yield";
import { extractArgs, Fx, FxArgI } from "./Fx";

const {
    Add,
    IsString,
    Create,
    Get,
    Select,
    ContainsPath
} = query;

export const FxSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Simple Fx", async ()=>{

            const CoolFunc = (a : number, b : number)=>{
                return Fx(
                    [
                        [a, IsNumber as ()=>boolean],
                        [b, IsNumber as ()=>boolean]
                    ],
                    (a ,b)=>{
                        return Add(a, b)
                    }
                )
            }

            const result = await db.client.query<FloraErrorI[]>(Flora(
                CoolFunc(2, 2)
            ));
            
            expect(result).toBe(4);

        })

        test("Array Fx", async ()=>{

            const CoolFunc = (a : number[])=>{
                return Fx(
                    [
                        [a, IsArray as ()=>boolean],
                    ],
                    (a)=>{
                        return Sum(a)
                    }
                )
            }

            const result = await db.client.query<FloraErrorI[]>(Flora(
                CoolFunc([2, 2, 2, 2])
            ));
            
            expect(result).toBe(8);

        })

        test("Mixed Fx", async ()=>{

            const CoolFunc = (a : number[], b : string)=>{
                return Fx(
                    [
                        [a, IsArray as ()=>boolean],
                        [b, IsString as ()=>boolean]
                    ],
                    (a, b)=>{
                        return Concat([ToString(Sum(a)), b], "")
                    }
                )
            }

            const result = await db.client.query<FloraErrorI[]>(Flora(
                CoolFunc(
                    [2, 2, 2, 2],
                    " is Liam's score."
                )
            ));
            
            expect(result).toBe("8 is Liam's score.");

        })

        test("Can get extracted errors", async()=>{

            const args : FxArgI<any>[] = [
                [2, IsNumber as ()=>boolean],
                ["3", IsString as ()=>boolean],
                [[4, 5, 6], IsString as ()=>boolean]
            ]

            const result = await db.client.query<FloraErrorI[]>(Flora(
                extractArgs(args, "Here")
            ));

            

            const secondResult = await db.client.query<FloraErrorI[]>(Flora(
                Yield({
                    args : extractArgs(args, "Here"),
                    expr : (a ,b, c)=>{
                        return [a, b, c]
                    }
                })
            ));

            

        })

        test("Error", async ()=>{

            const ErrorFunc = (a : number[])=>{
                return Fx(
                    [
                        [a, IsString as ()=>boolean],
                    ],
                    (a)=>{
                        return Concat([a, " great time."], "")
                    }
                )
            }

            const result = await db.client.query<FloraErrorI[]>(Flora(
                ErrorFunc(
                    [2, 2, 2, 2],
                )
            ));
            
            expect((result as any)[isFloraError]).toBe(true);

        })

        test("Complex error", async ()=>{

            const ErrorFunc = (a : number[], b : string)=>{
                return Fx(
                    [
                        [a, IsArray as ()=>boolean],
                        [b, IsArray as ()=>boolean]
                    ],
                    (a, b)=>{
                        return Concat([ToString(Sum(a)), b], "")
                    }
                )
            }

            const result = await db.client.query<FloraErrorI[]>(Flora(
                ErrorFunc(
                    [2, 2, 2, 2],
                    " a thing"
                )
            ));

            console.log(result);
            
            
            // expect((result as any)[isFloraError]).toBe(true);

        })


    })


}; FxSuiteA();