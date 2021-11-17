import { IsNumber, Lambda, Let, query } from "faunadb";
import { FloraError, FloraErrorI } from "./Error";
import { AddErrorToStack, Raise } from "./Raise";
import { Yield } from "./Yield";
const {
    Map ,
    If,
    Var,
    Select, 
    Add
} = query;

export interface FxArgI<T> {
    0 : T,
    1 ? : (obj : any)=>boolean
}

type FxArgExtractedT<T> = T extends FxArgI<infer X> ? X : never;
type FxExtractedArgsT<T extends FxArgI<any>[]> = {
    [key in keyof T] : FxArgExtractedT<T[key]>
}

export const ValidateArg = <A extends FxArgI<any>>(arg : A, loc : string) : true | FloraErrorI=>{

    const Predicate = arg[1] ? arg[1] : ()=>true

    return If(
        Predicate(arg[0]),
        true,
        FloraError({
            name : "Type Error",
            location : loc
        })
    ) as true | FloraErrorI
}

const arg = "arg";
export const ValidateArgs = <A extends FxArgI<any>[]>(args : A, loc : string)=>{

    return Map(
        args,
        Lambda(
            arg,
            ValidateArg(Var(arg) as FxArgI<any>, loc)
        )
    )

}

export const ExtractArg = <A extends FxArgI<any>>(arg : A, loc : string) : FxArgExtractedT<A>=>{

    const Predicate = arg[1] ? arg[1] : ()=>true

    return If(
        Predicate(arg[0]),
        arg[0],
        Raise(FloraError({
            name : "Type Error",
            location : loc
        }))
    ) as FxArgExtractedT<A>
}

export const ExtractArgs = <A extends FxArgI<any>[]>(args : A, loc : string) : FxExtractedArgsT<A>=>{

    return Map(
        args,
        Lambda(
            arg,
            ExtractArg(Var(arg) as FxArgI<any>, loc)
        )
    ) as FxExtractedArgsT<A>

}

export const extractArgs = <A extends FxArgI<any>[]>(args : A, loc : string) : FxExtractedArgsT<A>=>{
    return args.map((arg)=>{
        return ExtractArg(arg, loc)
    }) as FxExtractedArgsT<A>
}


const bargs = "bargs";
const xargs = "xargs"
export const Fx = <A extends FxArgI<any>[], T>(
    args : A,
    expr : (...args : FxExtractedArgsT<A>)=>T
)=>{

    const caller = (new Error()).stack?.split("\n")[2].trim().split(" ")[1];

    return Yield({
            name : caller || "",
            args : extractArgs(args, caller||""),
            expr : expr
        })
    

}