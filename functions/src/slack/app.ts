import * as functions from "firebase-functions";
import {App, ExpressReceiver} from "@slack/bolt";
import {commandStart} from "./presentation/app/start";
import {mentionIto} from "./presentation/app/play";

const config = functions.config();

export const expressReceiver = new ExpressReceiver({
  signingSecret: config.slack.secret,
  endpoints: "/events",
});

export const app = new App({
  receiver: expressReceiver,
  token: config.slack.token,
  processBeforeResponse: true,
});

commandStart(app);
mentionIto(app);
