const chai = require("chai");
const expect = chai.expect;
require("@firebase/firestore");

const LTI = require("ltijs").Provider;

const FirestoreDB = require("../index");

describe("Testing Firestore Database", () => {
  let db;
  let lti;

  it("Database constructor should not throw error given correct parameters", () => {
    const fn = () => {
      db = new FirestoreDB({
        serviceAccountFile: require("./env/serviceAccount.json"),
        databaseURL: "https://ltijs-firestore.firebaseio.com"
      });
      lti = new LTI("KEY", { plugin: db }, { appUrl: "/", loginUrl: "/login" });
      return db;
    };
    expect(fn).to.not.throw(Error);
  });

  it("Should insert correct document into specified collection", async () => {
    const docRef = await db.Insert(false, "idtoken", {
      iss: "issuer_1",
      user: "user_1"
    });
    expect(docRef).to.not.be.null;
  });
  it("Should not insert document into specified collection if duplicated", async () => {
    const docRef = await db.Insert(false, "idtoken", {
      iss: "issuer_1",
      user: "user_1"
    });
    expect(docRef).to.be.null;
  });

  it("Get document with query should return correct document", async () => {
    const queryResult = await db.Get(false, "idtoken", {
      iss: "issuer_1",
      user: "user_1"
    });
    queryResult.forEach(doc => {
      const data = doc.data();
      expect(data).to.have.property("iss");
      expect(data).to.have.property("user");
    });
  });

  it("Should modify document specified in query ", async () => {});

  it("Should delete document in specified collection", async () => {
    db.Delete("idtoken", {
      iss: "issuer_1",
      user: "user_1"
    });
  });
});
