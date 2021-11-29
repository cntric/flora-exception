"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
const Flora_1 = require("../Flora");
const FloraTypes_1 = require("../FloraTypes");
const faunadb_1 = require("faunadb");
const Delete = (ref, $Predicate = FloraTypes_1.$Any) => {
    return (0, Flora_1.Fx)([[ref, (0, FloraTypes_1.$Ref)((0, FloraTypes_1.$Document)($Predicate))]], (0, FloraTypes_1.$Document)($Predicate), (ref) => faunadb_1.query.If(faunadb_1.query.Exists(ref), faunadb_1.query.Delete(ref), (0, Flora_1.FloraException)({
        name: "NoDocMatchingRef",
        msg: faunadb_1.query.Concat([
            `No document found for ref.`
        ])
    })));
};
exports.Delete = Delete;
