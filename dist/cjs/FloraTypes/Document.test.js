"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionSuiteA = exports.documentTestCollectionName = void 0;
const query_1 = require("faunadb/query");
const fauna_test_setup_1 = require("fauna-test-setup");
const Object_1 = require("./Object");
const Primitives_1 = require("./Primitives");
const Document_1 = require("./Document");
const FloraMethods_1 = require("../FloraMethods");
exports.documentTestCollectionName = "Document-Test";
const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
            yield db.client.query((0, FloraMethods_1.CreateCollection)({
                name: exports.documentTestCollectionName
            }));
        }));
        test("Simple $Document", () => __awaiter(void 0, void 0, void 0, function* () {
            const Test$Document = (0, Document_1.$Document)((0, Object_1.$Object)({
                name: Primitives_1.$String,
                amount: (0, Object_1.$Optional)(Primitives_1.$Number)
            }));
            const testCollection = "test";
            const result = yield db.client.query((0, query_1.Let)({
                [testCollection]: (0, query_1.Create)((0, query_1.Collection)(exports.documentTestCollectionName), {
                    data: {
                        name: "Liam",
                        amount: 2
                    }
                })
            }, [(0, query_1.Var)(testCollection), Test$Document((0, query_1.Var)(testCollection))]));
            expect(result[1]).toBe(true);
        }));
        test("Simple $Document fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const Test$Document = (0, Document_1.$Document)((0, Object_1.$Object)({
                name: Primitives_1.$String,
                amount: (0, Object_1.$Optional)(Primitives_1.$Number)
            }));
            const testCollection = "test";
            const result = yield db.client.query((0, query_1.Let)({
                [testCollection]: (0, query_1.Create)((0, query_1.Collection)(exports.documentTestCollectionName), {
                    data: {
                        name: "Liam",
                        amount: "cat"
                    }
                })
            }, [(0, query_1.Var)(testCollection), Test$Document((0, query_1.Var)(testCollection))]));
            expect(result[1]).toBe(false);
        }));
    });
};
exports.ExceptionSuiteA = ExceptionSuiteA;
(0, exports.ExceptionSuiteA)();
