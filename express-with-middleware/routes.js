import { Router } from "express";
import { library } from "./library.js";
import { resolveBookByIndex, validateBook } from "./middleware.js";
import { fileURLToPath } from "url";
import path from "path";
import { imageUploadMiddleware } from "./files-multer.js";
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesFolder = path.join(__dirname, "images");

const router = Router();

const ROUTE_PATHS = {
  books: "/api/books",
  login: "/api/user/login",
};
router.get(ROUTE_PATHS.books, (request, response) => {
  response.status(200).json(library);
});

router.post(ROUTE_PATHS.login, (request, response) => {
  response.status(200).json({ id: 1, mail: "test@mail.ru" });
});

router.get(`${ROUTE_PATHS.books}/:id`, (request, response) => {
  const {
    params: { id },
  } = request;
  const foundBook = library.find((book) => book.id === id);

  if (!foundBook) {
    return response
      .status(404)
      .send({ message: `Книга по id ${id} не найдена` });
  }

  response.status(200).json(foundBook);
});

router.post(ROUTE_PATHS.books, validateBook, (request, response) => {
  const { body } = request;
  const { title, description, authors, favorite, fileCover, fileName } = body;
  const newBook = {
    id: uuid(),
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  };

  library.push(newBook);
  response.status(200).json(newBook);
});

router.put(`${ROUTE_PATHS.books}/:id`, validateBook, (request, response) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    request.body;

  const {
    params: { id },
  } = request;

  const bookIndex = library.findIndex((book) => book.id === id);

  library.splice(bookIndex, 1, {
    id: id ? id : uuid(),
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  });
  return response.status(200).json({ message: "Книга успешно обновлена" });
});

router.delete(
  `${ROUTE_PATHS.books}/:id`,
  resolveBookByIndex,
  (request, response) => {
    const { bookIndex } = request;
    library.splice(bookIndex, 1);
    return response
      .status(201)
      .json({ message: `Книга по индексу ${bookIndex} была успешно удалена` });
  },
);

router.post(
  `${ROUTE_PATHS.books}/:id/upload`,
  imageUploadMiddleware.single("img"),
  (request, response) => {
    try {
      if (request.file) {
        console.log("request.file", request.file);
        const { path } = request.file;
        console.log("path", path);
        response.json({ path });
      }
    } catch (err) {
      console.log("error", err);
    }
  },
);

router.get(`${ROUTE_PATHS.books}/:id/download`, (request, response) => {
  const {
    params: { id },
  } = request;

  response.json({ id });
  const bookFileName = library.find((book) => book.id === id).fileBook;
  const filePath = path.join(imagesFolder, bookFileName);

  response.download(filePath, bookFileName, (err) => {
    if (err) {
      console.error("Ошибка загрузки:", err);
      response.status(500).send("Ошибка загрузки файла");
    }
  });
});

export default router;
