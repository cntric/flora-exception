"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Ref = void 0;
const faunadb_1 = require("faunadb");
const Any_1 = require("./Any");
/**
 * Document type predicate. Chcecks that any object is a document and has matching data.
 * @param Predicate is the predicate used to check the data.
 * @returns
 */
const $Ref = (Predicate = Any_1.$Any) => {
    const name = `${Predicate.name}Ref`;
    const map = {
        [name]: (obj) => {
            return Predicate ? (0, faunadb_1.If)((0, faunadb_1.IsRef)(obj), (0, faunadb_1.If)((0, faunadb_1.Exists)(obj), (0, faunadb_1.IsRef)(obj), Predicate((0, faunadb_1.Get)(obj))), false) : (0, faunadb_1.IsRef)(obj);
        }
    };
    return map[name];
};
exports.$Ref = $Ref;
