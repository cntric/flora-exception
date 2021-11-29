"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$CollectionObject = exports.$Collection = void 0;
const faunadb_1 = require("faunadb");
const Any_1 = require("./Any");
const Object_1 = require("./Object");
const Primitives_1 = require("./Primitives");
/**
 * Collection type.
 * @param $Predicate as of 0.0.7 the predicate is only for the purpose of type suggestions in TypeScript.
 * @returns
 */
const $Collection = ($Predicate = Any_1.$Any) => {
    const name = `${$Predicate.name}Collection`;
    const map = {
        [name]: (obj) => {
            return faunadb_1.query.IsCollection(obj);
        }
    };
    return map[name];
};
exports.$Collection = $Collection;
exports.$CollectionObject = (0, Object_1.$Object)({
    id: Primitives_1.$String
});
