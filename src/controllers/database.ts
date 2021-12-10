import {CosmosClient, Resource, User} from "@azure/cosmos";
import IDatabaseObject from "../models/IDatabaseObject";

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

export async function create<Type extends IDatabaseObject>(obj: Type): Promise<Type> {
    await setupDB();
    const createReq = await container.items.create<Type>(obj);
    const dbResponse = createReq.resource;
    return <Type & Resource> dbResponse;
}

export async function read<Type extends IDatabaseObject>(id: string): Promise<Type> {
    await setupDB();
    const readReq = await container.item(id).read<Type>();
    const dbResponse = readReq.resource;
    return <Type & Resource> dbResponse;
}

export async function update<Type extends IDatabaseObject>(obj: Type): Promise<Type> {
    // await setupDB(); Not needed, if doing update db should be in place.
    const replaceReq = await container.item(obj.id).replace<Type>(obj);
    const updatedResponse = replaceReq.resource;
    return <Type & Resource> updatedResponse;
}



