import request from "supertest";
import app from "../src/app";

describe("GET /photo/", () => {
    it("should respond with a random photo", (done) => {
        request(app).get("/photo")
            .expect(200)
            .expect(response => {
                if (!('img' in response.body)) throw new Error("No image")
                if (!('src=https://images.unsplash.com' in response.body)) throw new Error("Bad image URL")
            })
            .end(done);
    });
    it("should handle query parameters", (done) => {
        request(app).get("/photo?search=prototype")
            .expect(200)
            .expect(response => {
                if (!('img' in response.body)) throw new Error("No image")
                if (!('src=https://images.unsplash.com' in response.body)) throw new Error("Bad image URL")
            })
            .end(done);
    });
});