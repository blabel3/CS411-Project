import request from "supertest";
import app from "../src/app";

describe("GET /prototype", () => {
    it("should respond with a 200 success code", (done) => {
        request(app).get("/prototype")
            .expect(200)
            .end(done);
    });
    it("should have a input field and a submit button", (done) => {
        request(app).get("/prototype")
            .expect(response => {
                if (!('input' in response.body)) throw new Error("No input field")
                if (!('submit' in response.body)) throw new Error("No submit button")
            })
    });
});
