#!/usr/bin/env node
import * as readline from "node:readline/promises";

const randomNumber = Math.round(Math.random() * 10);

const readLineInterFace = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLineInterFace.setPrompt("Загадано число в диапазоне от 0 до 10 ");
readLineInterFace.prompt();
readLineInterFace.on("line", (answer) => {
  const answerNum = parseInt(answer);

  if (answerNum > randomNumber) {
    console.log("Меньше");
  } else if (answerNum < randomNumber) {
    console.log("Больше");
  } else if (answerNum === randomNumber) {
    console.log(`отгадано число ${answerNum}`);
    readLineInterFace.close();
    process.exit(0);
  } else {
    console.log("Введите числовое значение");
  }
  readLineInterFace.prompt();
});
