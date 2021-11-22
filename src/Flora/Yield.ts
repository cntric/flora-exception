import {
    ContainsPath,
    If,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge,
    Var,
    Let,
    ExprArg
} from "faunadb/query"
import {
    generate
} from "shortid";
import { ContainsException, FloraException, GetExceptions } from "./Exception";
import { Reraise } from "./Raise";



export const expressArgs = <A extends any[]>(args : A, evaluatedArgs : ExprArg, loc : string) : A=>{
    return args.map((arg, index)=>{
        return If(
            ContainsPath(index, evaluatedArgs),
            Select(index, evaluatedArgs),
            FloraException({
                name : "UndefinedArgException",
                msg : `The arg at index ${index} was not defined.`,
                location : loc
            })
        )
    }) as A
}


export interface _YieldArgsI<A extends any[], T>{
    name : string,
    args : A,
    expr : (...args : A)=>T
}

const bargs = "bargs";
const result = "result";
/**
 * Yields the result of an expression.
 * @param args 
 * @returns 
 */
 export const _Yield = <A extends any[], T>(args : _YieldArgsI<A, T>) : T=>{
    return Let(
        {
            [bargs] : args.args, // need to evaluate the args so that we do not have any stateful nonesense
            [result] : If(
                ContainsException(Var(bargs)),
                Reraise(GetExceptions(Var(bargs) as unknown as any[]), FloraException({
                    name : "ReraisedException",
                    msg : "This exception was reraised in a yield expression.",
                    location : args.name
                })),
                args.expr(...expressArgs(args.args, Var(bargs), args.name))
            )
        },
        Var(result)
    ) as unknown as T
}

export interface YieldArgsI<A extends any[], T>{
    name? : string,
    args : A,
    expr : (...args : A)=>T
}

export const Yield =  <A extends any[], T>(args : YieldArgsI<A, T>) : T=>{

    const caller = (new Error()).stack?.split("\n")[2].trim().split(" ")[1];

    const _args : _YieldArgsI<A, T> = {
        name : caller || "undefined",
        ...args
    }

    return _Yield(_args)

}