import { Append, IsArray, Not, Or, query, Reduce } from "faunadb";
const { Var, Select, If, IsObject, ContainsPath, Equals, Filter, Lambda, And } = query;
export const isFloraException = "isFloraException";
/**
 *
 * @param args
 * @returns
 */
export const FloraException = (args) => {
    return {
        name: args && args.name ? args.name : "FloraException",
        msg: args && args.msg ? args.msg : "None",
        at: args && args.at ? args.at : [],
        location: args && args.location ? args.location : "None",
        stack: args && args.stack ? args.stack : [],
        [isFloraException]: true
    };
};
/**
 * Checks if object is an Exception on Flora.
 * @param expr
 * @returns
 */
export const IsException = (expr) => {
    return If(And(Not(IsArray(expr)), IsObject(expr)), If(ContainsPath(isFloraException, expr), Equals(Select(isFloraException, expr), true), false), false);
};
const agg = "agg";
const el = "el";
export const ContainsException = (exprs) => {
    return Reduce(Lambda([agg, el], Or(Var(agg), IsException(Var(el)))), false, exprs);
};
export const GetExceptions = (exprs) => {
    return Reduce(Lambda([agg, el], If(IsException(Var(el)), Append([Var(el)], Var(agg)), Var(agg))), [], exprs);
};
