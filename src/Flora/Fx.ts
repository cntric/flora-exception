import {
    Concat,
    Map ,
    If,
    Var,
    Lambda,
    ToString,
    Let
} from "faunadb/query";
import { FloraException, FloraExceptionI, IsException, GetExceptions } from "./Exception";
import { AddExceptionToStack, Raise, Reraise } from "./Raise";
import { Yield } from "./Yield";
import {generate} from "shortid";
import { generateSlug } from "random-word-slugs";

export interface FxArgI<T> {
    0 : T,
    1 ? : (obj : any)=>boolean
}

type FxArgExtractedT<T> = T extends FxArgI<infer X> ? X : never;
type FxExtractedArgsT<T extends FxArgI<any>[]> = {
    [key in keyof T] : FxArgExtractedT<T[key]>
}

const result = "result";
const arg = "arg";
const xarg = "xarg";
/**
 * Extracts an arg from a TypePredicate tuple.
 * @param arg 
 * @param loc 
 * @returns 
 */
export const ExtractArg = <A extends FxArgI<any>>(arg : A, loc : string) : FxArgExtractedT<A>=>{

    const predicateName = arg[1] ? arg[1].name||"$Unspecified" : "$Unspecified";
    const Predicate = arg[1] ? arg[1] : ()=>true

    let arg0 = "";
    try {
        arg0 = JSON.stringify(arg[0]);
    } catch {
        arg0 = "Too deep";
    }

    return Let(
        {
            [xarg] : arg[0],
            [result] : If(
                Predicate(Var(xarg)),
                Var(xarg),
                Raise(FloraException({
                    name : "TypeException",
                    msg : Concat(
                        [
                            `Argument does not match type ${predicateName}: Value {`,
                            arg0,
                            `} is not of type ${predicateName}`
                        ]
                    ) as unknown as string,
                    location : loc
                }))
            )
        },
        Var(result)
    ) as FxArgExtractedT<A>
}

/**
 * Extracts args for a n array of TypePredicate tuples.
 * @param args 
 * @param loc 
 * @returns 
 */
export const ExtractArgs = <A extends FxArgI<any>[]>(args : A, loc : string) : FxExtractedArgsT<A>=>{

    return Map(
        args,
        Lambda(
            arg,
            ExtractArg(Var(arg) as unknown as FxArgI<any>, loc)
        )
    ) as unknown as FxExtractedArgsT<A>

}

/**
 * Extracts args from an array of type predicate Tuples on the client.
 * @param args 
 * @param loc 
 * @returns 
 */
export const extractArgs = <A extends FxArgI<any>[]>(args : A, loc : string) : FxExtractedArgsT<A>=>{
    return args.map((arg)=>{
        return ExtractArg(arg, loc)
    }) as FxExtractedArgsT<A>
}


export const getInstance = ()=>{
    return `${generateSlug(1, {
        format : "title",
        partsOfSpeech : ["adjective",],
        categories : {
            adjective : ["personality"]
        }
    })}${generateSlug(1, {
        format : "title",
        partsOfSpeech : ["noun",],
        categories : {
            noun : ["animals"]
        }
    })}/${generate()}`
}

export const getLocation = (errorStack : string) : [string, string]=>{
    const abbrev = errorStack.split("\n").slice(1).join("\n");
    const caller = errorStack.split("\n")[2].trim().split(" ")[1];
    const _location = `${getInstance()}/${errorStack.split("\n").length}`
    const mainLoaction =`${caller} $(${_location}/MAIN)\n${abbrev}`
    const yieldLocation = `${caller} $(${_location}/YIELD)\n${abbrev}`
    return [mainLoaction, yieldLocation]
}

const xargs = "xargs"
export const Fx = <A extends FxArgI<any>[], R extends (obj : any)=>boolean>(
    args : A,
    $ReturnType : R,
    expr : (...args : FxExtractedArgsT<A>)=>GuardedT<R>
) : GuardedT<R>=>{

    const errorStack = new Error().stack || "";
    const [mainLocation, yieldLocation] = getLocation(errorStack);
    const predicateName = $ReturnType ? $ReturnType.name||"$Unspecified" : "$Unspecified";

    return Let(
        {
            [result] : Yield({
                name : yieldLocation,
                args : extractArgs(args, mainLocation),
                expr : expr
            })
        },
        If(
            $ReturnType(
                Var(result)
            ),
            Var(result),
            If(
                IsException(
                    Var(result)
                ),
                Var(result),
                Raise(
                    FloraException({
                        name : "ReturnTypeExcpetion",
                        msg :  Concat(
                            [
                                `Return does not match type ${predicateName}: Value {`,
                                Var(result),
                                `} is not of type ${predicateName}`
                            ]
                        ) as unknown as string,
                        location : mainLocation
                    })
                )
            )
        )
    ) as GuardedT<R>
}

export type GuardedT<T> = T extends (obj: any) => obj is infer G ? G :any;
export type GuardedsT<T extends ((obj: any) => boolean)[]> = {
    [key in keyof T] : GuardedT<T[key]>
}

const reguardArgs = (args :any[], argTypes : ((obj : any)=>boolean)[]) : FxArgI<any>[]=>{
    return args.map((arg, index)=>{
        return [
            arg,
            argTypes[index] ? argTypes[index] : ()=>true
        ]
    })
}

interface PredicateI<T> {
    (obj : any) : obj is T 
}

/**
 * Factory for a Fx function.
 * @param args 
 * @param $ReturnType 
 * @param expr 
 * @returns 
 */
export const mFx = <A extends (PredicateI<any>)[], R extends (obj : any)=>boolean>(
    $ArgTypes : A,
    $ReturnType : R,
    expr : (...args : GuardedsT<A>)=>GuardedT<R>
)=>(...args : GuardedsT<A>) : GuardedT<R> =>{

    return Fx(
        reguardArgs(args, $ArgTypes),
        $ReturnType,
        expr as (...args : any[])=>GuardedT<R>
    )
}