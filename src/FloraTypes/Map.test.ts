import { FaunaTestDb, FaunaTestDbI, teardown } from "fauna-test-setup";
import { $Object } from "./Object";
import { $And, $Extends} from "./And";
import {$Array} from "./Array";
import {$String, $Number, $Boolean} from "./Primitives"
import {$Map} from "./Map";

export const MapSuiteA = ()=>{


    describe("Flora exceptions basic functionality", ()=>{

        let db : FaunaTestDbI;

        beforeAll(async()=>{
            db = await FaunaTestDb();
        })

        test("Simple $Map", async()=>{

            const $SMap = $Map($String, $Number);

            const result = await db.client.query(
                $SMap({
                    liam : 3,
                    rory : 4,
                    mom : 5
                })
            );

           expect(result).toBe(true);

        })

       test("Simple $Map fails", async()=>{

            const $SMap = $Map($String, $Number);

            const result = await db.client.query(
                $SMap({
                    liam : 3,
                    rory : 4,
                    mom : "hello"
                })
            );


            expect(result).toBe(false); // you a dude, but y'ain't a cowboy.

        })

        test("Boolean map", async()=>{
            const $BoolMap = $Map($String, $Boolean);
            const result = await db.client.query(
                $BoolMap({
                    create : false,
                    "delete" : false,
                    read : false,
                    write : false,
                    history_read : false,
                    history_write : false,
                    unrestricted_read: false,
                    call : false
                })
            )
            expect(result).toBe(true);
        })

        test("Object map", async()=>{


            interface RoleInfoI {
                "create": boolean,
                "delete": boolean,
                "read": boolean,
                "write": boolean,
                "history_read": boolean,
                "history_write": boolean,
                "unrestricted_read": boolean,
                "call": boolean
            };
            const $RoleInfo : (obj : any)=>obj is RoleInfoI = $Object({
                "create": $Boolean,
                "delete": $Boolean,
                "read": $Boolean,
                "write": $Boolean,
                "history_read": $Boolean,
                "history_write": $Boolean,
                "unrestricted_read": $Boolean,
                "call": $Boolean
            });
            
            interface RolesInfoI {
                [key : string] : RoleInfoI
            };
            const $RolesInfo : (obj : any)=>obj is RolesInfoI = $Map($String, $RoleInfo);

            const result = await db.client.query(
                $RolesInfo({
                    a : {
                        create : false,
                        "delete" : false,
                        read : false,
                        write : false,
                        history_read : false,
                        history_write : false,
                        unrestricted_read: false,
                        call : false
                    },
                    b : {
                        create : false,
                        "delete" : false,
                        read : false,
                        write : false,
                        history_read : false,
                        history_write : false,
                        unrestricted_read: false,
                        call : false
                    }, 
                    c : {
                        create : false,
                        "delete" : false,
                        read : false,
                        write : false,
                        history_read : false,
                        history_write : false,
                        unrestricted_read: false,
                        call : false
                    }
                })
            )

        })

    })


}; MapSuiteA();