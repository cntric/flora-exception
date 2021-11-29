"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefOf = void 0;
const Fx_1 = require("../Flora/Fx");
const FloraTypes_1 = require("../FloraTypes");
const faunadb_1 = require("faunadb");
/**
 * Gets the ref from a document.
 */
exports.RefOf = (0, Fx_1.mFx)([(0, FloraTypes_1.$Document)(FloraTypes_1.$Any)], (0, FloraTypes_1.$Ref)(), (doc) => faunadb_1.query.Select("ref", doc));
