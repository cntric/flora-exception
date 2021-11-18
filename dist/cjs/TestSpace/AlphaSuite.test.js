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
exports.ExceptionSuiteA = void 0;
const faunadb_1 = require("faunadb");
const fauna_test_setup_1 = require("fauna-test-setup");
const Flora_1 = require("../Flora");
const FloraTypes_1 = require("../FloraTypes");
const { Add, IsString, Create, Get, Select, ContainsPath, IsArray } = faunadb_1.query;
const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Composed Add", () => __awaiter(void 0, void 0, void 0, function* () {
            const ComposedAdd = (a, b) => {
                return (0, Flora_1.Fx)([[a, FloraTypes_1.$Number], [b, FloraTypes_1.$Number]], FloraTypes_1.$Number, (a, b) => {
                    return Add(a, b);
                });
            };
            const result = yield db.client.query((0, Flora_1.Flora)(ComposedAdd(2, 2)));
            expect(result).toBe(4);
        }));
    });
};
exports.ExceptionSuiteA = ExceptionSuiteA;
(0, exports.ExceptionSuiteA)();
