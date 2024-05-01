const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const endPoints = require("../endpoints.json");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("GET/api/topics", () => {
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
});

describe("GET/api/endPoints", () => {
  it("Responds with a descriptive list of valids endPoints ", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(endPoints);
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
});

describe("GET api/articles/:article_id", () => {
  it("GET 200: Responds with the correct article_id", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.title).toBe("Sony Vaio; or, The Laptop");
        expect(article.topic).toBe("mitch");
        expect(article.author).toBe("icellusedkars");
        expect(article.body).toBe(
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me."
        );
        expect(article.created_at).toBe("2020-10-16T05:03:00.000Z");
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
});

describe("GET api/articles", () => {
  it("GET 200: Responds with an articles array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(13);
        body.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
        });
      });
  });

  it("Responds with articles sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.map((article) => article.created_at)).toBeSorted({
          descending: true,
        });
      })
  });

  it("Responds with articles sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.map((article) => article.created_at)).toBeSorted({
          descending: true,
        });
      });
  });

  // it("responds with articles filtered by topic when a topic is provided", () => {
  //   const topic = "mitch";
  //   return request(app)
  //   .get(`/api/articles?topic=${topic}`)
  //   .expect(200)
  //   .then(({ body }) => {
  //   expect(body.every(article => article.topic === topic)).toBe(true);
  //   })
  // });

  // it("responds with an error when an invalid topic is provided", () => {
  //   const topic = "invalid_topic";
  //   return request(app)
  //   .get(`/api/articles?topic=${topic}`)
  //   .expect(404)
  //   .then(({ body }) => {
  //     const { msg } = body;
  //     expect(msg).toBe("404: Not Found");
  //   });
  // });

  // it("responds with articles filtered by topic when a topic is provided", async () => {
  //   const topic = "mitch"; // Sample topic
  //   const response = await request(app).get(`/api/articles?topic=${topic}`);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.every(article => article.topic === topic)).toBe(true);
  // });

  // it("responds with an error when an invalid topic is provided", async () => {
  //   const topic = "invalid_topic"; // Invalid topic
  //   const response = await request(app).get(`/api/articles?topic=${topic}`);
  //   expect(response.statusCode).toBe(404); // Assuming 404 is the appropriate error code
  //   expect(response.body).toHaveProperty("msg");
  // });

  it("GET 404: Responds with an error when article_id is valid but non-existent", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: article not found");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  it("Should respond with an object with an array of comments for the given article_id on the key of comments", () => {
    return request(app)
      .get("/api/articles/3/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments.length).toBe(2);
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
        });
      });
  });

  it("Should respond with an object with an array with 0 comments", () => {
    return request(app)
      .get("/api/articles/7/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments.length).toBe(0);
      });
  });

  it("Should return comments ordered by the creation date in descending order", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });

  it("Responds with a 404 if article_id it doesn't exists", () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("404: Id Not Found");
      });
  });

  it("Responds with a 400 if id is not a number", () => {
    return request(app)
      .get("/api/articles/any/comments")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: Invalid input");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  it("Responds with a posted comment", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Best article",
    };
    return request(app)
      .post("/api/articles/3/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const { comment } = body;
        expect(typeof comment).toBe("object");
        expect(comment.article_id).toBe(3);
        expect(comment.body).toBe("Best article");
      });
  });

  it("Responds with a 404 if article_id it doesn't exists", () => {
    const newComment = {
      username: "butter_bridge",
      body: "Best article",
    };
    return request(app)
      .post("/api/articles/999/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("404: Not Found");
      });
  });

  it("Responds with a 400 comment object has a missing properties", () => {
    const newComment = {
      username: "butter_bridge",
    };
    return request(app)
      .post("/api/articles/3/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: invalid request");
      });
  });

  it("Responds with a 404 if article_id it doesn't exists", () => {
    const newComment = {
      username: "bobby_fisher",
      body: "Best article",
    };
    return request(app)
      .post("/api/articles/3/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("404: Not Found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  it("should update an article by article_id", () => {
    const reqBody = { inc_votes: 10 };
    return request(app)
      .patch("/api/articles/1")
      .send(reqBody)
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article.votes).toBe(110);
      });
  });

  it("Responds with a 400 for an article object that has an invalid article_id", () => {
    const reqBody = { inc_votes: 100 };
    return request(app)
      .patch("/api/articles/invalid")
      .send(reqBody)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: invalid request");
      });
  });

  it("Responds with a 400 if inc_votes is not a number", () => {
    const reqBody = { inc_votes: "Hello" };
    return request(app)
      .patch("/api/articles/1")
      .send(reqBody)
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: invalid request - inc_votes must be a number");
      });
  });

  it("Responds with a 404 if article it is not found", () => {
    const reqBody = { inc_votes: 50 };
    return request(app)
      .patch("/api/articles/999")
      .send(reqBody)
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("404: Not Found");
      });
  });
});
describe("DELETE /api/comments/:comment_id", () => {
  it("should delete a comment by comment_id", () => {
    return request(app)
    .delete("/api/comments/1")
    .expect(204);
  });

  it("Responds with a 400 if comment_id is not valid", () => {
    return request(app)
      .delete("/api/comments/invalid")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("400: invalid request");
      });
  });

  it("Responds with a 404 if comment it is not found", () => {
    return request(app)
      .delete("/api/comments/999")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("404: Not Found");
      });
  });
});

describe("GET /api/users", () => {
  it("Respond with the correct keys", () => {
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(4);
      body.forEach((user) => {
        expect(typeof user.username).toBe("string");
        expect(typeof user.name).toBe("string");
        expect(typeof user.avatar_url).toBe("string");
      });
    });
  });

  it("GET 404: Responds with an error when user is valid but non-existent", () => {
    return request(app)
      .get("/api/users/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("404: Not Found");
      });
  });
});



