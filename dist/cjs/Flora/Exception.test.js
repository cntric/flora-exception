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
const Flora_1 = require("./Flora");
const Exception_1 = require("./Exception");
const Fx_1 = require("./Fx");
const { IsArray, Var, IsNumber, Do, And } = faunadb_1.query;
const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Is Exception", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db.client.query((0, Exception_1.IsException)((0, Exception_1.FloraException)()));
            expect(result).toBe(true);
        }));
        test("Contains Exception", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db.client.query((0, Flora_1.Flora)((0, Exception_1.ContainsException)([1, 2, (0, Exception_1.FloraException)()])));
            expect(result).toBe(true);
        }));
        test("Gets Exceptions", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db.client.query((0, Flora_1.Flora)((0, Exception_1.GetExceptions)([1, 2, (0, Exception_1.FloraException)(), 1, 2, (0, Exception_1.FloraException)(), 3])));
            expect(result.length).toBe(2);
        }));
        test("Gets complex Exceptions", () => __awaiter(void 0, void 0, void 0, function* () {
            const args = [
                [[2, 2, 2, 2], IsArray],
                // ["dsfhks", IsArray as ()=>boolean]
            ];
            const result = yield db.client.query((0, Flora_1.Flora)((0, Fx_1.extractArgs)(args, "here")));
            const secondResult = yield db.client.query((0, Flora_1.Flora)((0, Exception_1.ContainsException)((0, Fx_1.extractArgs)(args, "here"))));
        }));
    });
};
exports.ExceptionSuiteA = ExceptionSuiteA;
(0, exports.ExceptionSuiteA)();
