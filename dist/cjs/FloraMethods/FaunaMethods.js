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
exports.Get = exports.Append = exports.Add = exports.Acos = exports.Abs = void 0;
const q = __importStar(require("faunadb/query"));
const Flora_1 = require("../Flora");
const FloraTypes_1 = require("../FloraTypes");
const Flora_2 = require("../Flora");
/**
 * Gets the number absolute value of a number.
 * @param number is the number.
 * @returns |number|
 */
exports.Abs = (0, Flora_2.mFx)([FloraTypes_1.$Number], FloraTypes_1.$Number, (number) => q.Abs(number));
// Access provider
// Access providers
/**
 * Gets the arc cosine value of a number
 * @param number is the number
 * @retuns
 */
exports.Acos = (0, Flora_2.mFx)([FloraTypes_1.$Number], FloraTypes_1.$Number, (number) => q.Acos(number));
/**
 * Adds numbers.
 * @param numbers
 * @returns
 */
const Add = (...numbers) => {
    return (0, Flora_1.Fx)([[numbers, (0, FloraTypes_1.$Array)(FloraTypes_1.$Number)]], FloraTypes_1.$Number, (...numbers) => q.Add(...numbers));
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
    return (0, Flora_1.Fx)([[elems, (0, FloraTypes_1.$Array)(_$Predicate)], [base, (0, FloraTypes_1.$Array)(_$Predicate)]], (0, FloraTypes_1.$Array)(_$Predicate), (elems, base) => q.Append(elems, base));
};
exports.Append = Append;
/**
 * Type safe get method.
 * @param Ref is the ref to get.
 * @param $Predicate is an optional predicate specifying what kind of object should be returned from the get.
 * @returns
 */
const Get = (Ref, $Predicate = FloraTypes_1.$Any) => {
    return (0, Flora_1.Fx)([[Ref, (0, FloraTypes_1.$Ref)($Predicate)]], $Predicate, (Ref) => q.Get(Ref));
};
exports.Get = Get;
