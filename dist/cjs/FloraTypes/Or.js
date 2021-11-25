"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Or = void 0;
const query_1 = require("faunadb/query");
const $Or = (...args) => (obj) => {
    const predicates = args.map((arg) => {
        return arg(obj);
    });
    return (0, query_1.Or)(...predicates);
};
exports.$Or = $Or;
