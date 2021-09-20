import {KnownBlock} from "@slack/types/dist/index";

export const createModalBlock = (
    userId: string | undefined,
): KnownBlock[] => {
  return [
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
        initial_users: [userId],
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
  ];
};
