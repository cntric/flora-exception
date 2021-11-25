import {FaunaTestDb} from "fauna-test-setup";
import {DeployFloraCollection} from "./src/Deploy"
module.exports = async ()=>{
    console.log("Deploying Flora...")
    const db = await FaunaTestDb();
    await db.client.query(DeployFloraCollection())
}