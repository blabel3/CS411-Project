import * as databaseController from "../src/controllers/database";

describe("Database Operations", () => {
  it("should create a working db if needed", () => {
    return databaseController.setupDB();
  });
});
