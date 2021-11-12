import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
    it("should say Hello World!", (done) => {
        request(app).get("/")
            .expect(200)
            .expect(response => {
                expect(response.body).toContain("Hello world!");
            })
            .end(done);
    });
});