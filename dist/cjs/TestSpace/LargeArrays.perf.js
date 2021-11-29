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
const perf_hooks_1 = require("perf_hooks");
const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Composed sum", () => __awaiter(void 0, void 0, void 0, function* () {
            const ComposedSum = (a) => {
                return (0, Flora_1.Fx)([[a, (0, FloraTypes_1.$Array)(FloraTypes_1.$Number)]], FloraTypes_1.$Number, (a) => {
                    return (0, faunadb_1.Sum)(a);
                });
            };
            const longArray = Array(100000).fill(0).map(() => {
                return Math.floor(Math.random() * 1000);
            });
            const m0 = perf_hooks_1.performance.now();
            const result = yield db.client.query((0, Flora_1.Flora)(ComposedSum(longArray)));
            const m1 = perf_hooks_1.performance.now();
            const b0 = perf_hooks_1.performance.now();
            const secondResult = yield db.client.query((0, Flora_1.Flora)((0, faunadb_1.Sum)(longArray)));
            const b1 = perf_hooks_1.performance.now();
            const c0 = perf_hooks_1.performance.now();
            const thirdResult = longArray.reduce((agg, val) => {
                return agg + val;
            }, 0);
            const c1 = perf_hooks_1.performance.now();
            expect(result).toBe(thirdResult);
        }), 200000);
    });
};
exports.ExceptionSuiteA = ExceptionSuiteA;
(0, exports.ExceptionSuiteA)();
