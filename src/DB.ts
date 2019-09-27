import {
  CollectionReference,
  Query,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentReference
} from "@google-cloud/firestore";
import * as admin from "firebase-admin";
import {
  ContextToken,
  IdToken,
  Platform,
  Key,
  AccessToken,
  Nonce
} from "./interfaces";
require("@firebase/firestore");

interface DatabaseInfo {
  serviceAccountFile: string;
  databaseURL: string;
}

export default class Database {
  db: FirebaseFirestore.Firestore;
  /**
   *
   * @param {Object} database
   * @param {String} database.databaseURL
   * @param {?} database.serviceAccountFile
   */
  constructor(database: DatabaseInfo) {
    const app = admin.initializeApp({
      credential: admin.credential.cert(database.serviceAccountFile),
      databaseURL: database.databaseURL
    });
    this.db = app.firestore();
  }

  async queryCollection(
    colRef: CollectionReference,
    query: any
  ): Promise<QueryDocumentSnapshot[]> {
    const keys = Object.keys(query);
    let newQuery: Query = colRef.where(`${keys[0]}`, "==", `${query[keys[0]]}`);
    // console.log(`${keys[0]}`, "==", `${query[keys[0]]}`);
    for (let i = 1; i < keys.length; i++) {
      // console.log(`${keys[1]}`, "==", `${query[keys[i]]}`);
      newQuery = newQuery.where(`${keys[i]}`, "==", `${query[keys[i]]}`);
    }
    const querySnap = await newQuery.get();
    return querySnap.docs;
  }

  /**
   * @description
   */
  async setup() {}

  // TODO: Check if document with this data already exists on database, to avoid replication of data
  async Insert(
    KEY: string,
    collection: string,
    data: any,
    index: any
  ): Promise<DocumentReference> {
    const colRef = this.db.collection(collection);
    const document: DocumentReference = await colRef.add(data);
    return document;
  }

  async Get(
    KEY: string,
    collection: string,
    query: any
  ): Promise<QueryDocumentSnapshot[]> {
    const colRef = this.db.collection(collection);
    const queryResult: QueryDocumentSnapshot[] = await this.queryCollection(
      colRef,
      query
    );
    return queryResult;
  }

  async Modify(KEY: string, collection: string, query: any, modification: any) {
    const colRef = this.db.collection(collection);
  }

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
