"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reraise = exports.Raise = exports._Raise = exports.AddExceptionToStack = void 0;
const Flora_1 = require("./Flora");
const faunadb_1 = require("faunadb");
const { Let, Merge, ToObject, Do, Update, Append, Select, Var } = faunadb_1.query;
/**
 *
 */
const AddExceptionToStack = (Exception) => {
    return Do(Update((0, Flora_1.GetFloraDocumentRef)(), {
        data: {
            stack: Append([Exception], (0, Flora_1.GetStack)())
        }
    }), (0, Flora_1.GetStack)());
};
exports.AddExceptionToStack = AddExceptionToStack;
/**
 * Raises a Flora Exception then returns it.
 * @param floraException
 * @returns
 */
const _Raise = (floraException) => {
    return Do((0, exports.AddExceptionToStack)(floraException), floraException);
};
exports._Raise = _Raise;
const raise = "raise";
const Raise = (floraException) => {
    return Let({
        [raise]: (0, exports._Raise)(floraException)
    }, Var(raise));
};
exports.Raise = Raise;
/**
 * Reraises an Exception if one is encountered.
 * @param prevException
 * @param newException
 * @returns
 */
const Reraise = (prevExceptions, newException) => {
    return Let({
        [raise]: Merge(newException, ToObject([
            ["at", prevExceptions]
        ]))
    }, Do((0, exports.AddExceptionToStack)(Var(raise)), Var(raise)));
};
exports.Reraise = Reraise;
