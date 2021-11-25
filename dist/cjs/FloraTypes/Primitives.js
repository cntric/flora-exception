"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Boolean = exports.$String = exports.$UInt8 = exports.$UInt = exports.$Int = exports.$Number = void 0;
const query_1 = require("faunadb/query");
/**
 * Number type predicate.
 * @param obj
 * @returns
 */
const $Number = (obj) => {
    return (0, query_1.IsNumber)(obj);
};
exports.$Number = $Number;
/**
 * Int type predicate.
 * @param obj
 * @returns
 */
const $Int = (obj) => {
    return (0, query_1.IsInteger)(obj);
};
exports.$Int = $Int;
/**
 * Unsigned int predicate.
 * @param obj
 */
const $UInt = (obj) => {
    return (0, query_1.If)((0, exports.$Int)(obj), (0, query_1.GT)(obj, -1), false);
};
exports.$UInt = $UInt;
/**
 *
 * @param obj
 * @returns
 */
const $UInt8 = (obj) => {
    return (0, query_1.If)((0, exports.$UInt)(obj), (0, query_1.LT)(256), false);
};
exports.$UInt8 = $UInt8;
/**
 * String type predicate.
 * @param obj
 * @returns
 */
const $String = (obj) => {
    return (0, query_1.IsString)(obj);
};
exports.$String = $String;
/**
 * Boolean type predicate.
 * @param obj
 * @returns
 */
const $Boolean = (obj) => {
    return (0, query_1.IsBoolean)(obj);
};
exports.$Boolean = $Boolean;
