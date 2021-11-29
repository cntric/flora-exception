"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetExceptions = exports.ContainsException = exports.IsException = exports.isFloraException = exports.FloraException = exports.isFloraExceptionKey = void 0;
const faunadb_1 = require("faunadb");
const { Append, IsArray, Not, Or, Reduce, Var, Select, If, IsObject, ContainsPath, Equals, Filter, Lambda, And, } = faunadb_1.query;
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
    return If(And(Not(IsArray(expr)), IsObject(expr)), If(ContainsPath(exports.isFloraExceptionKey, expr), Equals(Select(exports.isFloraExceptionKey, expr), true), false), false);
};
exports.IsException = IsException;
const agg = "agg";
const el = "el";
const ContainsException = (exprs) => {
    return Reduce(Lambda([agg, el], Or(Var(agg), (0, exports.IsException)(Var(el)))), false, exprs);
};
exports.ContainsException = ContainsException;
const GetExceptions = (exprs) => {
    return Reduce(Lambda([agg, el], If((0, exports.IsException)(Var(el)), Append([Var(el)], Var(agg)), Var(agg))), [], exprs);
};
exports.GetExceptions = GetExceptions;
