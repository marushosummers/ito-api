import {app} from "../../app";
import * as functions from "firebase-functions";
import {db} from "../../../index";
import {HistoryGame} from "../../domain/HistoryGame";
import {StartGame} from "../../usecase/start_game";
import {ChannelRepository} from "../../repository/channelRepository";
import {createResponseBlock} from "./lib/createResponseBlock";
import {Channel} from "@slack/web-api/dist/response/ConversationsListConnectInvitesResponse";

const config = functions.config();

interface DMChannel extends Channel {
  user: string
}

export const createGame = async (snapshot: functions.firestore.QueryDocumentSnapshot): Promise<void> => {
  console.log("Hello Trigger！");

  const data = snapshot.data();
  const game = new HistoryGame({
    channelId: data.channelId,
    createUserId: data.createUserId,
    thema: data.thema,
    players: data.players,
    maxNum: data.maxNum,
    handNum: data.handNum,
  });

  console.log(game);
  // Get CreatUser Infomation
  const createUser = await app.client.users.info({
    token: config.slack.token,
    user: game.createUserId,
  });

  // Get PlayerUser Infomation
  let playerUsers;
  if (game.players) {
    playerUsers = await Promise.all(game.players.map(async (user) => {
      const _user = await app.client.users.info({
        token: config.slack.token,
        user: user,
      });
      return _user.user?.real_name ?? "";
    }));
  }

  // Gameの開始
  const channelRepository = new ChannelRepository(db);
  const startGame = new StartGame(game.channelId, channelRepository);
  await startGame.setDealerId();

  const playerMaps = await startGame.start({thema: game.thema, players: game.players, maxNum: game.maxNum, handNum: game.handNum});

  // DMチャンネル一覧を取得
  const DMList = await app.client.conversations.list({
    token: config.slack.token,
    types: "im",
  });
  const DMs = DMList.channels as DMChannel[];

  if (!DMs) {
    throw Error();
  }

  // send Card
  for await (const playerMap of playerMaps) {
    const channel = DMs.find((channel) => channel.user === playerMap.id);

    if (!channel) {
      throw Error();
    } else if (!channel.id) {
      throw Error();
    }

    await app.client.chat.postMessage({
      token: config.slack.token,
      channel: channel.id,
      text: `${playerMap.cards}`,
    }
    );
  }

  // PostMessage
  await app.client.chat.postMessage({
    token: config.slack.token,
    channel: game.channelId,
    text: "",
    blocks: createResponseBlock(
        createUser.user?.real_name,
        game.thema,
        playerUsers,
        game.maxNum,
        game.handNum
    ),
  });
};
