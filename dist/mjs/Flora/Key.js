import { generate } from "shortid";
import { machineIdSync } from "node-machine-id";
export const machineId = machineIdSync();
export const sessionId = generate();
/**
 * Generates keys that will be used to instantiate variables in the Flora Environment.
 * This enables to use access an blight state throughout the Flora environment with a low risk
 * of collisions.
 * @param type an abitrary type name.
 * @returns
 */
export const generateFloraKey = (type) => {
    return `machine-${machineId}-session-${sessionId}-${generate()}-${generate()}-floraKey-${type}-${generate()}-${generate()}`;
};
export const floraCollectionKey = "Flora-Exception-Collection";
export const floraDocumentKey = generateFloraKey("floraDocument");
