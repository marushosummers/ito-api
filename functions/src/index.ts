import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


admin.initializeApp(functions.config().firebase);
export const db = admin.firestore();
db.settings({
  timestampsInSnapshots: true,
});

// localテスト時に設定
// db.settings({
// host: "localhost:8080",
// ssl: false,
// });

export * from "./ito";
