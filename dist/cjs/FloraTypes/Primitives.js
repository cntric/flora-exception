"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Boolean = exports.$String = exports.$UInt8 = exports.$UInt = exports.$Int = exports.$Number = void 0;
const faunadb_1 = require("faunadb");
const { IsNumber, IsString, IsInteger, GT, LT } = faunadb_1.query;
/**
 * Number type predicate.
 * @param obj
 * @returns
 */
const $Number = (obj) => {
    return IsNumber(obj);
};
exports.$Number = $Number;
/**
 * Int type predicate.
 * @param obj
 * @returns
 */
const $Int = (obj) => {
    return IsInteger(obj);
};
exports.$Int = $Int;
/**
 * Unsigned int predicate.
 * @param obj
 */
const $UInt = (obj) => {
    return (0, faunadb_1.If)((0, exports.$Int)(obj), GT(obj, -1), false);
};
exports.$UInt = $UInt;
/**
 *
 * @param obj
 * @returns
 */
const $UInt8 = (obj) => {
    return (0, faunadb_1.If)((0, exports.$UInt)(obj), LT(256), false);
};
exports.$UInt8 = $UInt8;
/**
 * String type predicate.
 * @param obj
 * @returns
 */
const $String = (obj) => {
    return IsString(obj);
};
exports.$String = $String;
/**
 * Boolean type predicate.
 * @param obj
 * @returns
 */
const $Boolean = (obj) => {
    return (0, faunadb_1.IsBoolean)(obj);
};
exports.$Boolean = $Boolean;
