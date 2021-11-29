"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Map = void 0;
const faunadb_1 = require("faunadb");
const Any_1 = require("./Any");
const Tuple_1 = require("./Tuple");
const $Map = ($KeyPred = Any_1.$Any, $ValPred = Any_1.$Any) => (obj) => {
    return faunadb_1.query.If(faunadb_1.query.IsObject(obj), faunadb_1.query.All(faunadb_1.query.Map(faunadb_1.query.ToArray(obj), faunadb_1.query.Lambda("el", (0, Tuple_1.$Tuple)($KeyPred, $ValPred)(faunadb_1.query.Var("el"))))), false);
};
exports.$Map = $Map;
