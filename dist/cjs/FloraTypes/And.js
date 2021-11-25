"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Extends = exports.$And = void 0;
const query_1 = require("faunadb/query");
const $And = (...args) => (obj) => {
    const predicates = args.map((arg) => {
        return arg(obj);
    });
    return (0, query_1.And)(...predicates);
};
exports.$And = $And;
exports.$Extends = exports.$And;
