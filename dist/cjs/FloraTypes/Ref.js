"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Ref = void 0;
const query_1 = require("faunadb/query");
const Any_1 = require("./Any");
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
const $Ref = (Predicate = Any_1.$Any) => (obj) => {
    return Predicate ? (0, query_1.If)((0, query_1.IsRef)(obj), Predicate((0, query_1.Get)(obj)), false) : (0, query_1.IsRef)(obj);
};
exports.$Ref = $Ref;
