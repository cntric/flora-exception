"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$Index = void 0;
const faunadb_1 = require("faunadb");
const $Index = (obj) => {
    return faunadb_1.query.IsIndex(obj);
};
exports.$Index = $Index;
