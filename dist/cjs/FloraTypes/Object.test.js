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
const Object_1 = require("./Object");
const Primitives_1 = require("./Primitives");
const ExceptionSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Simple $Object", () => __awaiter(void 0, void 0, void 0, function* () {
            const Test$Object = (0, Object_1.$Object)({
                name: Primitives_1.$String,
                amount: Primitives_1.$Number
            });
            const result = yield db.client.query(Test$Object({
                name: "Liam",
                amount: 9
            }));
            expect(result).toBe(true);
        }));
        test("Simple $Object fail", () => __awaiter(void 0, void 0, void 0, function* () {
            const Test$Object = (0, Object_1.$Object)({
                name: Primitives_1.$String,
                amount: Primitives_1.$Number
            });
            const result = yield db.client.query(Test$Object({
                name: "Liam",
                amount: "Not number"
            }));
            expect(result).toBe(false);
        }));
        test("Nested $Object", () => __awaiter(void 0, void 0, void 0, function* () {
            const Test$Object = (0, Object_1.$Object)({
                name: Primitives_1.$String,
                amount: Primitives_1.$Number
            });
            const Wrapper$Object = (0, Object_1.$Object)({
                type: Primitives_1.$String,
                obj: Test$Object
            });
            const result = yield db.client.query(Wrapper$Object({
                type: "any",
                obj: {
                    name: "Liam",
                    amount: 9
                }
            }));
            expect(result).toBe(true);
        }));
        test("Nested $Object fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const Test$Object = (0, Object_1.$Object)({
                name: Primitives_1.$String,
                amount: Primitives_1.$Number
            });
            const Wrapper$Object = (0, Object_1.$Object)({
                type: Primitives_1.$String,
                obj: Test$Object
            });
            const result = yield db.client.query(Wrapper$Object({
                type: "any",
                obj: {
                    name: "Liam",
                    amount: "Not number"
                }
            }));
            expect(result).toBe(false);
        }));
        test("$Optional", () => __awaiter(void 0, void 0, void 0, function* () {
            const Test$Object = (0, Object_1.$Object)({
                name: (0, Object_1.$Optional)(Primitives_1.$String),
                amount: Primitives_1.$Number
            });
            const result = yield db.client.query(Test$Object({
                amount: 9
            }));
            expect(result).toBe(true);
        }));
        test("$Optional fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const Test$Object = (0, Object_1.$Object)({
                name: (0, Object_1.$Optional)(Primitives_1.$String),
                amount: Primitives_1.$Number
            });
            const result = yield db.client.query(Test$Object({
                name: 9,
                amount: 9
            }));
            expect(result).toBe(false);
        }));
    });
};
exports.ExceptionSuiteA = ExceptionSuiteA;
(0, exports.ExceptionSuiteA)();
