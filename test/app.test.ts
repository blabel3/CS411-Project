import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
    it("should say Hello World!", (done) => {
        request(app).get("/")
            .expect("Hello World!")
            .expect(200)
            .end(done);
    });
});