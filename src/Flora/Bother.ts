import { Length, query, Subtract } from "faunadb";
import { Garden, GardenI } from "./Garden";

const {
    If,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge
} = query;

export const isBotherKey = "isBother";
export const BotherType = "Bother" as const;
export interface BotherI<T extends string = typeof BotherType> {
    [isBotherKey] : true,
    msg : string,
    result : query.ExprArg,
    type : T,
    garden : GardenI<any>
}
/**
 * Client predicate for whether any obj is a Bother.
 * @param obj 
 * @returns 
 */
 export const isBother = (obj : any) : obj is BotherI =>{

    return obj instanceof Object && obj[isBotherKey] === true;

}

/**
 * FQL expression to detect if something is a Bother.
 * @param expr 
 * @returns 
 */
export const IsBother = (expr : query.ExprArg) : expr is BotherI=>{

    return If(
        IsObject(expr),
        If(
            Contains(isBotherKey, expr),
            Equals(
                Select(isBotherKey, expr),
                true
            ),
            false
        ),
        false
    ) as boolean

}

export interface BotherArgsI<T extends string = typeof BotherType> {
    result? : query.ExprArg,
    msg? : string,
    type? : T
    context? : string
}
export const NoExceptionMessage = "No message provided for this Bother.";
export const DefaultBother :BotherI= {
    [isBotherKey] : true,
    result : false,
    msg : NoExceptionMessage,
    type : BotherType,
    garden : Garden() // something wrong with the garden
}

/**
 * FQL Expression to create a Bother.
 * @param expr 
 * @param msg 
 * @returns 
 */
export const Bother = <T extends string = typeof BotherType>(
    args? : BotherArgsI<T>
) : BotherI<T> =>{

    return Merge(
        DefaultBother,
        [ 
            args || {}
        ]
     ) as BotherI<T>

}