import {KnownBlock} from "@slack/types/dist/index";

export const createResponseBlock = (
    username: string | undefined,
    thema: string,
    members: string[] | null | undefined,
    maxNum: number,
    handNum: number,
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
        text: `:raising_hand: *プレイヤー*\n\n${members?.join("\n")}`,
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
