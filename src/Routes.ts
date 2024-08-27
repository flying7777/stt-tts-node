import express from "express";
import { getSpeechToText, getTextToSpeech } from "./services/google-cloud";

const Routes = async (router: express.Router) => {
  // router.post("/loginStatus", Auth.controllers.middleware, Auth.controllers.checkLoginStatus);

  // getTextToSpeech();
  getSpeechToText();
};

export { Routes };