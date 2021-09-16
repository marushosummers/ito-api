// 使ってない
import * as cloudFunctions from "firebase-functions";

const REGION = "asia-northeast1" as const;
export const functions = cloudFunctions.region(REGION);
