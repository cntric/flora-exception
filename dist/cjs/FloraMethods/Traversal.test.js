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
exports.TraversalSuiteA = void 0;
const Flora_1 = require("../Flora");
const fauna_test_setup_1 = require("fauna-test-setup");
const FloraTypes_1 = require("../FloraTypes");
const Select_1 = require("./Select");
const Traversal_1 = require("./Traversal");
const TraversalSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Not doc traverse", () => __awaiter(void 0, void 0, void 0, function* () {
            const $Player = (0, FloraTypes_1.$Object)({
                name: FloraTypes_1.$String,
                number: FloraTypes_1.$Number
            });
            const result = yield db.client.query((0, Flora_1.Flora)((0, Select_1.Select)("name", {
                name: "liam",
                number: 3
            }, $Player)));
            expect(result).toBe("liam");
        }));
        test("Deep traverse", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db.client.query((0, Flora_1.Flora)((0, Traversal_1.Traverse)({
                name: "Liam",
                amount: 3,
                bestFriend: {
                    name: "Doug"
                }
            }).bestFriend.name));
            expect(result).toBe("Doug");
        }));
        test("Deeper traverse still", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield db.client.query((0, Flora_1.Flora)((0, Traversal_1.Traverse)({
                name: "Liam",
                amount: 3,
                bestFriend: {
                    name: "Doug",
                    bestFriend: {
                        name: "Friend",
                        bestFriend: {
                            name: "Super Friend"
                        }
                    }
                }
            }).bestFriend.bestFriend.bestFriend.name));
            expect(result).toBe("Super Friend");
        }));
        test("Traverse with doc", () => __awaiter(void 0, void 0, void 0, function* () {
        }));
    });
};
exports.TraversalSuiteA = TraversalSuiteA;
(0, exports.TraversalSuiteA)();
