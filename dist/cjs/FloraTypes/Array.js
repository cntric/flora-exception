"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Array = void 0;
const query_1 = require("faunadb/query");
const agg = "agg";
const el = "el";
/**
 * Checks if all elements in an array are of a certain type
 * @param Predicate
 * @returns
 */
const $Array = (Predicate) => (obj) => {
    return (0, query_1.If)((0, query_1.IsArray)(obj), (0, query_1.Reduce)((0, query_1.Lambda)([agg, el], (0, query_1.And)((0, query_1.Var)(agg), Predicate((0, query_1.Var)(el)))), true, obj), false);
};
exports.$Array = $Array;
