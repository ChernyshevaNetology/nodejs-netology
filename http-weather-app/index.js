import http from "http";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import config from "../config.js";

const argv = yargs(hideBin(process.argv)).argv;

console.log("env", process.env.API_KEY);
console.log("p", process.env.PORT);

const WEATHER_API_URL = `http://api.weatherstack.com/current?access_key=${config.api_key}&query=${argv._[0]}`;
console.log("WEATHER_API_URL", WEATHER_API_URL);

http.get(WEATHER_API_URL, (response) => {
  const { statusCode } = response;
  if (statusCode !== 200) {
    console.log(`Неуспешный запрос, вернувший статус код ${statusCode}`);
    return;
  }

  response.setEncoding("utf8");
  let rowData = "";
  response.on("data", (chunk) => (rowData += chunk));
  response.on("end", () => {
    let parseData = JSON.parse(rowData);
    console.log("parsedData", parseData);
  });
});
