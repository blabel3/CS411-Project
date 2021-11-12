import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
    it("should say Hello World!", (done) => {
        request(app).get("/")
            .expect(200)
            .expect(response => {
                if (!('Hello world!' in response.body)) throw new Error("No message")
            })
            .end(done);
    });
});