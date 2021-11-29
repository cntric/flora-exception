"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Document = void 0;
const faunadb_1 = require("faunadb");
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
const $Document = (Predicate) => {
    const name = `${Predicate ? Predicate.name : "$Unspecified"}Doc`;
    const map = {
        [name]: (obj) => {
            return Predicate ? (0, faunadb_1.If)((0, faunadb_1.And)((0, faunadb_1.IsDoc)(obj), (0, faunadb_1.ContainsPath)("data", obj)), Predicate((0, faunadb_1.Select)("data", obj)), false) : (0, faunadb_1.IsDoc)(obj);
        }
    };
    return map[name];
};
exports.$Document = $Document;
