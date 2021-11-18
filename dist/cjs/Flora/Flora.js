"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flora = exports.ReadyFloraDocument = exports.LoginFloraDocument = exports.StackError = exports.GetStack = exports.FloraDocument = exports.ExternalIdentifyFloraDocument = exports.SelfIdentifyFloraDocument = exports.GetFloraDocument = exports.GetFloraDocumentRef = exports.stackPath = exports.stack = exports.FloraCollection = exports.DefaultPermissions = exports.DefaultCheckPermission = exports._DefaultCheckPermission = exports.IsIdentityDefined = exports.blight = exports.withIdentity = exports.usedFloraIdentity = void 0;
const faunadb_1 = require("faunadb");
const Exception_1 = require("./Exception");
const Key_1 = require("./Key");
const { Let, If, IsObject, ToObject, Select, Contains, Equals, Append, Merge, Var, Collection, Database, Delete, Ref, CreateCollection, Login, Or, Count } = faunadb_1.query;
const templateDoc = "templateDoc";
const identifyStep = "identify";
const floraDoc = "floraDoc";
exports.usedFloraIdentity = "usedFloraIdentity";
exports.withIdentity = "withIdentity";
exports.blight = "blight";
const { And, CurrentIdentity, Query, Lambda } = faunadb_1.query;
/**
 *
 * @returns
 */
const IsIdentityDefined = () => {
    return (0, faunadb_1.Exists)((0, faunadb_1.Tokens)());
};
exports.IsIdentityDefined = IsIdentityDefined;
const _DefaultCheckPermission = (floraDocument) => {
    return Equals(Select(["data", exports.withIdentity], floraDocument), CurrentIdentity());
};
exports._DefaultCheckPermission = _DefaultCheckPermission;
const DefaultCheckPermission = (floraDocument) => {
    return If(And((0, faunadb_1.ContainsPath)(["data", exports.withIdentity], floraDocument), (0, exports.IsIdentityDefined)()), If((0, faunadb_1.Not)(Equals(false, Select(["data", exports.withIdentity], floraDocument))), (0, exports._DefaultCheckPermission)(floraDocument), true), false);
};
exports.DefaultCheckPermission = DefaultCheckPermission;
exports.DefaultPermissions = {
    create: true,
    read: Query(Lambda(floraDoc, (0, exports.DefaultCheckPermission)(Var(floraDoc)))),
    write: Query(Lambda(floraDoc, (0, exports.DefaultCheckPermission)(Var(floraDoc))))
};
/**
 *
 * @param name
 * @returns
 */
const FloraCollection = (name = Key_1.floraCollectionKey) => {
    return If((0, faunadb_1.Exists)(Collection(name)), Collection(name), CreateCollection({
        name: name,
        //  permissions : DefaultPermissions
    }));
};
exports.FloraCollection = FloraCollection;
exports.stack = "stack";
exports.stackPath = ["data", exports.stack];
const GetFloraDocumentRef = () => {
    return Select("ref", Var(Key_1.floraDocumentKey));
};
exports.GetFloraDocumentRef = GetFloraDocumentRef;
/**
 *
 * @returns
 */
const GetFloraDocument = () => {
    return (0, faunadb_1.Get)((0, exports.GetFloraDocumentRef)());
};
exports.GetFloraDocument = GetFloraDocument;
/**
 * Causes a FloraDocument to use itself as an identity.
 * @param floraDocument
 */
const SelfIdentifyFloraDocument = (floraDocument) => {
    return (0, faunadb_1.Update)(Select("ref", floraDocument), {
        data: {
            [exports.withIdentity]: Select("ref", floraDocument),
            [exports.usedFloraIdentity]: true,
            [exports.stack]: []
        }
    });
};
exports.SelfIdentifyFloraDocument = SelfIdentifyFloraDocument;
/**
 * Assigns an external identity to a floraDocument.
 * @param floraDocument
 * @returns
 */
const ExternalIdentifyFloraDocument = (floraDocument) => {
    return (0, faunadb_1.Update)(Select("ref", floraDocument), {
        data: {
            [exports.withIdentity]: CurrentIdentity(),
            [exports.usedFloraIdentity]: true,
            [exports.stack]: []
        }
    });
};
exports.ExternalIdentifyFloraDocument = ExternalIdentifyFloraDocument;
/**
 *
 * @param name
 */
const FloraDocument = (password, collectionName = Key_1.floraCollectionKey) => {
    return Let({
        [templateDoc]: (0, faunadb_1.Create)((0, exports.FloraCollection)(collectionName), {
            data: {
                [exports.usedFloraIdentity]: false,
                [exports.withIdentity]: false
            },
            credentials: {
                password: password
            }
        }),
        [identifyStep]: If((0, exports.IsIdentityDefined)(), (0, exports.ExternalIdentifyFloraDocument)(Var(templateDoc)), (0, exports.SelfIdentifyFloraDocument)(Var(templateDoc))),
        [floraDoc]: (0, faunadb_1.Get)(Select("ref", Var(templateDoc)))
    }, Var(identifyStep));
};
exports.FloraDocument = FloraDocument;
/**
 * Gets the current Exception stack.
 * @returns
 */
const GetStack = () => {
    return Select(exports.stackPath, (0, exports.GetFloraDocument)());
};
exports.GetStack = GetStack;
const StackError = (exception) => {
    return If((0, faunadb_1.GT)(Count((0, exports.GetStack)()), 0), Merge(Select(0, (0, exports.GetStack)()), ToObject([
        ["stack", (0, exports.GetStack)()]
    ])), exception);
};
exports.StackError = StackError;
/**
 *
 */
const LoginFloraDocument = (FloraDocument, password) => {
    return (0, faunadb_1.Do)(If(Equals(true, Select(["data", exports.usedFloraIdentity], FloraDocument)), Login(Select("ref", FloraDocument), password), false), (0, faunadb_1.Get)(Select("ref", FloraDocument)));
};
exports.LoginFloraDocument = LoginFloraDocument;
const login = "login";
const ReadyFloraDocument = (password) => {
    return Let({
        [floraDoc]: (0, exports.FloraDocument)(password),
        // [login] : LoginFloraDocument(Var(floraDoc) as FloraDocumentT, password)
    }, (0, faunadb_1.Get)(Select("ref", Var(floraDoc))));
};
exports.ReadyFloraDocument = ReadyFloraDocument;
const fruit = "fruit";
/**
 * Runs an expression in a flora environment.
 * @param expr
 * @returns
 */
const Flora = (expr) => {
    const password = (0, Key_1.generateFloraKey)("password");
    return Let({
        [Key_1.floraDocumentKey]: (0, exports.ReadyFloraDocument)(password),
        [fruit]: expr,
    }, If(Or((0, Exception_1.IsException)(Var(fruit)), (0, faunadb_1.GT)(Count((0, exports.GetStack)()), 0)), (0, exports.StackError)(Var(fruit)), Var(fruit)));
};
exports.Flora = Flora;
