import { IsNumber, IsBoolean, If, IsString, IsInteger, GT, LT } from "faunadb";
/**
 * Number type predicate.
 * @param obj
 * @returns
 */
export const $Number = (obj) => {
    return IsNumber(obj);
};
/**
 * Int type predicate.
 * @param obj
 * @returns
 */
export const $Int = (obj) => {
    return IsInteger(obj);
};
/**
 * Unsigned int predicate.
 * @param obj
 */
export const $UInt = (obj) => {
    return If($Int(obj), GT(obj, -1), false);
};
/**
 *
 * @param obj
 * @returns
 */
export const $UInt8 = (obj) => {
    return If($UInt(obj), LT(256), false);
};
/**
 * String type predicate.
 * @param obj
 * @returns
 */
export const $String = (obj) => {
    return IsString(obj);
};
/**
 * Boolean type predicate.
 * @param obj
 * @returns
 */
export const $Boolean = (obj) => {
    return IsBoolean(obj);
};
