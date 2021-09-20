import * as functions from "firebase-functions";

export const playGame = (snapshot: functions.firestore.QueryDocumentSnapshot): void => {
  console.log(`Hello Trigger！ ${snapshot.data()}`);
};
