import { ExprArg } from "faunadb/query";
import { values } from "faunadb";
import { FloraExceptionI } from "./Exception";
import { ExceptionStackT } from "./ExceptionStack";
export declare const usedFloraIdentity = "usedFloraIdentity";
export declare const withIdentity = "withIdentity";
export declare const blight = "blight";
/**
 *
 * @returns
 */
export declare const IsIdentityDefined: () => import("faunadb").Expr;
export declare const _DefaultCheckPermission: (floraDocument: FloraDocumentT) => boolean;
export declare const DefaultCheckPermission: (floraDocument: FloraDocumentT) => boolean;
export interface PermissionsI {
    create: ExprArg;
    read: ExprArg;
    write: ExprArg;
}
export declare const DefaultPermissions: PermissionsI;
/**
 *
 * @param name
 * @returns
 */
export declare const FloraCollection: (name?: string) => import("faunadb").Expr;
export declare const stack = "stack";
export declare const stackPath: string[];
export declare type FloraDocumentT = values.Document<{
    [usedFloraIdentity]: boolean;
    [withIdentity]: values.Ref | false;
    [stack]: ExceptionStackT;
}>;
export declare const GetFloraDocumentRef: () => import("faunadb").Expr;
/**
 *
 * @returns
 */
export declare const GetFloraDocument: () => import("faunadb").Expr;
/**
 * Causes a FloraDocument to use itself as an identity.
 * @param floraDocument
 */
export declare const SelfIdentifyFloraDocument: (floraDocument: FloraDocumentT) => import("faunadb").Expr;
/**
 * Assigns an external identity to a floraDocument.
 * @param floraDocument
 * @returns
 */
export declare const ExternalIdentifyFloraDocument: (floraDocument: FloraDocumentT) => import("faunadb").Expr;
/**
 *
 * @param name
 */
export declare const FloraDocument: (password: string, collectionName?: string) => import("faunadb").Expr;
/**
 * Gets the current Exception stack.
 * @returns
 */
export declare const GetStack: () => import("faunadb").Expr;
export declare const StackError: (exception: FloraExceptionI) => FloraExceptionI;
/**
 *
 */
export declare const LoginFloraDocument: (FloraDocument: FloraDocumentT, password: string) => import("faunadb").Expr;
export declare const ReadyFloraDocument: (password: string) => import("faunadb").Expr;
/**
 * Runs an expression in a flora environment.
 * @param expr
 * @returns
 */
export declare const Flora: <T>(expr: T) => FloraExceptionI | T;
