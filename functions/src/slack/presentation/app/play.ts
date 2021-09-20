import {App} from "@slack/bolt";
import {db} from "../../../index";
import {HistoryRepository} from "../../repository/historyRepository";

export const mentionIto = (app: App): void => {
  app.event("app_mention", async ({event, say}) => {
    try {
      const channelId = event.channel;
      const player = event.user;

      if (!player) {
        throw new Error();
      }
      // Save Player
      const historyRepository = new HistoryRepository(db);
      await historyRepository.savePlayGame({channelId, player});

      await say("壁||´⊇｀)ﾉｼ");
    } catch (error) {
      console.error(error);
      await say("エラーが発生しました");
    }
  });
};
