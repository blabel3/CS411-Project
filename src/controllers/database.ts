import {CosmosClient, User} from "@azure/cosmos";
import IUser from "../models/IUser";

const cosmosConfig = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: process.env.COSMOS_DATABASE,
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
};

const { endpoint, key, databaseId, containerId } = cosmosConfig;

const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

/**
 * This script ensures that the database is setup and populated correctly
 */
export async function setupDB() {
    const partitionKey = cosmosConfig.partitionKey;
  
    /**
     * Create the database if it does not exist
     */
    const { database } = await client.databases.createIfNotExists({
      id: databaseId
    });
  
    /**
     * Create the container if it does not exist
     */
    const { container } = await client
      .database(databaseId)
      .containers.createIfNotExists(
        { id: containerId, partitionKey },
      );
}

export async function insertUserIfNotPresent(user: IUser): Promise<IUser> {
    await setupDB();
    const readReq = await container.item(user.id).read<IUser>();
    const dbResponse = readReq.resource;
    if (dbResponse){ // ID already in database!
        console.log("User found in DB");
        return <IUser> dbResponse;
    }

    console.log("New user, not currently in DB");
    const createReq = await container.items.create<IUser>(user);
    return <IUser> createReq.resource;
}

export async function findById<Type>(id: string): Promise<Type> {
    await setupDB();
    const readReq = await container.item(id).read<Type>();
    const dbResponse = readReq.resource;
    return <Type> dbResponse;
}



