import {App} from "@slack/bolt";
import {db} from "../../../index";
import {StartGame} from "../../usecase/start_game";
import {ChannelRepository} from "../../repository/channelRepository";
import {Channel} from "@slack/web-api/dist/response/ConversationsListConnectInvitesResponse";

const VIEW_ID = "newgame";

interface DMChannel extends Channel {
  user: string
}

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
              block_id: "handNum_block",
              label: {
                type: "plain_text",
                text: "手札",
              },
              element: {
                type: "static_select",
                action_id: "handNum",
                initial_option: {
                  text: {
                    type: "plain_text",
                    text: "1",
                  },
                  value: "1",
                },
                options: [
                  {
                    text: {
                      type: "plain_text",
                      text: "1",
                    },
                    value: "1",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "2",
                    },
                    value: "2",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "3",
                    },
                    value: "3",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "4",
                    },
                    value: "4",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "5",
                    },
                    value: "5",
                  },
                ],
              },
            },
            {
              type: "input",
              block_id: "maxNum_block",
              label: {
                type: "plain_text",
                text: "カードの最大値",
              },
              hint: {
                type: "plain_text",
                text: "最小値は1です",
              },
              element: {
                type: "static_select",
                action_id: "maxNum",
                initial_option: {
                  text: {
                    type: "plain_text",
                    text: "100",
                  },
                  value: "100",
                },
                options: [
                  {
                    text: {
                      type: "plain_text",
                      text: "50",
                    },
                    value: "50",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "100",
                    },
                    value: "100",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "1000",
                    },
                    value: "1000",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "10000",
                    },
                    value: "10000",
                  },
                  {
                    text: {
                      type: "plain_text",
                      text: "100000",
                    },
                    value: "100000",
                  },
                ],
              },
            },
            {
              type: "input",
              block_id: "players_block",
              label: {
                type: "plain_text",
                text: "プレイヤー",
              },
              hint: {
                type: "plain_text",
                text: "最大10人まで",
              },
              element: {
                type: "multi_users_select",
                initial_users: [body.user_id],
                max_selected_items: 10,
                action_id: "players",
              },
            },
            {
              type: "input",
              block_id: "thema_block",
              label: {
                type: "plain_text",
                text: "テーマ",
              },
              element: {
                type: "plain_text_input",
                action_id: "thema",
              },
              optional: true,
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
    const thema = values.thema_block.thema.value;
    const players = values.players_block.players.selected_users;
    const maxNum = values.maxNum_block.maxNum.selected_option?.value;
    const handNum = values.handNum_block.handNum.selected_option?.value;

    // PostMessage
    await app.client.chat.postMessage({
      token: context.botToken,
      channel: channelId,
      text: "あたらしいゲームを開始します...",
    });

    try {
      // TODO: validation
      if (!thema || !players || !maxNum || !handNum) {
        throw Error("Invalid Prameter");
      }

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
        blocks: createStartBlock(
            createUser.user?.real_name,
            thema,
            playerUsers,
            maxNum,
            handNum
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
    members: string[] | null | undefined,
    maxNum: string | null | undefined,
    handNum: string | null | undefined,
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
