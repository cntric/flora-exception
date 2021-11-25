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
exports.AndSuiteA = void 0;
const fauna_test_setup_1 = require("fauna-test-setup");
const Object_1 = require("./Object");
const And_1 = require("./And");
const Primitives_1 = require("./Primitives");
const AndSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Simple $And", () => __awaiter(void 0, void 0, void 0, function* () {
            const $Dude = (0, Object_1.$Object)({
                name: Primitives_1.$String
            });
            const $Vacero = (0, Object_1.$Object)({
                nombre: Primitives_1.$String
            });
            const $Cowboy = (0, And_1.$And)($Dude, $Vacero);
            const result = yield db.client.query($Cowboy({
                name: "Liam",
                nombre: "Liam"
            }));
            expect(result).toBe(true);
        }));
        test("Simple $And fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const $Dude = (0, Object_1.$Object)({
                name: Primitives_1.$String
            });
            const $Vacero = (0, Object_1.$Object)({
                nombre: Primitives_1.$String
            });
            const $Cowboy = (0, And_1.$And)($Dude, $Vacero);
            const result = yield db.client.query($Cowboy({
                name: "Liam"
            }));
            expect(result).toBe(false); // you a dude, but y'ain't a cowboy.
        }));
    });
};
exports.AndSuiteA = AndSuiteA;
(0, exports.AndSuiteA)();
