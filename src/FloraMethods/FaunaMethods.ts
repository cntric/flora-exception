import * as q from "faunadb/query";
import { Fx } from "../Flora";
import { $Any, $Number, $Array, FloraRef, $Ref } from "../FloraTypes";
import { mFx } from "../Flora";


/**
 * Gets the number absolute value of a number.
 * @param number is the number.
 * @returns |number|
 */
export const Abs = mFx(
    [$Number], $Number,
    (number)=>q.Abs(number) as unknown as  number
)

// Access provider

// Access providers

/**
 * Gets the arc cosine value of a number
 * @param number is the number
 * @retuns
 */
export const Acos = mFx(
    [$Number], $Number,
    (number)=>q.Acos(number) as unknown as number
)

/**
 * Adds numbers.
 * @param numbers 
 * @returns 
 */
export const Add = (...numbers : number[]) : number=>{

    return Fx(
        [ [numbers, $Array($Number)] ], $Number,
        (...numbers)=>q.Add(...numbers) as unknown as number 
    )

}

/**
 * Appends elements to an array. 
 * @param elems 
 * @param base 
 * @param Predicate 
 * @returns 
 */
export const Append = <T extends any>(
    elems : T[],
    base : T[],
    $Predicate ? : (obj : any)=>obj is T
) : T[] =>{

    const _$Predicate = $Predicate || $Any;

    return Fx(
        [ [elems, $Array(_$Predicate)] ,[ base, $Array(_$Predicate)] ], $Array(_$Predicate),  
        (elems, base)=>q.Append(elems, base) as unknown as T[]
    )

}

/**
 * Type safe get method.
 * @param Ref is the ref to get.
 * @param $Predicate is an optional predicate specifying what kind of object should be returned from the get.
 * @returns 
 */
export const Get = <T extends any>(
    Ref : FloraRef<T>,
    $Predicate : (obj : any)=>obj is T = $Any as unknown as  (obj : any)=>obj is T
) : T =>{

    return Fx(
        [ [Ref, $Ref($Predicate)] ], $Predicate,
        (Ref)=>q.Get(Ref) as unknown as T
    )

}