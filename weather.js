#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp, printSuccess, printError } from "./services/logService.js";
import { saveKeyValue } from "./services/storageService.js";

const saveToken = async (token) => {
  try {
    await saveKeyValue("token", token);
    printSuccess("Токен сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.t) {
    return saveToken(args.t);
  }
};

initCLI();
