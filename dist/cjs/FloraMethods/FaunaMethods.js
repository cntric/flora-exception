"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = exports.Append = exports.Add = exports.Acos = exports.Abs = void 0;
const faunadb_1 = require("faunadb");
const Flora_1 = require("../Flora");
const FloraTypes_1 = require("../FloraTypes");
const Flora_2 = require("../Flora");
/**
 * Gets the number absolute value of a number.
 * @param number is the number.
 * @returns |number|
 */
exports.Abs = (0, Flora_2.mFx)([FloraTypes_1.$Number], FloraTypes_1.$Number, (number) => faunadb_1.query.Abs(number));
// Access provider
// Access providers
/**
 * Gets the arc cosine value of a number
 * @param number is the number
 * @retuns
 */
exports.Acos = (0, Flora_2.mFx)([FloraTypes_1.$Number], FloraTypes_1.$Number, (number) => faunadb_1.query.Acos(number));
/**
 * Adds numbers.
 * @param numbers
 * @returns
 */
const Add = (...numbers) => {
    return (0, Flora_1.Fx)([[numbers, (0, FloraTypes_1.$Array)(FloraTypes_1.$Number)]], FloraTypes_1.$Number, (...numbers) => faunadb_1.query.Add(...numbers));
};
exports.Add = Add;
/**
 * Appends elements to an array.
 * @param elems
 * @param base
 * @param Predicate
 * @returns
 */
const Append = (elems, base, $Predicate) => {
    const _$Predicate = $Predicate || FloraTypes_1.$Any;
    return (0, Flora_1.Fx)([[elems, (0, FloraTypes_1.$Array)(_$Predicate)], [base, (0, FloraTypes_1.$Array)(_$Predicate)]], (0, FloraTypes_1.$Array)(_$Predicate), (elems, base) => faunadb_1.query.Append(elems, base));
};
exports.Append = Append;
/**
 * Type safe get method.
 * @param Ref is the ref to get.
 * @param $Predicate is an optional predicate specifying what kind of object should be returned from the get.
 * @returns
 */
const Get = (Ref, $Predicate = FloraTypes_1.$Any) => {
    return (0, Flora_1.Fx)([[Ref, (0, FloraTypes_1.$Ref)($Predicate)]], $Predicate, (Ref) => faunadb_1.query.Get(Ref));
};
exports.Get = Get;
