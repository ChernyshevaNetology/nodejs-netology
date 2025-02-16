import { promises as fs } from "fs";

/**
 * общее количество партий,
 * количество выигранных/проигранных партий,
 * процентное соотношение выигранных партий.
 * @param stats
 */
function getGameStats(stats) {
  if (!stats || !stats.length) {
    console.log("Лог файл пуст");
    return;
  }

  return stats.reduce(
    (acc, game) => {
      acc.wonGames = game.isWin ? (acc.wonGames += 1) : acc.wonGames;
      acc.lostGames = !game.isWin ? (acc.lostGames += 1) : acc.lostGames;
      return acc;
    },
    {
      totalGames: stats.length,
      wonGames: 0,
      lostGames: 0,
    },
  );
}

async function getDataFromFile() {
  try {
    const jsonData = await fs.readFile("data.json", { encoding: "utf-8" });

    const { gamesStats } = await JSON.parse(jsonData);
    const result = await getGameStats(gamesStats);
    console.log("gameStats ", result);
  } catch (err) {
    console.error("Error reading data from file", err);
  }
}

getDataFromFile();
