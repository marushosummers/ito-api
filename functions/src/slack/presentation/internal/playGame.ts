import {app} from "../../app";
import * as functions from "firebase-functions";
import {db} from "../../../index";
import {HistoryPlay} from "../../domain/HistoryPlay";
import {ChannelRepository} from "../../repository/channelRepository";
import {PlayGame} from "../../usecase/play_game";

const config = functions.config();

export const playGame = async (snapshot: functions.firestore.QueryDocumentSnapshot): Promise<void> => {
  console.log("Trigger Play Game");
  const data = snapshot.data();
  const historyPlay = new HistoryPlay({
    channelId: data.channelId,
    player: data.player,
  });

  try {
    const channelRepository = new ChannelRepository(db);
    const playGame = new PlayGame(historyPlay.channelId, channelRepository);
    await playGame.setDealerId();
    const result = await playGame.play({player: historyPlay.player});
    await app.client.chat.postMessage({
      token: config.slack.token,
      channel: historyPlay.channelId,
      text: `${result.status}/${result.fieldCard}`,
    });
  } catch (error) {
    console.error(error);
    await app.client.chat.postMessage({
      token: config.slack.token,
      channel: historyPlay.channelId,
      text: "エラーが発生しました",
    });
  }
};
