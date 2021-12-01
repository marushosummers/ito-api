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

      await say("||´⊇｀) 処理中...");
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "エラーが発生しました";
      await say(message);
    }
  });
};
