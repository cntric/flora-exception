"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Array = void 0;
const faunadb_1 = require("faunadb");
const agg = "agg";
const el = "el";
/**
 * Checks if all elements in an array are of a certain type
 * @param Predicate
 * @returns
 */
const $Array = (Predicate) => (obj) => {
    return (0, faunadb_1.If)((0, faunadb_1.IsArray)(obj), (0, faunadb_1.Reduce)((0, faunadb_1.Lambda)([agg, el], (0, faunadb_1.And)((0, faunadb_1.Var)(agg), Predicate((0, faunadb_1.Var)(el)))), true, obj), false);
};
exports.$Array = $Array;
