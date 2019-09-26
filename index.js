const db = require("./src/DB.js");

const serviceAccountFile = require("./env/serviceAccount.json");
const firestore = new db({
  url: "https://ltijs-firestore.firebaseio.com",
  serviceAccountFile: serviceAccountFile
});

const doc = firestore.Get("", "test-collection/test-document");
doc.then(data => {
  console.log(data);
});

firestore.Insert("", "test-collection/test-document-2", {
  iae: "oi"
});

firestore.Modify("", "test-collection/test-document-3", "", {
  iae: "ronaldo"
});

module.exports = db;
