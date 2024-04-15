const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("GET/api/topics", () => {
    it("Response has to be 200", () => {
      return request(app).get("/api/topics").expect(200);
    });
})

it("Responds with the correct keys", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(3);
        body.forEach((topics) => {
          expect(typeof topics.description).toBe("string");
          expect(typeof topics.slug).toBe("string");
        });
      });
  });

  it("Responds with a 404 to invalid endpoint", () => {
    return request(app)
      .get("/api/notARoute")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("404: Not Found");
      });
  });