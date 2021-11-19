/**
 * Number type predicate.
 * @param obj
 * @returns
 */
export declare const $Number: (obj: any) => obj is number;
/**
 * Int type predicate.
 * @param obj
 * @returns
 */
export declare const $Int: (obj: any) => obj is number;
/**
 * Unsigned int predicate.
 * @param obj
 */
export declare const $UInt: (obj: any) => obj is number;
/**
 *
 * @param obj
 * @returns
 */
export declare const $UInt8: (obj: any) => obj is number;
/**
 * String type predicate.
 * @param obj
 * @returns
 */
export declare const $String: (obj: any) => obj is string;
/**
 * Boolean type predicate.
 * @param obj
 * @returns
 */
export declare const $Boolean: (obj: any) => obj is boolean;
