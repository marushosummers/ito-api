import {App} from "@slack/bolt";

const VIEW_ID = "newgame";

export const commandStart = (app: App): void => {
  app.command("/start", async ({ack, body, context, command}) => {
    await ack();
    try {
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
          blocks: [
            {
              type: "input",
              block_id: "thema_block",
              label: {
                type: "plain_text",
                text: "テーマ",
              },
              element: {
                type: "plain_text_input",
                action_id: "thema_input",
              },
            },
          ],
          private_metadata: command.channel_id,
          submit: {
            type: "plain_text",
            text: "Start",
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.view(VIEW_ID, async ({ack, view, context, body}) => {
    await ack();
    const values = view.state.values;
    const channelId = view.private_metadata;
    const thema = values.thema_block.thema_input.value;

    try {
      // get user info
      const {user} = await app.client.users.info({
        token: context.botToken,
        user: body.user.id,
      });
      // post chanel
      await app.client.chat.postMessage({
        token: context.botToken,
        channel: channelId,
        text: "",
        blocks: createStartBlock(
            user?.real_name,
            thema,
            "marusho",
            100,
            2
        ),
      });
    } catch (error) {
      console.error("post message error", error);
    }
  });
};

const createStartBlock = (
    username: string | undefined,
    thema: string | null | undefined,
    members: string | null | undefined,
    maxNum: number | undefined,
    handNum: number | undefined,
) => {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `:spider_web: ${thema}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `:raising_hand: *プレイヤー*\n\n${members}`,
      },
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `Number: 0 - ${maxNum}\nHand: ${handNum}`,
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: `new ito game created by *${username}*`,
        },
      ],
    },
    {
      type: "divider",
    },
  ];
};
