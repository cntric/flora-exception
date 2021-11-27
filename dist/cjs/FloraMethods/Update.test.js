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
exports.CreationSuiteA = void 0;
const Flora_1 = require("../Flora");
const fauna_test_setup_1 = require("fauna-test-setup");
const Creation_1 = require("./Creation");
const shortid_1 = require("shortid");
const Update_1 = require("./Update");
const Read_1 = require("./Read");
const Delete_1 = require("./Delete");
const CreationSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            db = yield (0, fauna_test_setup_1.FaunaTestDb)();
        }));
        test("Updates", () => __awaiter(void 0, void 0, void 0, function* () {
            const collection = (0, shortid_1.generate)();
            const resultA = yield db.client.query((0, Flora_1.Flora)((0, Creation_1.CreateCollection)({ name: collection })));
            const resultB = yield db.client.query((0, Flora_1.Flora)((0, Creation_1.Document)((0, Creation_1.Collection)(collection), {
                hello: "world"
            })));
            const resultC = yield db.client.query((0, Flora_1.Flora)((0, Update_1.UpdateDocument)(resultB.ref, {
                hello: "world"
            })));
            expect(resultC.data).toStrictEqual(resultB.data);
            const resultD = yield db.client.query((0, Flora_1.Flora)((0, Update_1.UpdateDocument)(resultC.ref, {
                hello: "friend"
            })));
            expect(resultD.data).toStrictEqual({
                hello: "friend"
            });
            const resultE = yield db.client.query((0, Flora_1.Flora)((0, Read_1.Read)(resultD.ref)));
            expect(resultE).toStrictEqual(resultD);
        }));
        test("Deletes", () => __awaiter(void 0, void 0, void 0, function* () {
            const collection = (0, shortid_1.generate)();
            const resultA = yield db.client.query((0, Flora_1.Flora)((0, Creation_1.CreateCollection)({ name: collection })));
            const resultB = yield db.client.query((0, Flora_1.Flora)((0, Creation_1.Document)((0, Creation_1.Collection)(collection), {
                hello: "world"
            })));
            const resultC = yield db.client.query((0, Flora_1.Flora)((0, Update_1.UpdateDocument)(resultB.ref, {
                hello: "world"
            })));
            expect(resultC.data).toStrictEqual(resultB.data);
            const resultD = yield db.client.query((0, Flora_1.Flora)((0, Update_1.UpdateDocument)(resultC.ref, {
                hello: "friend"
            })));
            expect(resultD.data).toStrictEqual({
                hello: "friend"
            });
            const resultE = yield db.client.query((0, Flora_1.Flora)((0, Read_1.Read)(resultD.ref)));
            expect(resultE).toStrictEqual(resultD);
            const resultF = yield db.client.query((0, Flora_1.Flora)((0, Delete_1.Delete)(resultD.ref)));
            expect(resultF.ref).toStrictEqual(resultE.ref);
            const resultG = yield db.client.query((0, Flora_1.Flora)((0, Read_1.Read)(resultF.ref)));
            expect((0, Flora_1.isFloraException)(resultG)).toBe(true);
        }));
    });
};
exports.CreationSuiteA = CreationSuiteA;
(0, exports.CreationSuiteA)();
