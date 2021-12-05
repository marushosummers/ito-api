import * as functions from "firebase-functions";
import {db} from "../../index";
import {CreateGame} from "../usecase/create-game";
import {QuitGame} from "../usecase/quit-game";
import {GameRepository} from "../repository/game-repository";
import {GetGame} from "../usecase/get-game";
import {QueryService} from "../repository/query-service";
import {PlayCard} from "../usecase/play-card";
import {GetOKResponse, GetErrorResponse} from "./response";
import {InvalidParameterError, NotFoundError} from "../domain/entity/errors";

const REGION = "asia-northeast1" as const;

export const startGame = functions.region(REGION).https.onCall(async (data, context) => {
  if (context.auth === undefined) {
    return new GetErrorResponse({message: "Unauthorized User"});
  }
  const roomId: string = data.dealerId;
  const members: string[] = data.members;
  const thema: string = data.thema;
  const maxCard: number = data.maxCard;
  const handNum: number = data.handNum;

  const gameRepository = new GameRepository(db, roomId);
  const qs = new QueryService(db);
  const createGame = new CreateGame(gameRepository, qs);
  try {
    await createGame.create({
      roomId: roomId,
      members: members,
      thema: thema,
      maxCard: maxCard,
      handNum: handNum,
    });
    return {status: "OK"};
  } catch (err) {
    console.error(err);
    if (err instanceof InvalidParameterError || err instanceof NotFoundError) {
      return new GetErrorResponse({message: err.message});
    } else {
      return new GetErrorResponse({message: "Internal Server Error"});
    }
  }
});

// export const play = functions.https.onRequest(async (req, res) => {
//   if (req.method !== "POST") {
//     res.status(400).send("This method is not supported");
//   } else if (req.body.dealerId === undefined || req.body.playerId === undefined) {
//     res.status(400).send("Invalid body parameter");
//   } else {
//     const dealerId = req.body.dealerId;
//     const playerId = req.body.playerId;
//     const gameRepository = new GameRepository(db, dealerId);
//     const qs = new QueryService(db);
//     const playCard = new PlayCard(gameRepository, qs);
//     try {
//       const game = await playCard.play(playerId);
//       res.send(new GetOKResponse({dealerId: dealerId, game: game}));
//     } catch (err) {
//       console.error(err);
//       if (err instanceof InvalidParameterError || err instanceof NotFoundError) {
//         res.status(400).send(new GetErrorResponse({message: err.message}));
//       } else {
//         res.status(500).send(new GetErrorResponse({message: "Internal Server Error"}));
//       }
//     }
//   }
// });

// export const quit = functions.https.onRequest(async (req, res) => {
//   if (req.method !== "POST") {
//     res.status(400).send("This method is not supported");
//   } else if (req.body.dealerId === undefined) {
//     res.status(400).send("Invalid body parameter");
//   } else {
//     const dealerId: string = req.body.dealerId;
//     const gameRepository = new GameRepository(db, dealerId);
//     const qs = new QueryService(db);
//     const quitGame = new QuitGame(gameRepository, qs);
//     try {
//       const game = await quitGame.quit();
//       res.send(new GetOKResponse({dealerId: dealerId, game: game}));
//     } catch (err) {
//       console.error(err);
//       if (err instanceof InvalidParameterError || err instanceof NotFoundError) {
//         res.status(400).send(new GetErrorResponse({message: err.message}));
//       } else {
//         res.status(500).send(new GetErrorResponse({message: "Internal Server Error"}));
//       }
//     }
//   }
// });

// export const game = functions.https.onRequest(async (req, res) => {
//   if (req.method !== "GET") {
//     res.status(400).send("This method is not supported");
//   } else if (typeof req.query.dealerId !== "string") {
//     res.status(400).send("Invalid body parameter");
//   } else {
//     const dealerId: string = req.query.dealerId;
//     const qs = new QueryService(db);
//     const getGame = new GetGame(qs);
//     try {
//       const game = await getGame.getInPlay({dealerId});
//       res.send(new GetOKResponse({dealerId: dealerId, game: game}));
//     } catch (err) {
//       console.error(err);
//       if (err instanceof InvalidParameterError || err instanceof NotFoundError) {
//         res.status(400).send(new GetErrorResponse({message: err.message}));
//       } else {
//         res.status(500).send(new GetErrorResponse({message: "Internal Server Error"}));
//       }
//     }
//   }
// });

