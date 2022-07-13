#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { printHelp } from "./services/logService.js";
import { saveKeyValue } from "./services/storageService.js";

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.t) {
    saveKeyValue('token', args.t)
  }
};

initCLI();
