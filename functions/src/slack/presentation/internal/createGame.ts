import {app} from "../../app";
import {db} from "../../../index";
import {StartGame} from "../../usecase/start_game";
import {ChannelRepository} from "../../repository/channelRepository";
import {createResponseBlock} from "./lib/createResponseBlock";
import {Channel} from "@slack/web-api/dist/response/ConversationsListConnectInvitesResponse";

interface DMChannel extends Channel {
  user: string
}


export const createGame = async (change, context): Promise<void> => {
  console.log("Hello Trigger！");

  // Get CreatUser Infomation
  const createUser = await app.client.users.info({
    token: context.botToken,
    user: body.user.id,
  });

  // Get PlayerUser Infomation
  let playerUsers;
  if (players) {
    playerUsers = await Promise.all(players.map(async (user) => {
      const _user = await app.client.users.info({
        token: context.botToken,
        user: user,
      });
      return _user.user?.real_name ?? "";
    }));
  }

  // Gameの開始
  const channelRepository = new ChannelRepository(db);
  const startGame = new StartGame(channelId, channelRepository);
  await startGame.setDealerId();

  const playerMaps = await startGame.start({thema: thema, players: players, maxNum: parseInt(maxNum), handNum: parseInt(handNum)});

  // DMチャンネル一覧を取得
  const DMList = await app.client.conversations.list({
    token: context.botToken,
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
      token: context.botToken,
      channel: channel.id,
      text: `${playerMap.cards}`,
    }
    );
  }

  // PostMessage
  await app.client.chat.postMessage({
    token: context.botToken,
    channel: channelId,
    text: "",
    blocks: createResponseBlock(
        createUser.user?.real_name,
        thema,
        playerUsers,
        maxNum,
        handNum
    ),
  });
};
