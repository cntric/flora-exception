"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flora = exports.ReadyFloraDocument = exports.LoginFloraDocument = exports.StackError = exports.GetStack = exports.FloraDocument = exports.ExternalIdentifyFloraDocument = exports.SelfIdentifyFloraDocument = exports.GetFloraDocument = exports.GetFloraDocumentRef = exports.stackPath = exports.stack = exports.FloraCollection = exports.DefaultPermissions = exports.DefaultCheckPermission = exports._DefaultCheckPermission = exports.IsIdentityDefined = exports.blight = exports.withIdentity = exports.usedFloraIdentity = void 0;
const query_1 = require("faunadb/query");
const Exception_1 = require("./Exception");
const Key_1 = require("./Key");
const templateDoc = "templateDoc";
const identifyStep = "identify";
const floraDoc = "floraDoc";
exports.usedFloraIdentity = "usedFloraIdentity";
exports.withIdentity = "withIdentity";
exports.blight = "blight";
/**
 *
 * @returns
 */
const IsIdentityDefined = () => {
    return (0, query_1.Exists)((0, query_1.Tokens)());
};
exports.IsIdentityDefined = IsIdentityDefined;
const _DefaultCheckPermission = (floraDocument) => {
    return (0, query_1.Equals)((0, query_1.Select)(["data", exports.withIdentity], floraDocument), (0, query_1.CurrentIdentity)());
};
exports._DefaultCheckPermission = _DefaultCheckPermission;
const DefaultCheckPermission = (floraDocument) => {
    return (0, query_1.If)((0, query_1.And)((0, query_1.ContainsPath)(["data", exports.withIdentity], floraDocument), (0, exports.IsIdentityDefined)()), (0, query_1.If)((0, query_1.Not)((0, query_1.Equals)(false, (0, query_1.Select)(["data", exports.withIdentity], floraDocument))), (0, exports._DefaultCheckPermission)(floraDocument), true), false);
};
exports.DefaultCheckPermission = DefaultCheckPermission;
exports.DefaultPermissions = {
    create: true,
    read: (0, query_1.Query)((0, query_1.Lambda)(floraDoc, (0, exports.DefaultCheckPermission)((0, query_1.Var)(floraDoc)))),
    write: (0, query_1.Query)((0, query_1.Lambda)(floraDoc, (0, exports.DefaultCheckPermission)((0, query_1.Var)(floraDoc))))
};
/**
 *
 * @param name
 * @returns
 */
const FloraCollection = (name = Key_1.floraCollectionKey) => {
    return (0, query_1.Collection)(name);
};
exports.FloraCollection = FloraCollection;
exports.stack = "stack";
exports.stackPath = ["data", exports.stack];
const GetFloraDocumentRef = () => {
    return (0, query_1.Select)("ref", (0, query_1.Var)(Key_1.floraDocumentKey));
};
exports.GetFloraDocumentRef = GetFloraDocumentRef;
/**
 *
 * @returns
 */
const GetFloraDocument = () => {
    return (0, query_1.Get)((0, exports.GetFloraDocumentRef)());
};
exports.GetFloraDocument = GetFloraDocument;
/**
 * Causes a FloraDocument to use itself as an identity.
 * @param floraDocument
 */
const SelfIdentifyFloraDocument = (floraDocument) => {
    return (0, query_1.Update)((0, query_1.Select)("ref", floraDocument), {
        data: {
            [exports.withIdentity]: (0, query_1.Select)("ref", floraDocument),
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
    return (0, query_1.Update)((0, query_1.Select)("ref", floraDocument), {
        data: {
            [exports.withIdentity]: (0, query_1.CurrentIdentity)(),
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
    return (0, query_1.Let)({
        [templateDoc]: (0, query_1.Create)((0, exports.FloraCollection)(collectionName), {
            data: {
                [exports.usedFloraIdentity]: false,
                [exports.withIdentity]: false
            },
            credentials: {
                password: password
            }
        }),
        [identifyStep]: (0, query_1.If)((0, exports.IsIdentityDefined)(), (0, exports.ExternalIdentifyFloraDocument)((0, query_1.Var)(templateDoc)), (0, exports.SelfIdentifyFloraDocument)((0, query_1.Var)(templateDoc))),
        [floraDoc]: (0, query_1.Get)((0, query_1.Select)("ref", (0, query_1.Var)(templateDoc)))
    }, (0, query_1.Var)(identifyStep));
};
exports.FloraDocument = FloraDocument;
/**
 * Gets the current Exception stack.
 * @returns
 */
const GetStack = () => {
    return (0, query_1.Select)(exports.stackPath, (0, exports.GetFloraDocument)());
};
exports.GetStack = GetStack;
const StackError = (exception) => {
    return (0, query_1.If)((0, query_1.GT)((0, query_1.Count)((0, exports.GetStack)()), 0), (0, query_1.Merge)((0, query_1.Select)(0, (0, exports.GetStack)()), (0, query_1.ToObject)([
        ["stack", (0, exports.GetStack)()]
    ])), exception);
};
exports.StackError = StackError;
/**
 *
 */
const LoginFloraDocument = (FloraDocument, password) => {
    return (0, query_1.Do)((0, query_1.If)((0, query_1.Equals)(true, (0, query_1.Select)(["data", exports.usedFloraIdentity], FloraDocument)), (0, query_1.Login)((0, query_1.Select)("ref", FloraDocument), password), false), (0, query_1.Get)((0, query_1.Select)("ref", FloraDocument)));
};
exports.LoginFloraDocument = LoginFloraDocument;
const login = "login";
const ReadyFloraDocument = (password) => {
    return (0, query_1.Let)({
        [floraDoc]: (0, exports.FloraDocument)(password),
        // [login] : LoginFloraDocument(Var(floraDoc) as FloraDocumentT, password)
    }, (0, query_1.Get)((0, query_1.Select)("ref", (0, query_1.Var)(floraDoc))));
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
    return (0, query_1.Let)({
        [Key_1.floraDocumentKey]: (0, exports.ReadyFloraDocument)(password),
        [fruit]: expr,
    }, (0, query_1.If)((0, query_1.Or)((0, Exception_1.IsException)((0, query_1.Var)(fruit)), (0, query_1.GT)((0, query_1.Count)((0, exports.GetStack)()), 0)), (0, exports.StackError)((0, query_1.Var)(fruit)), (0, query_1.Var)(fruit)));
};
exports.Flora = Flora;
