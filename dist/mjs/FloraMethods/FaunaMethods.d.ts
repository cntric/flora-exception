import { FloraRef } from "../FloraTypes";
/**
 * Gets the number absolute value of a number.
 * @param number is the number.
 * @returns |number|
 */
export declare const Abs: (...args: number[]) => number;
/**
 * Gets the arc cosine value of a number
 * @param number is the number
 * @retuns
 */
export declare const Acos: (...args: number[]) => number;
/**
 * Adds numbers.
 * @param numbers
 * @returns
 */
export declare const Add: (...numbers: number[]) => number;
/**
 * Appends elements to an array.
 * @param elems
 * @param base
 * @param Predicate
 * @returns
 */
export declare const Append: <T extends unknown>(elems: T[], base: T[], $Predicate?: ((obj: any) => obj is T) | undefined) => T[];
/**
 * Type safe get method.
 * @param Ref is the ref to get.
 * @param $Predicate is an optional predicate specifying what kind of object should be returned from the get.
 * @returns
 */
export declare const Get: <T extends unknown>(Ref: FloraRef<T>, $Predicate?: (obj: any) => obj is T) => T;
