"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reraise = exports.Raise = exports._Raise = exports.AddExceptionToStack = void 0;
const Flora_1 = require("./Flora");
const query_1 = require("faunadb/query");
/**
 *
 */
const AddExceptionToStack = (Exception) => {
    return (0, query_1.Do)((0, query_1.Update)((0, Flora_1.GetFloraDocumentRef)(), {
        data: {
            stack: (0, query_1.Append)([Exception], (0, Flora_1.GetStack)())
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
    return (0, query_1.Do)((0, exports.AddExceptionToStack)(floraException), floraException);
};
exports._Raise = _Raise;
const raise = "raise";
const Raise = (floraException) => {
    return (0, query_1.Let)({
        [raise]: (0, exports._Raise)(floraException)
    }, (0, query_1.Var)(raise));
};
exports.Raise = Raise;
/**
 * Reraises an Exception if one is encountered.
 * @param prevException
 * @param newException
 * @returns
 */
const Reraise = (prevExceptions, newException) => {
    return (0, query_1.Let)({
        [raise]: (0, query_1.Merge)(newException, (0, query_1.ToObject)([
            ["at", prevExceptions]
        ]))
    }, (0, query_1.Do)((0, exports.AddExceptionToStack)((0, query_1.Var)(raise)), (0, query_1.Var)(raise)));
};
exports.Reraise = Reraise;
