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
const fauna_test_setup_1 = require("fauna-test-setup");
const Array_1 = require("./Array");
const Primitives_1 = require("./Primitives");
const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Simple $Array", () => __awaiter(void 0, void 0, void 0, function* () {
            const $Numbers = (0, Array_1.$Array)(Primitives_1.$Number);
            const result = yield db.client.query($Numbers([1, 2, 4]));
            expect(result).toBe(true);
        }));
        test("Simple $Array fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const $Numbers = (0, Array_1.$Array)(Primitives_1.$String);
            const result = yield db.client.query($Numbers([1, 2, 4]));
            expect(result).toBe(false);
        }));
        test("Mixed $Array fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const $Numbers = (0, Array_1.$Array)(Primitives_1.$Number);
            const result = yield db.client.query($Numbers([1, "dog", 4]));
            expect(result).toBe(false);
        }));
    });
};
exports.ExceptionSuiteA = ExceptionSuiteA;
(0, exports.ExceptionSuiteA)();
