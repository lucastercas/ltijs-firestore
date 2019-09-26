const chai = require("chai");
const expect = chai.expect;
require("@firebase/firestore");

const LTI = require("ltijs").Provider;

const FirestoreDB = require("../src/DB");

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
    const docRef = await db.Insert(false, "platform", {
      platformName: "Name of the Platform",
      platformUrl: "https://www.google.com"
    });
    expect(docRef).to.not.be.undefined;

    const docSnap = await docRef.get();
    const docData = docSnap.data();
    expect(docData).to.not.be.undefined;
  });

  it("Get document with query should return correct document", async () => {
    const docRef = await db.Get(false, "platform", {
      platformUrl: "https://www.google.com"
    });
    expect(docRef).to.not.be.undefined;
  });
});
