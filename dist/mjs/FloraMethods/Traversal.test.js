import { Flora } from "../Flora";
import { FaunaTestDb } from "fauna-test-setup";
import { $Number, $Object, $String } from "../FloraTypes";
import { Select } from "./Select";
import { Traverse } from "./Traversal";
export const TraversalSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Not doc traverse", async () => {
            const $Player = $Object({
                name: $String,
                number: $Number
            });
            const result = await db.client.query(Flora(Select("name", {
                name: "liam",
                number: 3
            }, $Player)));
            expect(result).toBe("liam");
        });
        test("Deep traverse", async () => {
            const result = await db.client.query(Flora(Traverse({
                name: "Liam",
                amount: 3,
                bestFriend: {
                    name: "Doug"
                }
            }).bestFriend.name));
            expect(result).toBe("Doug");
        });
        test("Deeper traverse still", async () => {
            const result = await db.client.query(Flora(Traverse({
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
        });
        test("Traverse with doc", async () => {
        });
    });
};
TraversalSuiteA();
