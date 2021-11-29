"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = exports.Collection = exports.CreateCollection = void 0;
const faunadb_1 = require("faunadb");
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
    return faunadb_1.query.If(faunadb_1.query.Exists(faunadb_1.query.Collection(faunadb_1.query.Select("name", params))), faunadb_1.query.Collection(faunadb_1.query.Select("name", params)), faunadb_1.query.CreateCollection(params));
};
exports.CreateCollection = CreateCollection;
/**
 * Gets a collection
 * @param name is the name of the collection.
 * @param $Predicate
 * @returns
 */
const Collection = (name, $Predicate = FloraTypes_1.$Any) => {
    return (0, Fx_1.Fx)([[name, FloraTypes_1.$String]], (0, FloraTypes_1.$Collection)(), (name) => faunadb_1.query.If(faunadb_1.query.Exists(faunadb_1.query.Collection(name)), faunadb_1.query.Collection(name), (0, Raise_1.Raise)((0, Exception_1.FloraException)({
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
    return (0, Fx_1.Fx)([[Collection, (0, FloraTypes_1.$Collection)()], [obj, $Predicate]], (0, FloraTypes_1.$Document)($Predicate), (Collection, obj) => faunadb_1.query.Create(Collection, {
        data: obj
    }));
};
exports.Document = Document;
