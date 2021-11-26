import { FaunaTestDb } from "fauna-test-setup";
import { $Object } from "./Object";
import { $String, $Number, $Boolean } from "./Primitives";
import { $Map } from "./Map";
export const MapSuiteA = () => {
    describe("Flora exceptions basic functionality", () => {
        let db;
        beforeAll(async () => {
            db = await FaunaTestDb();
        });
        test("Simple $Map", async () => {
            const $SMap = $Map($String, $Number);
            const result = await db.client.query($SMap({
                liam: 3,
                rory: 4,
                mom: 5
            }));
            expect(result).toBe(true);
        });
        test("Simple $Map fails", async () => {
            const $SMap = $Map($String, $Number);
            const result = await db.client.query($SMap({
                liam: 3,
                rory: 4,
                mom: "hello"
            }));
            expect(result).toBe(false); // you a dude, but y'ain't a cowboy.
        });
        test("Boolean map", async () => {
            const $BoolMap = $Map($String, $Boolean);
            const result = await db.client.query($BoolMap({
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
        });
        test("Object map", async () => {
            ;
            const $RoleInfo = $Object({
                "create": $Boolean,
                "delete": $Boolean,
                "read": $Boolean,
                "write": $Boolean,
                "history_read": $Boolean,
                "history_write": $Boolean,
                "unrestricted_read": $Boolean,
                "call": $Boolean
            });
            ;
            const $RolesInfo = $Map($String, $RoleInfo);
            const result = await db.client.query($RolesInfo({
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
        });
    });
};
MapSuiteA();
