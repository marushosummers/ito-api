import * as functions from "firebase-functions";
import {expressReceiver} from "./slack/app";
import {createGame} from "./slack/presentation/internal/createGame";
import {playGame} from "./slack/presentation/internal/playGame";

export const slack = functions.region("asia-northeast1").https.onRequest(expressReceiver.app);

export const create = functions.firestore.document("historyGame/{id}").onCreate(async (snapshot) => {
  await createGame(snapshot);
});
export const play = functions.firestore.document("historyPlay/{id}").onCreate(async (snapshot) => {
  await playGame(snapshot);
});
