"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floraDocumentKey = exports.floraCollectionKey = exports.generateFloraKey = exports.sessionId = exports.machineId = void 0;
const shortid_1 = require("shortid");
const node_machine_id_1 = require("node-machine-id");
exports.machineId = (0, node_machine_id_1.machineIdSync)();
exports.sessionId = (0, shortid_1.generate)();
/**
 * Generates keys that will be used to instantiate variables in the Flora Environment.
 * This enables to use access an blight state throughout the Flora environment with a low risk
 * of collisions.
 * @param type an abitrary type name.
 * @returns
 */
const generateFloraKey = (type) => {
    return `machine-${exports.machineId}-session-${exports.sessionId}-${(0, shortid_1.generate)()}-${(0, shortid_1.generate)()}-floraKey-${type}-${(0, shortid_1.generate)()}-${(0, shortid_1.generate)()}`;
};
exports.generateFloraKey = generateFloraKey;
exports.floraCollectionKey = "Flora-Exception-Collection";
exports.floraDocumentKey = (0, exports.generateFloraKey)("floraDocument");
