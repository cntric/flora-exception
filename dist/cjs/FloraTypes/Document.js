"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Document = void 0;
const query_1 = require("faunadb/query");
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
const $Document = (Predicate) => (obj) => {
    return Predicate ? (0, query_1.If)((0, query_1.IsDoc)(obj), Predicate((0, query_1.Select)("data", obj)), false) : (0, query_1.IsDoc)(obj);
};
exports.$Document = $Document;
