import {App} from "@slack/bolt";

export const mentionIto = (app: App): void => {
  app.event("app_mention", async ({event, say}) => {
    await say(`You are ${event.user}`);
  });
};
