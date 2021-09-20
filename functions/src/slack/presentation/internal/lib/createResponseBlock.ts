import {KnownBlock} from "@slack/types/dist/index";

export const createResponseBlock = (
    username: string | undefined,
    thema: string | null | undefined,
    members: string[] | null | undefined,
    maxNum: string | null | undefined,
    handNum: string | null | undefined,
): KnownBlock[] => {
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
