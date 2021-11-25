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
exports.MapSuiteA = void 0;
const fauna_test_setup_1 = require("fauna-test-setup");
const Primitives_1 = require("./Primitives");
const Map_1 = require("./Map");
const MapSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Simple $Map", () => __awaiter(void 0, void 0, void 0, function* () {
            const $SMap = (0, Map_1.$Map)(Primitives_1.$String, Primitives_1.$Number);
            const result = yield db.client.query($SMap({
                liam: 3,
                rory: 4,
                mom: 5
            }));
            expect(result).toBe(true);
        }));
        test("Simple $Map fails", () => __awaiter(void 0, void 0, void 0, function* () {
            const $SMap = (0, Map_1.$Map)(Primitives_1.$String, Primitives_1.$Number);
            const result = yield db.client.query($SMap({
                liam: 3,
                rory: 4,
                mom: "hello"
            }));
            expect(result).toBe(false); // you a dude, but y'ain't a cowboy.
        }));
    });
};
exports.MapSuiteA = MapSuiteA;
(0, exports.MapSuiteA)();
