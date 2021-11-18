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
import { FloraException, FloraExceptionI, isFloraException } from "./Exception";
import { Yield } from "./Yield";
import { extractArgs, Fx, FxArgI, mFx } from "./Fx";
import { $String, $Number } from "../FloraTypes";

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
                    $Number,
                    (a ,b)=>{
                        return Add(a, b) as number
                    }
                )
            }

            const result = await db.client.query<FloraExceptionI[]>(Flora(
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
                    $Number,
                    (a)=>{
                        return Sum(a) as number
                    }
                )
            }

            const result = await db.client.query<FloraExceptionI[]>(Flora(
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
                    $String,
                    (a, b)=>{
                        return Concat([ToString(Sum(a)), b], "") as string
                    }
                )
            }

            const result = await db.client.query<FloraExceptionI[]>(Flora(
                CoolFunc(
                    [2, 2, 2, 2],
                    " is Liam's score."
                )
            ));
            
            expect(result).toBe("8 is Liam's score.");

        })

        test("Can get extracted Exceptions", async()=>{

            const args : FxArgI<any>[] = [
                [2, IsNumber as ()=>boolean],
                ["3", IsString as ()=>boolean],
                [[4, 5, 6], IsString as ()=>boolean]
            ]

            const result = await db.client.query<FloraExceptionI[]>(Flora(
                extractArgs(args, "Here")
            ));

            

            const secondResult = await db.client.query<FloraExceptionI[]>(Flora(
                Yield({
                    args : extractArgs(args, "Here"),
                    expr : (a ,b, c)=>{
                        return [a, b, c]
                    }
                })
            ));

            

        })

        test("Exception", async ()=>{

            const ExceptionFunc = (a : number[])=>{
                return Fx(
                    [
                        [a, IsString as ()=>boolean],
                    ],
                    $String,
                    (a)=>{
                        return Concat([a, " great time."], "") as string
                    }
                )
            }

            const result = await db.client.query<FloraExceptionI[]>(Flora(
                ExceptionFunc(
                    [2, 2, 2, 2],
                )
            ));
            
            expect(isFloraException(result)).toBe(true);

        })

        test("Complex Exception", async ()=>{

            const ExceptionFunc = (a : number[], b : string)=>{
                return Fx(
                    [
                        [a, IsArray as ()=>boolean],
                        [b, IsArray as ()=>boolean]
                    ],
                    $String,
                    (a, b)=>{
                        return Concat([ToString(Sum(a)), b], "") as string
                    }
                )
            }

            const result = await db.client.query<FloraExceptionI[]>(Flora(
                ExceptionFunc(
                    [2, 2, 2, 2],
                    " a thing"
                )
            ));
        })

        test("Basic mfx", async()=>{


            const FloraAdd = mFx(
                [$Number, $Number], $Number,
                (a , b)=>{
                    return Add(a, b) as number
                }
            )

            const result = await db.client.query(Flora(
                FloraAdd(2, 2)
            ));

            expect(result).toBe(4);

        })

        test("Failed mfx", async()=>{


            const FloraAdd = mFx(
                [$Number, $Number], $Number,
                (a , b)=>{
                    return Add(a, b) as number
                }
            )

            const result = await db.client.query(Flora(
                FloraAdd(2, "hello" as unknown as number)
            ));

            expect(isFloraException(result)).toBe(true);

        })

        test("Return exception", async ()=>{

            const FloraAdd = mFx(
                [$Number, $Number], $Number,
                (a , b)=>{
                    return "hello" as unknown as number
                }
            )

            const result = await db.client.query(Flora(
                FloraAdd(2, 2)
            ));

            expect(isFloraException(result)).toBe(true);


        })


    })


}; FxSuiteA();