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
const Object_1 = require("./Object");
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
        test("Boolean map", () => __awaiter(void 0, void 0, void 0, function* () {
            const $BoolMap = (0, Map_1.$Map)(Primitives_1.$String, Primitives_1.$Boolean);
            const result = yield db.client.query($BoolMap({
                create: false,
                "delete": false,
                read: false,
                write: false,
                history_read: false,
                history_write: false,
                unrestricted_read: false,
                call: false
            }));
            expect(result).toBe(true);
        }));
        test("Object map", () => __awaiter(void 0, void 0, void 0, function* () {
            ;
            const $RoleInfo = (0, Object_1.$Object)({
                "create": Primitives_1.$Boolean,
                "delete": Primitives_1.$Boolean,
                "read": Primitives_1.$Boolean,
                "write": Primitives_1.$Boolean,
                "history_read": Primitives_1.$Boolean,
                "history_write": Primitives_1.$Boolean,
                "unrestricted_read": Primitives_1.$Boolean,
                "call": Primitives_1.$Boolean
            });
            ;
            const $RolesInfo = (0, Map_1.$Map)(Primitives_1.$String, $RoleInfo);
            const result = yield db.client.query($RolesInfo({
                a: {
                    create: false,
                    "delete": false,
                    read: false,
                    write: false,
                    history_read: false,
                    history_write: false,
                    unrestricted_read: false,
                    call: false
                },
                b: {
                    create: false,
                    "delete": false,
                    read: false,
                    write: false,
                    history_read: false,
                    history_write: false,
                    unrestricted_read: false,
                    call: false
                },
                c: {
                    create: false,
                    "delete": false,
                    read: false,
                    write: false,
                    history_read: false,
                    history_write: false,
                    unrestricted_read: false,
                    call: false
                }
            }));
        }));
    });
};
exports.MapSuiteA = MapSuiteA;
(0, exports.MapSuiteA)();
