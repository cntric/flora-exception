"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocument = void 0;
const q = __importStar(require("faunadb/query"));
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
    return (0, Fx_1.Fx)([[ref, (0, FloraTypes_1.$Ref)()], [data, $Predicate]], (0, FloraTypes_1.$Document)($Predicate), (ref, data) => q.If(q.Exists(ref), q.Update(ref, {
        data: data
    }), (0, Exception_1.FloraException)({
        name: "NoDocMatchingRef",
        msg: q.Concat([
            `No document found for ref.`
        ])
    })));
};
exports.UpdateDocument = UpdateDocument;
