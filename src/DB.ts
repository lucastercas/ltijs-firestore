import {
  CollectionReference,
  Query,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentReference,
  WriteResult
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
  primaryKeys: any = {
    idtoken: ["iss", "user"],
    contexttoken: ["path", "user"],
    platform: ["url"],
    publickey: ["kid"],
    privatekey: ["kid"],
    accesstoken: ["platformUrl"],
    nonce: ["nonce"]
  };
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

  async hasDocument(
    colRef: CollectionReference,
    key: string
  ): Promise<boolean> {
    const querySnap: QuerySnapshot = await colRef.get();
    const docs: QueryDocumentSnapshot[] = querySnap.docs;
    const result = docs.some(doc => {
      return doc.id === key;
    });
    return result;
  }

  buildPrimaryKey(collection: string, data: any) {
    let documentKey: string = "";
    const primaryKeys = this.primaryKeys[collection];
    primaryKeys.forEach((key: string) => {
      if (!(key in data)) console.error(`Object dont have key ${key}`);
      documentKey += data[key];
    });
    return documentKey;
  }

  async setup() {}

  /* 
    TODO: Check if document with this data already exists on database, to avoid replication of data.
    To solve this, the name of the document can be the primary key of the document.
  */
  async Insert(
    ENCRYPTIONKEY: string,
    collection: string,
    data: any,
    index: any
  ): Promise<WriteResult | null> {
    const colRef: CollectionReference = this.db.collection(collection);
    let result: WriteResult | null = null;
    const primaryKey: string = this.buildPrimaryKey(collection, data);

    const queryResult: boolean = await this.hasDocument(colRef, primaryKey);
    console.log("Result: ", queryResult);
    if (queryResult) {
      return null;
    } else {
      return await colRef.doc(primaryKey).create(data);
    }
  }

  async Get(
    ENCRYPTIONKEY: string,
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

  async Modify(
    ENCRYPTIONKEY: string,
    collection: string,
    query: any,
    modification: any
  ) {
    const colRef = this.db.collection(collection);
    const queryResult: QueryDocumentSnapshot[] = await this.queryCollection(
      colRef,
      query
    );
    queryResult.forEach(doc => {
      const docRef = doc.ref;
      docRef.update(modification);
    });
    return true;
  }

  async Delete(collection: string, query: any) {
    const colRef: CollectionReference = this.db.collection(collection);
    const queryResult: QueryDocumentSnapshot[] = await this.queryCollection(
      colRef,
      query
    );
    queryResult.forEach(doc => {
      const docRef = doc.ref;
      docRef.delete();
    });
    return true;
  }

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
