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
const Or_1 = require("./Or");
const Primitives_1 = require("./Primitives");
const { Add, IsString, Create, Get, Select, ContainsPath, IsArray } = faunadb_1.query;
const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Simple $Or", () => __awaiter(void 0, void 0, void 0, function* () {
            const $StringOrNumber = (0, Or_1.$Or)(Primitives_1.$Number, Primitives_1.$String);
            const result = yield db.client.query($StringOrNumber("hello"));
            expect(result).toBe(true);
        }));
    });
};
exports.ExceptionSuiteA = ExceptionSuiteA;
(0, exports.ExceptionSuiteA)();
