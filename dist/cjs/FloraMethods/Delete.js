"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
const FloraTypes_1 = require("../FloraTypes");
const faunadb_1 = require("faunadb");
const Delete = (ref, $Predicate = FloraTypes_1.$Any) => {
    return faunadb_1.query.If(faunadb_1.query.Exists(ref), faunadb_1.query.Delete(ref), faunadb_1.query.Abort("No ref"));
};
exports.Delete = Delete;
