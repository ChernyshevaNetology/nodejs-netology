#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getCurrentFlag, renderDate } from "./date-utils.js";

const argv = yargs(hideBin(process.argv)).argv;
const currentFlag = getCurrentFlag(argv);

console.log("argv get arg", argv._[0]);
console.log("getCurrentFlag", currentFlag);
console.log("-------------------RESULT____________________");
console.log(renderDate(currentFlag, argv._[0]));
console.log("-------------------RESULT____________________");
