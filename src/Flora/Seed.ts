import {
    query
} from "faunadb"
import {
    Blight,
    BlightI,
    IsBlighted
} from "./Blight";
import {
    floraNoneVal
} from "./Key";
const {
    If,
    Object : CreateObject,
    IsObject,
    Select,
    Contains,
    Equals,
    Append,
    Merge,
    Var,
    Let
} = query;

export const IsSeedKey = "isYield";
export interface SeedI<T> {
    [IsSeedKey] : true,
    0 : T,
    1 : BlightI
}
export type S<T> = SeedI<T>


/**
 * Client predicate for whether any obj is a Seed.
 * @param obj 
 * @returns 
 */
 export const isSeed = (obj : any) : obj is SeedI<any>=>{

    return obj instanceof Object && obj[IsSeedKey] === true;

}

/**
 * FQL expression to detect if something is a Seed.
 * @param expr 
 * @returns 
 */
export const IsSeed = (expr : query.ExprArg) : expr is SeedI<any>=>{

    return If(
        IsObject(expr),
        If(
            Contains(IsSeedKey, expr),
            Equals(
                Select(IsSeedKey, expr),
                true
            ),
            false
        ),
        false
    ) as boolean

}

export const DefaultSeed  = {
    [IsSeedKey] : true,
    0 : floraNoneVal,
    1 : Blight()
} as const;

/**
 * 
 * @param value 
 * @param blight 
 * @returns 
 */
export const Seed = <T>(value : T, blight  : BlightI = Blight())=>{

    return Merge(
        DefaultSeed,
        [
            CreateObject([
                ["value", value],
                ["blight", blight]
            ])
        ]
    )

}

export const GetSeedBlight = (seed : SeedI<any>) : BlightI=>{
    return Select(
        1,
        seed
    ) as BlightI
}

export const IsSeedBlighted = (seed : SeedI<any>) : boolean=>{

    return IsBlighted(
        GetSeedBlight(seed)
    ) as boolean

}

