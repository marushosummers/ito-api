import * as functions from "firebase-functions";
import {App, ExpressReceiver} from "@slack/bolt";
import {commandStart} from "./start";

const config = functions.config();

export const expressReceiver = new ExpressReceiver({
  signingSecret: config.slack.secret,
  endpoints: "/events",
  processBeforeResponse: true,
});

const app = new App({
  receiver: expressReceiver,
  token: config.slack.token,
});

commandStart(app);
