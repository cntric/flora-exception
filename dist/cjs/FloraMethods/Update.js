"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocument = void 0;
const faunadb_1 = require("faunadb");
const FloraTypes_1 = require("../FloraTypes");
const ref = "ref";
/**
 * Updates a documented object.
 * @param Collection
 * @param obj
 * @param $Predicate
 * @returns
 */
const UpdateDocument = (ref, data, $Predicate = FloraTypes_1.$Any) => {
    return faunadb_1.query.If(faunadb_1.query.Exists(ref), faunadb_1.query.Update(ref, {
        data: data
    }), (0, faunadb_1.Abort)("No matching ref."));
};
exports.UpdateDocument = UpdateDocument;
