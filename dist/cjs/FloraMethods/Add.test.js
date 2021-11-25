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
exports.AddSuiteA = void 0;
const FaunaMethods_1 = require("./FaunaMethods");
const Flora_1 = require("../Flora");
const fauna_test_setup_1 = require("fauna-test-setup");
const AddSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Simple add", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db.client.query((0, Flora_1.Flora)((0, FaunaMethods_1.Add)(2, 3)));
            expect(result).toBe(5);
        }));
        test("Multi add", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db.client.query((0, Flora_1.Flora)((0, FaunaMethods_1.Add)(2, 3, 4, 3, 2)));
            expect(result).toBe(14);
        }));
        test("Fails no num...", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db.client.query((0, Flora_1.Flora)((0, FaunaMethods_1.Add)(2, "2js3c4", 4, "234234", 2)));
            expect((0, Flora_1.isFloraException)(result)).toBe(true);
        }));
    });
};
exports.AddSuiteA = AddSuiteA;
(0, exports.AddSuiteA)();
