import http from "http";
import url from "url";
import { readFileSync } from "fs";

console.log("creating a server!");

const server = http.createServer((req, res) => {
  const urlParsed = url.parse(req.url, true);
  console.log("res", req.url);
  const { pathname, query } = urlParsed;
  console.log(pathname, query);
  const { method } = req;
  console.log("method", method);

  const homePage = readFileSync("./templates/homePage.html");

  res.setHeader("Content-Type", "text/html; charset=utf-8;");

  if (pathname === "/" || pathname === "/index") {
    res.write(`<h2>Рендерим html с сервера!</h2>`);
    res.end(`<h2>Закончили</h2>`);
  } else if (req.url === "/home") {
    res.write(homePage);
    res.end();
  } else if (pathname === "/order") {
    res.write(`<h2>Рендерим Страницу ордеров!</h2>`);
    res.end();
  } else if (pathname === "/plugins") {
    res.write(`<h2>Рендерим страницу плагинов</h2>`);
    res.end();
  } else if (pathname === "/json") {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }); // Allow all origins});
    const data = [
      { id: 1, name: "Andrey" },
      { id: "2", name: "Alexander" },
    ];
    res.end(JSON.stringify(data));
  } else {
    res.end(`<h2>Страница не найдена</h2>`);
  }

  res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
