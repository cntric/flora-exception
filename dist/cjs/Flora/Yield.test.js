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
exports.YieldSuiteA = void 0;
const fauna_test_setup_1 = require("fauna-test-setup");
const Flora_1 = require("./Flora");
const Exception_1 = require("./Exception");
const Yield_1 = require("./Yield");
const faunadb_1 = require("faunadb");
const { Add } = faunadb_1.query;
const YieldSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Simple yield", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db.client.query((0, Flora_1.Flora)((0, Yield_1.Yield)({
                args: [2, 2],
                expr: (a, b) => {
                    return Add(2, 2);
                }
            })));
            expect(result).toBe(4);
        }));
        test("Yield within yield", () => __awaiter(void 0, void 0, void 0, function* () {
            const InterestingFunc = (a) => {
                return (0, Yield_1.Yield)({
                    args: [a],
                    expr: (a) => {
                        return Add(a, 2);
                    }
                });
            };
            const result = yield db.client.query((0, Flora_1.Flora)(InterestingFunc(InterestingFunc(2))));
            expect(result).toBe(6);
        }));
        test("Handles Exception in yield", () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const InterestingFunc = (a) => {
                return (0, Yield_1.Yield)({
                    args: [a],
                    expr: (a) => {
                        return Add(a, 2);
                    }
                });
            };
            const result = yield db.client.query((0, Flora_1.Flora)(InterestingFunc((0, Exception_1.FloraException)())));
            expect((0, Exception_1.isFloraException)(result)).toBe(true);
            expect((_a = result.at) === null || _a === void 0 ? void 0 : _a.length).toBe(1);
            expect(result.location).toBe(InterestingFunc.name);
        }));
        test("Handles Exception in yield in yield", () => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            const InterestingFunc = (a) => {
                return (0, Yield_1.Yield)({
                    args: [a],
                    expr: (a) => {
                        return Add(a, 2);
                    }
                });
            };
            const result = yield db.client.query((0, Flora_1.Flora)(InterestingFunc(InterestingFunc((0, Exception_1.FloraException)()))));
            expect((0, Exception_1.isFloraException)(result)).toBe(true);
            expect((_b = result.at) === null || _b === void 0 ? void 0 : _b.length).toBe(1);
            expect(result.location).toBe(InterestingFunc.name);
        }));
    });
};
exports.YieldSuiteA = YieldSuiteA;
(0, exports.YieldSuiteA)();
