const db = require("./src/DB.js");

console.log("iae");
console.log(db);

const firestore = new db({
  apiKey: "",
  projectId: "ltijs-firestore"
});

firestore.Get("test-collection/test-document");
