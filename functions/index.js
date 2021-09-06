//"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// データベースの参照を作成
var fireStore = admin.firestore()

// localテスト時に設定
// fireStore.settings({
// 	host: "localhost:8080",
// 	ssl: false,
// });

const db = admin.firestore();

exports.createDocument = functions.https.onRequest(async (req, res) => {
	await db.collection("test").doc("abc").set({ a: 123 });
	res.send();
});

exports.updateDocument = functions.https.onRequest(async (req, res) => {
	await db.collection("test").doc("abc").update({ a: 234, b: 345 });
	res.send();
});

exports.deleteDocument = functions.https.onRequest(async (req, res) => {
	await db.collection("test").doc("abc").delete();
	res.send();
});

exports.getDocument = functions.https.onRequest(async (req, res) => {
	const data = await (await db.collection("test").doc("abc").get()).data();
	res.send(data);
});
