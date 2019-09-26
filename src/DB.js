const admin = require("firebase-admin");
require("@firebase/firestore");

class Database {
  /**
   *
   * @param {Object} database
   * @param {String} database.databaseURL
   * @param {?} database.serviceAccountFile
   */
  constructor(database) {
    const app = admin.initializeApp({
      credential: admin.credential.cert(database.serviceAccountFile),
      databaseURL: database.databaseURL
    });
    this.db = app.firestore();
  }

  /**
   * @description
   */
  async setup() {}

  async Get(KEY, collection, query) {
    const colRef = this.db.collection(collection);
    const querySnap = await colRef.get();

    // TODO: return only docs that satisfy the query
    const docs = querySnap.docs;
    docs.map(doc => {});

    console.log(docs);
  }

  // TODO: Check if document with this data already exists on database, to avoid replication of data
  async Insert(KEY, collection, data, index) {
    const colRef = this.db.collection(collection);
    const docRef = await colRef.add(data);
    return docRef;
  }

  // async Modify(KEY, collection, query, modification) {
  //   const docRef = this.db.doc(path);
  //   const writeResult = await docRef.update(modification, { merge: true });
  //   return writeResult;
  // }

  // async Delete(collection, query) {
  //   const docRef = this.db.doc(`lti/${document}`);
  //   const writeResult = await docRef.delete();
  //   return writeResult;
  // }

  // async Encrypt(data, secret) {
  //   // TODO
  // }

  // async Decrypt(data, _iv, secret) {
  //   // TODO
  // }

  // async Close() {
  //   // TODO: This is not needed for firestore
  // }
}

module.exports = Database;
