import {App} from "@slack/bolt";
import {db} from "../../../index";
import {HistoryRepository} from "../../repository/historyRepository";
import {createModalBlock} from "./lib/createModalBlock";

const VIEW_ID = "newgame";

export const commandStart = (app: App): void => {
  app.command("/start", async ({ack, body, context, command}) => {
    await ack();

    try {
      const modalBlock = createModalBlock(body.user_id);
      await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: "modal",
          callback_id: VIEW_ID,
          title: {
            type: "plain_text",
            text: "あたらしいitoをはじめる",
          },
          blocks: modalBlock,
          private_metadata: command.channel_id,
          submit: {
            type: "plain_text",
            text: "Start",
          },
        },
      });
    } catch (error) {
      console.error(error);
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: command.channel_id,
        text: "エラーが発生しました",
      });
    }
  });

  app.view(VIEW_ID, async ({ack, view, context, body}) => {
    const values = view.state.values;
    const channelId = view.private_metadata;
    const createUserId = body.user.id;
    const thema = values.thema_block.thema.value;
    const players = values.players_block.players.selected_users;
    const maxNum = values.maxNum_block.maxNum.selected_option?.value;
    const handNum = values.handNum_block.handNum.selected_option?.value;

    try {
      // validation
      if (!thema || !players || !maxNum || !handNum) {
        throw Error("Invalid Prameter");
      }

      // Save Game
      const game = {
        channelId: channelId,
        createUserId: createUserId,
        thema: thema,
        players: players,
        maxNum: parseInt(maxNum),
        handNum: parseInt(handNum),
      };

      const historyRepository = new HistoryRepository(db);
      await historyRepository.saveCreateGame(game);

      await app.client.chat.postMessage({
        token: context.botToken,
        channel: channelId,
        text: "ゲームを作成中...",
      });
      await ack();
    } catch (error) {
      console.error(error);
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: channelId,
        text: "エラーが発生しました",
      });
    }
  });
};
