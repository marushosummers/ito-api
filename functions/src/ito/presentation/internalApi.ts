import {db} from "../../index";
import {SignupDealer} from "../usecase/signup-dealer";
import {DealerRepository} from "../repository/dealer-repository";
import {CreateGame} from "../usecase/create-game";
import {QuitGame} from "../usecase/quit-game";
import {GameRepository} from "../repository/game-repository";
import {GetGame} from "../usecase/get-game";
import {QueryService} from "../repository/query-service";
import {PlayCard} from "../usecase/play-card";
import {GetOKResponse, GetErrorResponse} from "./response";
import {InvalidParameterError, NotFoundError} from "../domain/entity/errors";

// localテスト時に設定
// db.settings({
// host: "localhost:8080",
// ssl: false,
// });

export const signup = async (props: { type: string, name: string }): Promise<GetOKResponse | GetErrorResponse> => {
  // TODO: Factoryに切り出す
  const type: string = props.type;
  const name: string = props.name;
  const dealerRepository = new DealerRepository(db);
  const qs = new QueryService(db);
  const signupDealer = new SignupDealer(dealerRepository, qs);

  try {
    const dealer = await signupDealer.signup({type: type, name: name});
    return new GetOKResponse({dealerId: dealer.id, game: null});
  } catch (err) {
    console.error(err);
    if (err instanceof InvalidParameterError || err instanceof NotFoundError) {
      return new GetErrorResponse({message: err.message});
    } else {
      return new GetErrorResponse({message: "Internal Server Error"});
    }
  }
};

export const create = async (props: {
  dealerId: string,
  playerNum: number,
  thema: string,
  maxCard: number,
  handNum: number
}): Promise<GetOKResponse | GetErrorResponse> => {
  const dealerId = props.dealerId;
  const playerNum = props.playerNum;
  const thema = props.thema;
  const maxCard = props.maxCard;
  const handNum = props.handNum;
  const gameRepository = new GameRepository(db, dealerId);
  const qs = new QueryService(db);
  const createGame = new CreateGame(gameRepository, qs);
  try {
    const game = await createGame.create({
      dealerId: dealerId,
      playerNum: playerNum,
      thema: thema,
      maxCard: maxCard,
      handNum: handNum,
    });
    return new GetOKResponse({dealerId: dealerId, game: game});
  } catch (err) {
    console.error(err);
    if (err instanceof InvalidParameterError || err instanceof NotFoundError) {
      return new GetErrorResponse({message: err.message});
    } else {
      return new GetErrorResponse({message: "Internal Server Error"});
    }
  }
};

export const play = async (props: { dealerId: string, playerId: string }): Promise<GetOKResponse | GetErrorResponse> => {
  const dealerId = props.dealerId;
  const playerId = props.playerId;
  const gameRepository = new GameRepository(db, dealerId);
  const qs = new QueryService(db);
  const playCard = new PlayCard(gameRepository, qs);
  try {
    const game = await playCard.play(playerId);
    return new GetOKResponse({dealerId: dealerId, game: game});
  } catch (err) {
    console.error(err);
    if (err instanceof InvalidParameterError || err instanceof NotFoundError) {
      return new GetErrorResponse({message: err.message});
    } else {
      return new GetErrorResponse({message: "Internal Server Error"});
    }
  }
};

export const quit = async (props: { dealerId: string }): Promise<GetOKResponse | GetErrorResponse> => {
  const dealerId: string = props.dealerId;
  const gameRepository = new GameRepository(db, dealerId);
  const qs = new QueryService(db);
  const quitGame = new QuitGame(gameRepository, qs);
  try {
    const game = await quitGame.quit();
    return new GetOKResponse({dealerId: dealerId, game: game});
  } catch (err) {
    console.error(err);
    if (err instanceof InvalidParameterError || err instanceof NotFoundError) {
      return new GetErrorResponse({message: err.message});
    } else {
      return new GetErrorResponse({message: "Internal Server Error"});
    }
  }
};

export const game = async (props: { dealerId: string }): Promise<GetOKResponse | GetErrorResponse> => {
  const dealerId: string = props.dealerId;
  const qs = new QueryService(db);
  const getGame = new GetGame(qs);
  try {
    const game = await getGame.getInPlay({dealerId});
    return new GetOKResponse({dealerId: dealerId, game: game});
  } catch (err) {
    console.error(err);
    if (err instanceof InvalidParameterError || err instanceof NotFoundError) {
      return new GetErrorResponse({message: err.message});
    } else {
      return new GetErrorResponse({message: "Internal Server Error"});
    }
  }
};

