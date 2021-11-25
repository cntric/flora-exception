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
exports.$Map = void 0;
const q = __importStar(require("faunadb/query"));
const Any_1 = require("./Any");
const Tuple_1 = require("./Tuple");
const $Map = ($KeyPred = Any_1.$Any, $ValPred = Any_1.$Any) => (obj) => {
    return q.If(q.IsObject(obj), q.All(q.Map(q.ToArray(obj), q.Lambda("el", (0, Tuple_1.$Tuple)($KeyPred, $ValPred)(q.Var("el"))))), false);
};
exports.$Map = $Map;
