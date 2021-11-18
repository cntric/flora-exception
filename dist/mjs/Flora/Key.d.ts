export declare const machineId: string;
export declare const sessionId: string;
/**
 * Generates keys that will be used to instantiate variables in the Flora Environment.
 * This enables to use access an blight state throughout the Flora environment with a low risk
 * of collisions.
 * @param type an abitrary type name.
 * @returns
 */
export declare const generateFloraKey: (type: string) => string;
export declare const floraCollectionKey = "Flora-Exception-Collection";
export declare const floraDocumentKey: string;
