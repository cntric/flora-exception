"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetExceptions = exports.ContainsException = exports.IsException = exports.isFloraException = exports.FloraException = exports.isFloraExceptionKey = void 0;
const query_1 = require("faunadb/query");
exports.isFloraExceptionKey = "isFloraException";
/**
 *
 * @param args
 * @returns
 */
const FloraException = (args) => {
    return {
        name: args && args.name ? args.name : "FloraException",
        msg: args && args.msg ? args.msg : "None",
        at: args && args.at ? args.at : [],
        location: args && args.location ? args.location : "None",
        stack: args && args.stack ? args.stack : [],
        [exports.isFloraExceptionKey]: true
    };
};
exports.FloraException = FloraException;
/**
 * Asserts obj is Flora Exception at Client.
 * @param obj
 * @returns
 */
const isFloraException = (obj) => {
    return obj instanceof Object && obj[exports.isFloraExceptionKey] === true;
};
exports.isFloraException = isFloraException;
/**
 * Checks if object is an Exception on Fauna.
 * @param expr
 * @returns
 */
const IsException = (expr) => {
    return (0, query_1.If)((0, query_1.And)((0, query_1.Not)((0, query_1.IsArray)(expr)), (0, query_1.IsObject)(expr)), (0, query_1.If)((0, query_1.ContainsPath)(exports.isFloraExceptionKey, expr), (0, query_1.Equals)((0, query_1.Select)(exports.isFloraExceptionKey, expr), true), false), false);
};
exports.IsException = IsException;
const agg = "agg";
const el = "el";
const ContainsException = (exprs) => {
    return (0, query_1.Reduce)((0, query_1.Lambda)([agg, el], (0, query_1.Or)((0, query_1.Var)(agg), (0, exports.IsException)((0, query_1.Var)(el)))), false, exprs);
};
exports.ContainsException = ContainsException;
const GetExceptions = (exprs) => {
    return (0, query_1.Reduce)((0, query_1.Lambda)([agg, el], (0, query_1.If)((0, exports.IsException)((0, query_1.Var)(el)), (0, query_1.Append)([(0, query_1.Var)(el)], (0, query_1.Var)(agg)), (0, query_1.Var)(agg))), [], exprs);
};
exports.GetExceptions = GetExceptions;
