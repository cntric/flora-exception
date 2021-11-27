"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Document = void 0;
const query_1 = require("faunadb/query");
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
const $Document = (Predicate) => {
    const name = `${Predicate ? Predicate.name : "$Unspecified"}Doc`;
    const map = {
        [name]: (obj) => {
            return Predicate ? (0, query_1.If)((0, query_1.And)((0, query_1.IsDoc)(obj), (0, query_1.ContainsPath)("data", obj)), Predicate((0, query_1.Select)("data", obj)), false) : (0, query_1.IsDoc)(obj);
        }
    };
    return map[name];
};
exports.$Document = $Document;
