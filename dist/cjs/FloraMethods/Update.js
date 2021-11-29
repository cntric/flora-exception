"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocument = void 0;
const faunadb_1 = require("faunadb");
const FloraTypes_1 = require("../FloraTypes");
const Fx_1 = require("../Flora/Fx");
const Exception_1 = require("../Flora/Exception");
const ref = "ref";
/**
 * Updates a documented object.
 * @param Collection
 * @param obj
 * @param $Predicate
 * @returns
 */
const UpdateDocument = (ref, data, $Predicate = FloraTypes_1.$Any) => {
    return (0, Fx_1.Fx)([[ref, (0, FloraTypes_1.$Ref)()], [data, $Predicate]], (0, FloraTypes_1.$Document)($Predicate), (ref, data) => faunadb_1.query.If(faunadb_1.query.Exists(ref), faunadb_1.query.Update(ref, {
        data: data
    }), (0, Exception_1.FloraException)({
        name: "NoDocMatchingRef",
        msg: faunadb_1.query.Concat([
            `No document found for ref.`
        ])
    })));
};
exports.UpdateDocument = UpdateDocument;
