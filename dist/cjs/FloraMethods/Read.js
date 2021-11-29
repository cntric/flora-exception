"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Read = void 0;
const FloraTypes_1 = require("../FloraTypes");
const faunadb_1 = require("faunadb");
const Read = (ref, $Predicate = FloraTypes_1.$Any) => {
    return faunadb_1.query.If(faunadb_1.query.Exists(ref), faunadb_1.query.Get(ref), faunadb_1.query.Abort("Could not read."));
};
exports.Read = Read;
