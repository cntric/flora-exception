import {
    If,
    Select, Var, Lambda, And, ContainsPath, IsObject, Reduce,
    ExprArg
} from "faunadb";
import { GuardedT } from "Flora";

export interface PredicateI {
    (obj : any) : boolean
}
export interface OptionalPredicateI extends PredicateI{
    optional : true
}

export interface Typed$ObjectArgsI {
    [key : string] : PredicateI | OptionalPredicateI
}

export type Typed$ObjectT<A extends Typed$ObjectArgsI> = {
    [key in keyof A] : GuardedT<A[key]>
} 

/**
 * Forms an optional field predicate.
 * @param predicate Is the type predicate used to verify the field if one is present
 * @returns 
 */
export const $Optional = <P extends (obj : any)=>boolean>(
    Predicate : P
) : (obj : any)=> obj is (GuardedT<P> | undefined) =>{
    (Predicate as unknown as OptionalPredicateI).optional = true;
    return Predicate as unknown as (obj : any)=> obj is (GuardedT<P> | undefined);
}



/**
 * Extracts predicates to check against type fields.
 * @param args are the typed object args.
 * @param obj is the obj to be checked.
 * @returns 
 */
export const extractPredicates = (args : Typed$ObjectArgsI, obj : any)=>{
    return Object.keys(args).map((key)=>{
        return If(
            ContainsPath(key, obj),
            args[key](Select(key, obj)),
            (args[key] as OptionalPredicateI).optional ? true : false
        )
    })
}

export const agg = "agg";
export const el = "el";
/**
 * Checks if all predicates are satisfied.
 * @param predicates 
 * @returns 
 */
export const PredicatesSatisfied = (predicates : ExprArg)=>{
    return Reduce(
        Lambda(
            [agg, el],
            And(
                Var(agg),
                Var(el)
            )
        ),
        true,
        predicates
    )
}

/**
 * Forms the predicate for a type object.
 * @param args 
 * @returns 
 */
export const $Object = <O extends Typed$ObjectArgsI>(args ? : O)=>(obj : any) : obj is Typed$ObjectT<O>=>{
    return  args ? If(
        IsObject(obj),
        PredicatesSatisfied(extractPredicates(args, obj)),
        false
    ) as unknown as boolean : IsObject(obj) as unknown as boolean
}
