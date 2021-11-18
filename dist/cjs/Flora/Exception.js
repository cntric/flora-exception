"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetExceptions = exports.ContainsException = exports.IsException = exports.FloraException = exports.isFloraException = void 0;
const faunadb_1 = require("faunadb");
const { Var, Select, If, IsObject, ContainsPath, Equals, Filter, Lambda, And } = faunadb_1.query;
exports.isFloraException = "isFloraException";
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
        [exports.isFloraException]: true
    };
};
exports.FloraException = FloraException;
/**
 * Checks if object is an Exception on Flora.
 * @param expr
 * @returns
 */
const IsException = (expr) => {
    return If(And((0, faunadb_1.Not)((0, faunadb_1.IsArray)(expr)), IsObject(expr)), If(ContainsPath(exports.isFloraException, expr), Equals(Select(exports.isFloraException, expr), true), false), false);
};
exports.IsException = IsException;
const agg = "agg";
const el = "el";
const ContainsException = (exprs) => {
    return (0, faunadb_1.Reduce)(Lambda([agg, el], (0, faunadb_1.Or)(Var(agg), (0, exports.IsException)(Var(el)))), false, exprs);
};
exports.ContainsException = ContainsException;
const GetExceptions = (exprs) => {
    return (0, faunadb_1.Reduce)(Lambda([agg, el], If((0, exports.IsException)(Var(el)), (0, faunadb_1.Append)([Var(el)], Var(agg)), Var(agg))), [], exprs);
};
exports.GetExceptions = GetExceptions;
