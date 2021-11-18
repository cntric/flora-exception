import { query } from "faunadb";
const {
    If,
    Select, Var, Lambda, And, ContainsPath, IsObject, Reduce
} = query;

export interface PredicateI {
    (obj : any) : boolean
}
export interface OptionalPredicateI extends PredicateI{
    optional : true
}

export interface Typed$ObjectArgsI {
    [key : string] : PredicateI | OptionalPredicateI
}

/**
 * Forms an optional field predicate.
 * @param predicate Is the type predicate used to verify the field if one is present
 * @returns 
 */
export const $Optional = (predicate : (obj : any)=>boolean) : OptionalPredicateI=>{
    (predicate as OptionalPredicateI).optional = true;
    return predicate as OptionalPredicateI;
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
export const PredicatesSatisfied = (predicates : query.ExprArg)=>{
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
export const $Object = (args ? : Typed$ObjectArgsI)=>(obj : any) : boolean=>{
    return  args ? If(
        IsObject(obj),
        PredicatesSatisfied(extractPredicates(args, obj)),
        false
    ) as boolean : IsObject(obj) as boolean
}