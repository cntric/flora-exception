import {
    query
} from "faunadb"
import {
    generate
} from "shortid";
import { ContainsError, FloraError, GetErrors } from "./Error";
import { Reraise } from "./Raise";

const {
    If,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge,
    Var,
    Let
} = query;




export interface _YieldArgsI<A extends any[], T>{
    name : string,
    args : A,
    expr : (...args : A)=>T
}

const bargs = "bargs";
/**
 * Yields 
 * @param args 
 * @returns 
 */
 export const _Yield = <A extends any[], T>(args : _YieldArgsI<A, T>) : T=>{

    console.log(args.name, args.args);

    return If(
            ContainsError(args.args),
            Reraise(GetErrors(args.args), FloraError({
                location : args.name
            })),
            args.expr(...args.args)
        ) as T

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