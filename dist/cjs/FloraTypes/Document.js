"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Document = void 0;
const faunadb_1 = require("faunadb");
const { If, IsDoc } = faunadb_1.query;
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns A Predicate
 */
const $Document = (Predicate) => (obj) => {
    return Predicate ? If(IsDoc(obj), Predicate((0, faunadb_1.Select)("data", obj)), false) : IsDoc(obj);
};
exports.$Document = $Document;
