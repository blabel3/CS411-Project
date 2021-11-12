import request from "supertest";
import app from "../src/app";

describe("GET /photo/", () => {
    it("should respond with a random photo", (done) => {
        request(app).get("/photo")
            .expect(200)
            .expect(response => {
                expect(response.text).toContain("img");
                expect(response.text).toContain("https://images.unsplash.com");
            })
            .end(done);
    });
    it("should handle query parameters", (done) => {
        request(app).get("/photo?search=prototype")
            .expect(200)
            .expect(response => {
                expect(response.text).toContain("img");
                expect(response.text).toContain("https://images.unsplash.com");
            })
            .end(done);
    });
});