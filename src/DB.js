const firebase = require("@firebase/app").default;
require("@firebase/firestore");

class Database {
  constructor(database) {
    const app = firebase.initializeApp(database);
    this.firestore = app.firestore();
  }

  async setup() {}

  async Get(path) {
    const doc = await this.firestore.doc(path).get();
    console.log(doc.id);
  }

  async Insert() {}

  async Modify() {}

  async Delete() {}

  async Encrypt() {}

  async Decrypt() {}

  async Close() {}
}

module.exports = Database;
