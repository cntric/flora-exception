import { If, IsBoolean, query } from "faunadb"
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
export const $Number = (obj : any) : obj is number=>{
    return IsNumber(obj) as boolean
}

/**
 * Int type predicate.
 * @param obj 
 * @returns 
 */
export const $Int = (obj : any) : obj is number=>{
    return IsInteger(obj) as boolean
}

/**
 * Unsigned int predicate.
 * @param obj 
 */
export const $UInt = (obj : any) : obj is number=>{
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
export const $UInt8 = (obj : any) : obj is number=>{
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
export const $String = (obj : any) : obj is string=>{
    return IsString(obj) as boolean
}

/**
 * Boolean type predicate.
 * @param obj 
 * @returns 
 */
export const $Boolean = (obj : any) : obj is boolean=>{
    return IsBoolean(obj) as boolean
}