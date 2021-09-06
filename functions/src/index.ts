import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase);

// localテスト時に設定
// fireStore.settings({
// host: "localhost:8080",
// ssl: false,
// });

const db = admin.firestore();

export const createDocument = functions.https.onRequest(async (req, res) => {
  await db.collection("test").doc("abc").set({a: 123});
  res.send();
});

export const updateDocument = functions.https.onRequest(async (req, res) => {
  await db.collection("test").doc("abc").update({a: 234, b: 345});
  res.send();
});

export const deleteDocument = functions.https.onRequest(async (req, res) => {
  await db.collection("test").doc("abc").delete();
  res.send();
});

export const getDocument = functions.https.onRequest(async (req, res) => {
  const data = await (await db.collection("test").doc("abc").get()).data();
  res.send(data);
});
