"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefOf = void 0;
const faunadb_1 = require("faunadb");
/**
 * Gets the ref from a document.
 */
const RefOf = (doc) => {
    return faunadb_1.query.Select("ref", doc);
};
exports.RefOf = RefOf;
