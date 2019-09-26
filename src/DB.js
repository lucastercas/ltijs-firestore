const admin = require("firebase-admin");

class Database {
  /**
   *
   * @param {Object} database
   * @param {String} database.url
   * @param {?} database.serviceAccountFile
   */
  constructor(database) {
    const app = admin.initializeApp({
      credential: admin.credential.cert(database.serviceAccountFile),
      databaseURL: database.url
    });
    this.db = app.firestore();
  }

  /**
   * @description
   */
  async setup() {}

  /**
   * @description Get the document specified in "path"
   * @param {String} KEY - TODO
   * @param {String} path - Path of the document("${collection}/${document}")
   * @param {Object} query - TODO:
   */
  async Get(KEY, path, query) {
    const docRef = this.db.doc(path);
    const docSnap = await docRef.get();
    const docData = docSnap.data();

    if (docData === undefined) throw new Error(`Document ${path} not defined`);

    return docData;
  }

  /**
   * @description Inserts document referenced by path into database
   * @param {String} KEY - TODO
   * @param {String} path - Path of the document ("${collection}/${document}")
   * @param {Object} data - Object of the data
   * @param {*} index - TODO:
   */
  async Insert(KEY, path, data, index) {
    const docRef = this.db.doc(path);
    const writeResult = await docRef.create(data);
    return writeResult;
  }

  /**
   * @description Modify the document specified in "path"
   * @param {String} KEY - TODO
   * @param {String} path - Path of the document("${collection}/${document}")
   * @param {Object} query - TODO
   * @param {Object} modification - The new object
   */
  async Modify(KEY, path, query, modification) {
    const docRef = this.db.doc(path);
    const writeResult = await docRef.update(modification, { merge: true });
    return writeResult;
  }

  /**
   * @description
   * @param {String} path - Path of the document("${collection}/${document}")
   * @param {Object} query - TODO
   */
  async Delete(path, query) {
    const docRef = this.db.doc(path);
    const writeResult = await docRef.delete();
    return writeResult;
  }

  /**
   * @description
   * @param {String} data
   * @param {String} secret
   */
  async Encrypt(data, secret) {
    // TODO
  }

  /**
   * @description
   * @param {String} data
   * @param {String} _iv
   * @param {String} secret
   */
  async Decrypt(data, _iv, secret) {
    // TODO
  }

  async Close() {
    // TODO: This is not needed for firestore
  }
}

module.exports = Database;
