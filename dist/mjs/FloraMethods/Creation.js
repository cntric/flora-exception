import * as q from "faunadb/query";
import { $Any, $Collection, $Document, $String } from "../FloraTypes";
import { Fx } from "../Flora/Fx";
import { Raise } from "../Flora/Raise";
import { FloraException } from "../Flora/Exception";
/**
 * Creates a collection.
 * @param params
 * @param $Predicate optional purely for type inferance.
 * @returns
 */
export const CreateCollection = (params, $Predicate = $Any) => {
    return q.If(q.Exists(q.Collection(q.Select("name", params))), q.Collection(q.Select("name", params)), q.CreateCollection(params));
};
/**
 * Gets a collection
 * @param name is the name of the collection.
 * @param $Predicate
 * @returns
 */
export const Collection = (name, $Predicate = $Any) => {
    return Fx([[name, $String]], $Collection(), (name) => q.If(q.Exists(q.Collection(name)), q.Collection(name), Raise(FloraException({
        name: "CollectionDoesNotExist",
        msg: `The collection ${name} does not exist.`
    }))));
};
/**
 * Documents an object. (Creates a Document.)
 * @param Collection
 * @param obj
 * @param $Predicate
 * @returns
 */
export const Document = (Collection, obj, $Predicate = $Any) => {
    return Fx([[Collection, $Collection()], [obj, $Predicate]], $Document($Predicate), (Collection, obj) => q.Create(Collection, {
        data: obj
    }));
};
