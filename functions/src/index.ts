import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

// localテスト時に設定
// fireStore.settings({
// host: "localhost:8080",
// ssl: false,
// });

const db = admin.firestore();

export const signup = functions.https.onRequest(async (req, res) => {
  // TODO: POST新しいdealerを発行
  if (req.method !== "GET") {
    res.status(400).send("GET method is not supported");
  }
  res.send("Created new Dealer");
});

export const create = functions.https.onRequest(async (req, res) => {
  // TODO: POST新しいGameを発行
  await db.collection("game").doc("abc").set({dealerId: 123});
  res.send("Created new Game");
});

export const quit = functions.https.onRequest(async (req, res) => {
  // TODO: POSTGameを終了する
  res.send("Quit the game");
});

export const game = functions.https.onRequest(async (req, res) => {
  if (req.method === "GET" && req.query.id === undefined) {
    // TODO: ゲーム情報をreturnする
    const data = await (await db.collection("game").doc("abc").get()).data();
    res.send(data);
  }
  res.send("エラー");
});

export const play = functions.https.onRequest(async (req, res) => {
  // TODO: POST カードを出すアクション
  res.send("Play a card by hogehoge");
});
