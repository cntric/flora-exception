import { FloraExceptionI } from "./Exception";
/**
 *
 */
export declare const AddExceptionToStack: (Exception: FloraExceptionI) => import("faunadb").Expr;
/**
 * Raises a Flora Exception then returns it.
 * @param floraException
 * @returns
 */
export declare const _Raise: (floraException: FloraExceptionI) => FloraExceptionI;
export declare const Raise: (floraException: FloraExceptionI) => FloraExceptionI;
/**
 * Reraises an Exception if one is encountered.
 * @param prevException
 * @param newException
 * @returns
 */
export declare const Reraise: (prevExceptions: FloraExceptionI[], newException: FloraExceptionI) => FloraExceptionI;
