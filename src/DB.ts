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
const crypto = require("crypto");

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

  async Encrypt(data: any, secret: string) {
    const hash = crypto.createHash("sha256");
    hash.update(secret);
    const key = hash.digest().slice(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
      iv: iv.toString("hex"),
      data: encrypted.toString("hex")
    };
  }
  async Decrypt(data: any, _iv: string, secret: string) {
    const hash = crypto.createHash("sha256");
    hash.update(secret);
    const key = hash.digest().slice(0, 32);
    const iv = Buffer.from(_iv, "hex");
    const encryptedText = Buffer.from(data, "hex");
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(key),
      iv
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  async Close() {
    return true;
  }
}
