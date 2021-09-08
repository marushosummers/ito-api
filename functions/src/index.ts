import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {SignupDealer} from "./usecase/signup-dealer";
import {DealerRepository} from "./repository/dealer-repository";
import {CreateGame} from "./usecase/create-game";
import {QuitGame} from "./usecase/quit-game";
import {GameRepository} from "./repository/game-repository";
import {GetGame} from "./usecase/get-game";
import {QueryService} from "./repository/query-service";


admin.initializeApp(functions.config().firebase);
export const db = admin.firestore();

// localテスト時に設定
// db.settings({
// host: "localhost:8080",
// ssl: false,
// });

export const signup = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).send("This method is not supported");
  } else if (req.body.type === undefined || req.body.name === undefined) {
    res.status(400).send("Invalid body parameter");
  } else {
    // TODO: Factoryに切り出す
    const type: string = req.body.type;
    const name: string = req.body.name;
    const dealerRepository = new DealerRepository(db);
    const signupDealer = new SignupDealer(dealerRepository);

    try {
      const id = await signupDealer.signup({type: type, name: name});
      res.send(`Created new Dealer id: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
});


export const create = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).send("This method is not supported");
  } else if (req.body.dealerId === undefined || req.body.playerNum === undefined) {
    res.status(400).send("Invalid body parameter");
  } else {
    const dealerId = req.body.dealerId;
    const playerNum = req.body.playerNum;
    const thema = req.body.thema;
    const minCard = req.body.minCard;
    const maxCard = req.body.maxCard;
    const gameRepository = new GameRepository(db, dealerId);
    const createGame = new CreateGame(gameRepository);
    try {
      const game = await createGame.create({
        dealerId: dealerId,
        playerNum: playerNum,
        thema: thema,
        minCard: minCard,
        maxCard: maxCard,
      });
      res.send(`Created new Game id: ${game.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
});

export const play = functions.https.onRequest(async (req, res) => {
  // TODO: POST カードを出すアクション
  res.send("Play a card by hogehoge");
});

export const quit = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).send("This method is not supported");
  } else if (req.body.dealerId === undefined) {
    res.status(400).send("Invalid body parameter");
  } else {
    // TODO: ゲームをQuitする
    const dealerId: string = req.body.dealerId;
    const gameRepository = new GameRepository(db, dealerId);
    const qs = new QueryService(db);
    const quitGame = new QuitGame(gameRepository, qs);
    try {
      await quitGame.quit();
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
    res.send("Success");
  }
});

export const game = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(400).send("This method is not supported");
  } else if (typeof req.query.dealerId !== "string") {
    res.status(400).send("Invalid body parameter");
  } else {
    // TODO: ゲーム情報をreturnする
    const dealerId: string = req.query.dealerId;
    const qs = new QueryService(db);
    const getGame = new GetGame(qs);
    const game = await getGame.getInPlay({dealerId});
    res.send(game);
  }
});


