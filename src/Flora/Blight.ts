import { Length, query, Subtract } from "faunadb";
import { Bother, BotherI } from "./Bother";
import { CureI } from "./Cure";
import { floraBlightName } from "./Key";

const {
    If,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge
} = query;

export const isBlightKey = "isBlight";
export interface BlightI extends String{
    [isBlightKey] : true,
    name : string,
    blighted : boolean,
    spread : BotherI[],
    cure ? : CureI,
    cured : BlightI[]
}

/**
 * Client predicate for whether any obj is a Blight.
 * @param obj 
 * @returns 
 */
export const isBlight = (obj : any) : obj is BlightI=>{

    return obj instanceof Object && obj[isBlightKey] === true;

}

/**
 * FQL expression to detect if something is a Blight
 * @param expr 
 * @returns 
 */
export const IsBlight = (expr : query.ExprArg) : expr is BlightI=>{

    return If(
        IsObject(expr),
        If(
            Contains(isBlightKey, expr),
            Equals(
                Select(isBlightKey, expr),
                true
            ),
            false
        ),
        false
    ) as boolean

}


export interface BlightArgsI {
    name? : string, 
    blighted ? : boolean
    spread ? : BotherI[],
    cure ? : CureI,
    cured ? : BlightI[]
}

export const DefaultBlight : BlightI = {
    [isBlightKey] : true,
    name : floraBlightName,
    blighted : false,
    spread : [],
    cured : []
}

/**
 * 
 * @param args 
 * @returns 
 */
export const Blight = (
    args : BlightArgsI = DefaultBlight
 ) : BlightI=>{

    return Merge(
        DefaultBlight,
        [ 
            args,
            { 
                [isBlightKey] : true
            }
        ]
    ) as BlightI

}

/**
 * 
 * @param blight 
 * @param bother 
 * @returns 
 */
export const AddToBlight = (
    blight : BlightI, 
    bother : BotherI
) : BlightI=>{

    return Blight(
        Merge(
           blight,
           [
            {
                spread : Append(
                    [bother],
                    Select("spread", blight) as BotherI[]
                ) as BotherI[],
                blighted : true   
            }
           ]
        ) as BlightArgsI
    );

}

/**
 * 
 * @param blight 
 * @param cure 
 * @returns 
 */
export const CureBlight = (
    blight : BlightI,
    cure : CureI
) : BlightI=>{

    return Blight({
        spread : [], // reset the spread
        blighted : false, // there is no bother
        cured : Append(
            [blight],
            Select("cured", blight) as BotherI
        ) as BlightI["cured"],
        cure : cure
    })

}


export interface ExceptedStackI extends BlightI {
    bother : true
}

/**
 * Bother
 * @param blight 
 * @returns 
 */
export const GetBother = (blight : BlightI) : BotherI=>{

    return If(
        IsBlight(blight),
        Select(
            Subtract(Length(Select("spread", blight)), 1),
            Select("spread", blight)
        ),
        Bother()
    ) as BotherI

}

/**
 * Returns whether a blight object indicates something is blighted.
 * @param blight 
 * @returns 
 */
export const IsBlighted = (blight : BlightI)=>{

    return Select("blighted", blight)

}

/**
 * Gets the name of the blight.
 * @param blight 
 * @returns 
 */
export const GetBlightName = (blight : BlightI)=>{

    return Select("name", blight);

}
