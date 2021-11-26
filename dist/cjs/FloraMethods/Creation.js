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
exports.Document = exports.Collection = exports.CreateCollection = void 0;
const q = __importStar(require("faunadb/query"));
const FloraTypes_1 = require("../FloraTypes");
const Fx_1 = require("../Flora/Fx");
const Raise_1 = require("../Flora/Raise");
const Exception_1 = require("../Flora/Exception");
/**
 * Creates a collection.
 * @param params
 * @param $Predicate optional purely for type inferance.
 * @returns
 */
const CreateCollection = (params, $Predicate = FloraTypes_1.$Any) => {
    return q.If(q.Exists(q.Collection(q.Select("name", params))), q.Collection(q.Select("name", params)), q.CreateCollection(params));
};
exports.CreateCollection = CreateCollection;
/**
 * Gets a collection
 * @param name is the name of the collection.
 * @param $Predicate
 * @returns
 */
const Collection = (name, $Predicate = FloraTypes_1.$Any) => {
    return (0, Fx_1.Fx)([[name, FloraTypes_1.$String]], (0, FloraTypes_1.$Collection)(), (name) => q.If(q.Exists(q.Collection(name)), q.Collection(name), (0, Raise_1.Raise)((0, Exception_1.FloraException)({
        name: "CollectionDoesNotExist",
        msg: `The collection ${name} does not exist.`
    }))));
};
exports.Collection = Collection;
/**
 * Documents an object. (Creates a Document.)
 * @param Collection
 * @param obj
 * @param $Predicate
 * @returns
 */
const Document = (Collection, obj, $Predicate = FloraTypes_1.$Any) => {
    return (0, Fx_1.Fx)([[Collection, (0, FloraTypes_1.$Collection)()], [obj, $Predicate]], (0, FloraTypes_1.$Document)($Predicate), (Collection, obj) => q.Create(Collection, {
        data: obj
    }));
};
exports.Document = Document;
