import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// localテスト時に設定
// db.settings({
// host: "localhost:8080",
// ssl: false,
// });

export const signup = functions.https.onRequest(async (req, res) => {
  // TODO: POST新しいdealerを発行
  if (req.method !== "POST") {
    res.status(400).send("This method is not supported");
  } else if (req.body.type === undefined || req.body.id === undefined) {
    res.status(400).send("Invalid body parameter");
  } else {
    const type: string = req.body.type;
    const id: string = req.body.id;
    // dealer = signup_dealer()
    try {
      const result = await db.collection("dealer").add({
        "type": type,
        "id": id,
      });
      res.send(`Created new Dealer ${result.id}`);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }
});

export const create = functions.https.onRequest(async (req, res) => {
  // TODO: POST新しいGameを発行
  if (req.method !== "POST") {
    res.status(400).send("This method is not supported");
  } else if (req.body.type === undefined || req.body.id === undefined) {
    res.status(400).send("Invalid body parameter");
  } else {
    const type: string = req.body.type;
    const id: string = req.body.id;
    // dealer = signup_dealer()
    res.send(`Created new Dealer ${type} ${id}`);
  }
  await db.collection("game").doc("abc").set({dealerId: 123});
  res.send("Created new Game");
});

export const play = functions.https.onRequest(async (req, res) => {
  // TODO: POST カードを出すアクション
  res.send("Play a card by hogehoge");
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


