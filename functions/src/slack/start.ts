import {App} from "@slack/bolt";

export const commandStart = (app: App): void => {
  app.command("/start", async ({command, ack, say}) => {
    ack();
    say(`TestMessage: You said "${command.text}"`);
  });
};
