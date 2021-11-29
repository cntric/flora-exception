"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployFloraCollection = void 0;
const faunadb_1 = require("faunadb");
const Key_1 = require("../Flora/Key");
const DeployFloraCollection = () => {
    return faunadb_1.query.If(faunadb_1.query.Exists(faunadb_1.query.Collection(Key_1.floraCollectionKey)), faunadb_1.query.Collection(Key_1.floraCollectionKey), faunadb_1.query.CreateCollection({
        name: Key_1.floraCollectionKey
    }));
};
exports.DeployFloraCollection = DeployFloraCollection;
