"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Array = void 0;
const faunadb_1 = require("faunadb");
const { IsArray, Reduce, If, Lambda, Var, And } = faunadb_1.query;
const agg = "agg";
const el = "el";
/**
 * Checks if all elements in an array are of a certain type
 * @param Predicate
 * @returns
 */
const $Array = (Predicate) => (obj) => {
    return If(IsArray(obj), Reduce(Lambda([agg, el], And(Var(agg), Predicate(Var(el)))), true, obj), false);
};
exports.$Array = $Array;
