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
exports.FxSuiteA = void 0;
const faunadb_1 = require("faunadb");
const fauna_test_setup_1 = require("fauna-test-setup");
const Flora_1 = require("./Flora");
const Exception_1 = require("./Exception");
const Yield_1 = require("./Yield");
const Fx_1 = require("./Fx");
const FloraTypes_1 = require("../FloraTypes");
const { Add, IsString, Create, Get, Select, ContainsPath } = faunadb_1.query;
const FxSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Simple Fx", () => __awaiter(void 0, void 0, void 0, function* () {
            const CoolFunc = (a, b) => {
                return (0, Fx_1.Fx)([
                    [a, faunadb_1.IsNumber],
                    [b, faunadb_1.IsNumber]
                ], FloraTypes_1.$Number, (a, b) => {
                    return Add(a, b);
                });
            };
            const result = yield db.client.query((0, Flora_1.Flora)(CoolFunc(2, 2)));
            expect(result).toBe(4);
        }));
        test("Array Fx", () => __awaiter(void 0, void 0, void 0, function* () {
            const CoolFunc = (a) => {
                return (0, Fx_1.Fx)([
                    [a, faunadb_1.IsArray],
                ], FloraTypes_1.$Number, (a) => {
                    return (0, faunadb_1.Sum)(a);
                });
            };
            const result = yield db.client.query((0, Flora_1.Flora)(CoolFunc([2, 2, 2, 2])));
            expect(result).toBe(8);
        }));
        test("Mixed Fx", () => __awaiter(void 0, void 0, void 0, function* () {
            const CoolFunc = (a, b) => {
                return (0, Fx_1.Fx)([
                    [a, faunadb_1.IsArray],
                    [b, IsString]
                ], FloraTypes_1.$String, (a, b) => {
                    return (0, faunadb_1.Concat)([(0, faunadb_1.ToString)((0, faunadb_1.Sum)(a)), b], "");
                });
            };
            const result = yield db.client.query((0, Flora_1.Flora)(CoolFunc([2, 2, 2, 2], " is Liam's score.")));
            expect(result).toBe("8 is Liam's score.");
        }));
        test("Can get extracted Exceptions", () => __awaiter(void 0, void 0, void 0, function* () {
            const args = [
                [2, faunadb_1.IsNumber],
                ["3", IsString],
                [[4, 5, 6], IsString]
            ];
            const result = yield db.client.query((0, Flora_1.Flora)((0, Fx_1.extractArgs)(args, "Here")));
            const secondResult = yield db.client.query((0, Flora_1.Flora)((0, Yield_1.Yield)({
                args: (0, Fx_1.extractArgs)(args, "Here"),
                expr: (a, b, c) => {
                    return [a, b, c];
                }
            })));
        }));
        test("Exception", () => __awaiter(void 0, void 0, void 0, function* () {
            const ExceptionFunc = (a) => {
                return (0, Fx_1.Fx)([
                    [a, IsString],
                ], FloraTypes_1.$String, (a) => {
                    return (0, faunadb_1.Concat)([a, " great time."], "");
                });
            };
            const result = yield db.client.query((0, Flora_1.Flora)(ExceptionFunc([2, 2, 2, 2])));
            expect(result[Exception_1.isFloraException]).toBe(true);
        }));
        test("Complex Exception", () => __awaiter(void 0, void 0, void 0, function* () {
            const ExceptionFunc = (a, b) => {
                return (0, Fx_1.Fx)([
                    [a, faunadb_1.IsArray],
                    [b, faunadb_1.IsArray]
                ], FloraTypes_1.$String, (a, b) => {
                    return (0, faunadb_1.Concat)([(0, faunadb_1.ToString)((0, faunadb_1.Sum)(a)), b], "");
                });
            };
            const result = yield db.client.query((0, Flora_1.Flora)(ExceptionFunc([2, 2, 2, 2], " a thing")));
        }));
    });
};
exports.FxSuiteA = FxSuiteA;
(0, exports.FxSuiteA)();
