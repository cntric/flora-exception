import { If, query } from "faunadb"
const {
    IsNumber,
    IsString,
    IsInteger,
    GT,
    LT
} = query;

/**
 * Number type predicate.
 * @param obj 
 * @returns 
 */
export const $Number = (obj : any) : boolean=>{
    return IsNumber(obj) as boolean
}

/**
 * Int type predicate.
 * @param obj 
 * @returns 
 */
export const $Int = (obj : any) : boolean=>{
    return IsInteger(obj) as boolean
}

/**
 * Unsigned int predicate.
 * @param obj 
 */
export const $UInt = (obj : any) : boolean=>{
    return If(
        $Int(obj),
        GT(obj, -1),
        false
    ) as boolean
}

/**
 * 
 * @param obj 
 * @returns 
 */
export const $UInt8 = (obj : any) : boolean=>{
    return If(
        $UInt(obj),
        LT(256),
        false
    ) as boolean
}

/**
 * String type predicate.
 * @param obj  
 * @returns 
 */
export const $String = (obj : any) : boolean=>{
    return IsString(obj) as boolean
}