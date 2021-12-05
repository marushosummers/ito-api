import * as functions from "firebase-functions";
import {db} from "../../index";
import {SignupDealer} from "../usecase/signup-dealer";
import {DealerRepository} from "../repository/dealer-repository";
import {RoomRepository} from "../repository/room-repository";
import {CreateRoom} from "../usecase/create-room";
import {CreateGame} from "../usecase/create-game";
import {QuitGame} from "../usecase/quit-game";
import {GameRepository} from "../repository/game-repository";
import {GetGame} from "../usecase/get-game";
import {QueryService} from "../repository/query-service";
import {PlayCard} from "../usecase/play-card";
import {GetOKResponse, GetErrorResponse} from "./response";
import {InvalidParameterError, NotFoundError} from "../domain/entity/errors";

const REGION = "asia-northeast1" as const;

export const createRoom = functions.region(REGION).https.onCall(async (data, context) => {
  const type = "web";
  if (context.auth === undefined) {
    return new GetErrorResponse({message: "Unauthorized User"});
  }
  const uid: string = context.auth.uid;
  const roomRepository = new RoomRepository(db);
  const qs = new QueryService(db);
  const createRoom = new CreateRoom(roomRepository, qs);

  try {
    const room = await createRoom.do({type: type, uid: uid});
    return {roomId: room.id};
  } catch (err) {
    console.error(err);
    if (err instanceof InvalidParameterError || err instanceof NotFoundError) {
      return new GetErrorResponse({message: err.message});
    } else {
      return new GetErrorResponse({message: "Internal Server Error"});
    }
  }
});

// export const signup = functions.https.onRequest(async (req, res) => {
//   if (req.method !== "POST") {
//     res.status(400).send("This method is not supported");
//   } else if (req.body.type === undefined || req.body.name === undefined) {
//     res.status(400).send("Invalid body parameter");
//   } else {
//     // TODO: Factoryに切り出す
//     const type: string = req.body.type;
//     const name: string = req.body.name;
//     const dealerRepository = new DealerRepository(db);
//     const qs = new QueryService(db);
//     const signupDealer = new SignupDealer(dealerRepository, qs);

//     try {
//       const dealer = await signupDealer.signup({type: type, name: name});
//       res.send(new GetOKResponse({dealerId: dealer.id, game: null}));
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


// export const create = functions.https.onRequest(async (req, res) => {
//   if (req.method !== "POST") {
//     res.status(400).send("This method is not supported");
//   } else if (req.body.dealerId === undefined || req.body.playerNum === undefined) {
//     res.status(400).send("Invalid body parameter");
//   } else {
//     const dealerId = req.body.dealerId;
//     const playerNum = req.body.playerNum;
//     const thema = req.body.thema;
//     const maxCard = req.body.maxCard;
//     const gameRepository = new GameRepository(db, dealerId);
//     const qs = new QueryService(db);
//     const createGame = new CreateGame(gameRepository, qs);
//     try {
//       const game = await createGame.create({
//         dealerId: dealerId,
//         playerNum: playerNum,
//         thema: thema,
//         maxCard: maxCard,
//       });
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


