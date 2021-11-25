import { GetFloraDocumentRef, GetStack } from "./Flora";
import { Let, Merge, ToObject, Do, Update, Append, Var } from "faunadb/query";
/**
 *
 */
export const AddExceptionToStack = (Exception) => {
    return Do(Update(GetFloraDocumentRef(), {
        data: {
            stack: Append([Exception], GetStack())
        }
    }), GetStack());
};
/**
 * Raises a Flora Exception then returns it.
 * @param floraException
 * @returns
 */
export const _Raise = (floraException) => {
    return Do(AddExceptionToStack(floraException), floraException);
};
const raise = "raise";
export const Raise = (floraException) => {
    return Let({
        [raise]: _Raise(floraException)
    }, Var(raise));
};
/**
 * Reraises an Exception if one is encountered.
 * @param prevException
 * @param newException
 * @returns
 */
export const Reraise = (prevExceptions, newException) => {
    return Let({
        [raise]: Merge(newException, ToObject([
            ["at", prevExceptions]
        ]))
    }, Do(AddExceptionToStack(Var(raise)), Var(raise)));
};
