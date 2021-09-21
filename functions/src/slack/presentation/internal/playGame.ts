import {app} from "../../app";
import * as functions from "firebase-functions";
import {db} from "../../../index";
import {HistoryPlay} from "../../domain/HistoryPlay";
import {ChannelRepository} from "../../repository/channelRepository";
import {PlayGame} from "../../usecase/play_game";
import {GameResult} from "../../domain/GameResult";

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

    const message = createJudgeMessage(result);

    await app.client.chat.postMessage({
      token: config.slack.token,
      channel: historyPlay.channelId,
      text: message,
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "エラーが発生しました";
    await app.client.chat.postMessage({
      token: config.slack.token,
      channel: historyPlay.channelId,
      text: message,
    });
  }
};

const createJudgeMessage = (result: GameResult): string => {
  let message = `[ ${result.fieldCard} ]\n\n`;
  if (result.status === "INPLAY") {
    message += "⊂（＾ω＾）⊃　ｾﾌｾﾌ!!";
  } else if (result.status === "SUCCESS") {
    message += "ｷﾀ━━━ヽ( ﾟ∀ﾟ)人(ﾟ∀ﾟ )ﾒ( ﾟ∀ﾟ)人(ﾟ∀ﾟ )ﾒ( ﾟ∀ﾟ)人(ﾟ∀ﾟ )ﾉ━━━!!!!";
  } else {
    message += "=== GAME OVER ===";
  }

  return message;
};
