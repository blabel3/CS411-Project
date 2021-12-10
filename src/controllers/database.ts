const cosmosConfig = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: process.env.COSMOS_DATABASE,
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
};

import {CosmosClient} from "@azure/cosmos";

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



