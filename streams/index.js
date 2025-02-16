import { promises as fs } from "fs";
import * as readline from "node:readline/promises";

const readLineInterFace = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readLineInterFace.setPrompt("Сыграем в орел и решку, загадайте число 1 или 2 ");
readLineInterFace.prompt();

async function appendJsonData(newData) {
  try {
    const jsonData = await fs.readFile("data.json", { encoding: "utf-8" });

    const data = JSON.parse(jsonData);
    data.gamesStats.push(newData);

    await fs.writeFile("data.json", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error processing JSON file:", err);
  }
}

readLineInterFace.on("line", (answer) => {
  const answerNum = parseInt(answer);
  if (Number.isNaN(answerNum)) {
    console.log("Введите числовое значение");
    return;
  }
  const randomNumber = Math.round(Math.random()) + 1;
  console.log("answerNUm", answerNum);
  console.log("ran", randomNumber);
  const isWin = answerNum === randomNumber;
  if (isWin) {
    console.log("Вы Угадали! Ваша победа учтена");
  } else {
    console.log("Вы не угадали, ваш результат учтен");
  }

  const newData = {
    guessedNumber: randomNumber,
    answer,
    isWin,
  };

  appendJsonData(newData);
  readLineInterFace.prompt();
});
