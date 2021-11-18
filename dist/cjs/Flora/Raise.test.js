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
exports.RaiseSuiteA = void 0;
const faunadb_1 = require("faunadb");
const fauna_test_setup_1 = require("fauna-test-setup");
const Flora_1 = require("./Flora");
const Raise_1 = require("./Raise");
const Exception_1 = require("./Exception");
const { Add, IsString, Create, Get, Select, ContainsPath } = faunadb_1.query;
const RaiseSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Reraises", () => __awaiter(void 0, void 0, void 0, function* () {
            const testException = (0, Exception_1.FloraException)({
                name: "Hello",
                msg: "fail"
            });
            const result = yield db.client.query((0, Flora_1.Flora)((0, Raise_1.Reraise)([(0, Raise_1.Raise)(testException)], (0, Exception_1.FloraException)())));
            expect(result.stack ? result.stack[1].at : undefined).toStrictEqual([testException]);
        }));
        test("Deep reraises", () => __awaiter(void 0, void 0, void 0, function* () {
            const testException = (0, Exception_1.FloraException)({
                name: "Hello",
                msg: "fail"
            });
            const result = yield db.client.query((0, Flora_1.Flora)((0, Raise_1.Reraise)([(0, Raise_1.Reraise)([(0, Raise_1.Raise)(testException),], (0, Exception_1.FloraException)())], (0, Exception_1.FloraException)())));
            expect(result.stack ? result.stack[1].at : undefined).toStrictEqual([testException]);
        }));
    });
};
exports.RaiseSuiteA = RaiseSuiteA;
(0, exports.RaiseSuiteA)();
