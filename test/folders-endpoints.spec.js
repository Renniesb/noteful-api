const expect = require("chai").expect;
const knex = require("knex");
const { before } = require("mocha");
const supertest = require("supertest");
const app = require("../src/app");
const { makeFoldersArray } = require("./folders.fixtures");
const fixtures = require("./folders/fixtures");

describe("Folders Endpoints", function () {
  let db;
  const token = `beaer ` + process.env.API_TOKEN;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnet from db", () => db.destroy());

  before("clean table", () => db.raw("TRUNCATE folders, notes CASCADE"));
  afterEach("cleanup", () => db.raw("TRUNCATE folders, notes CASCADE"));

  describe(`GET /folders`, () => {
    context("Given no folders", () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/api/folders")
          .set("Authorization", token)
          .expect(200, []);
      });
    });
    context("Given there are folders in the database", () => {
      const testFolders = makeFoldersArray();

      beforeEach("insert folders", () => {
        const testFolders = makeFoldersArray();
        return supertest(app)
          .get("/api/folders")
          .set("Authorization", token)
          .expect(200, testFolders);
      });
    });
  });

  describe(`GET /api/folders/:folders_id`, () => {
    context("Given no folders", () => {
      it(`responds with 404`, () => {
        const folderid = 1;
        return supertest(app)
          .get("/api/folders/:${folderid}")
          .set("Authorization", token)
          .expect(404, {
            error: {
              message: `Folder does not exist.`,
            },
          });
      });
    });
    context("Given there are folder in the database", () => {
      const testFolders = makeFoldersArray();

      beforeEach("insert folders", () => {
        return db.into("folders").insert(testFolders);
      });

      it(`responds with 200 and the specified folder`, () => {
        const folderid = 2;
        const expectedFolder = testFolders[folderid - 1];
        return supertest(app)
          .get("/api/folders/${folderid}")
          .set("Authorization", token)
          .expect(200, expectedFolder);
      });
    });
  });
});
