"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Ref = void 0;
const faunadb_1 = require("faunadb");
const { If, IsDoc, IsRef, Get } = faunadb_1.query;
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
const $Ref = (Predicate) => (obj) => {
    return Predicate ? If(IsRef(obj), Predicate(Get(obj)), false) : IsRef(obj);
};
exports.$Ref = $Ref;
