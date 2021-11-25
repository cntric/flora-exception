import { ContainsPath, Create, Do, Exists, Get, GT, Not, Tokens, Update, Let, If, ToObject, Select, Equals, Merge, Var, Collection, Login, Or, Count, And, CurrentIdentity, Query, Lambda, } from "faunadb/query";
import { IsException } from "./Exception";
import { floraDocumentKey, floraCollectionKey, generateFloraKey } from "./Key";
const templateDoc = "templateDoc";
const identifyStep = "identify";
const floraDoc = "floraDoc";
export const usedFloraIdentity = "usedFloraIdentity";
export const withIdentity = "withIdentity";
export const blight = "blight";
/**
 *
 * @returns
 */
export const IsIdentityDefined = () => {
    return Exists(Tokens());
};
export const _DefaultCheckPermission = (floraDocument) => {
    return Equals(Select(["data", withIdentity], floraDocument), CurrentIdentity());
};
export const DefaultCheckPermission = (floraDocument) => {
    return If(And(ContainsPath(["data", withIdentity], floraDocument), IsIdentityDefined()), If(Not(Equals(false, Select(["data", withIdentity], floraDocument))), _DefaultCheckPermission(floraDocument), true), false);
};
export const DefaultPermissions = {
    create: true,
    read: Query(Lambda(floraDoc, DefaultCheckPermission(Var(floraDoc)))),
    write: Query(Lambda(floraDoc, DefaultCheckPermission(Var(floraDoc))))
};
/**
 *
 * @param name
 * @returns
 */
export const FloraCollection = (name = floraCollectionKey) => {
    return Collection(name);
};
export const stack = "stack";
export const stackPath = ["data", stack];
export const GetFloraDocumentRef = () => {
    return Select("ref", Var(floraDocumentKey));
};
/**
 *
 * @returns
 */
export const GetFloraDocument = () => {
    return Get(GetFloraDocumentRef());
};
/**
 * Causes a FloraDocument to use itself as an identity.
 * @param floraDocument
 */
export const SelfIdentifyFloraDocument = (floraDocument) => {
    return Update(Select("ref", floraDocument), {
        data: {
            [withIdentity]: Select("ref", floraDocument),
            [usedFloraIdentity]: true,
            [stack]: []
        }
    });
};
/**
 * Assigns an external identity to a floraDocument.
 * @param floraDocument
 * @returns
 */
export const ExternalIdentifyFloraDocument = (floraDocument) => {
    return Update(Select("ref", floraDocument), {
        data: {
            [withIdentity]: CurrentIdentity(),
            [usedFloraIdentity]: true,
            [stack]: []
        }
    });
};
/**
 *
 * @param name
 */
export const FloraDocument = (password, collectionName = floraCollectionKey) => {
    return Let({
        [templateDoc]: Create(FloraCollection(collectionName), {
            data: {
                [usedFloraIdentity]: false,
                [withIdentity]: false
            },
            credentials: {
                password: password
            }
        }),
        [identifyStep]: If(IsIdentityDefined(), ExternalIdentifyFloraDocument(Var(templateDoc)), SelfIdentifyFloraDocument(Var(templateDoc))),
        [floraDoc]: Get(Select("ref", Var(templateDoc)))
    }, Var(identifyStep));
};
/**
 * Gets the current Exception stack.
 * @returns
 */
export const GetStack = () => {
    return Select(stackPath, GetFloraDocument());
};
export const StackError = (exception) => {
    return If(GT(Count(GetStack()), 0), Merge(Select(0, GetStack()), ToObject([
        ["stack", GetStack()]
    ])), exception);
};
/**
 *
 */
export const LoginFloraDocument = (FloraDocument, password) => {
    return Do(If(Equals(true, Select(["data", usedFloraIdentity], FloraDocument)), Login(Select("ref", FloraDocument), password), false), Get(Select("ref", FloraDocument)));
};
const login = "login";
export const ReadyFloraDocument = (password) => {
    return Let({
        [floraDoc]: FloraDocument(password),
        // [login] : LoginFloraDocument(Var(floraDoc) as FloraDocumentT, password)
    }, Get(Select("ref", Var(floraDoc))));
};
const fruit = "fruit";
/**
 * Runs an expression in a flora environment.
 * @param expr
 * @returns
 */
export const Flora = (expr) => {
    const password = generateFloraKey("password");
    return Let({
        [floraDocumentKey]: ReadyFloraDocument(password),
        [fruit]: expr,
    }, If(Or(IsException(Var(fruit)), GT(Count(GetStack()), 0)), StackError(Var(fruit)), Var(fruit)));
};
