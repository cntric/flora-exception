"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Or = void 0;
const faunadb_1 = require("faunadb");
const { If, Select, Var, Lambda, And, ContainsPath, IsObject, Reduce, Or } = faunadb_1.query;
const $Or = (...args) => (obj) => {
    const predicates = args.map((arg) => {
        return arg(obj);
    });
    return Or(...predicates);
};
exports.$Or = $Or;
