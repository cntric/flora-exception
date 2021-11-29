"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Or = void 0;
const faunadb_1 = require("faunadb");
const $Or = (...args) => (obj) => {
    const predicates = args.map((arg) => {
        return arg(obj);
    });
    return (0, faunadb_1.Or)(...predicates);
};
exports.$Or = $Or;
