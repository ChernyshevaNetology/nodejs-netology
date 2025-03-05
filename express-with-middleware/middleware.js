import { library } from "./library.js";

export const resolveBookByIndex = (request, response, next) => {
  const {
    params: { id },
  } = request;

  const bookIndex = library.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    console.log("попали в if bookIndex");
    return response
      .status(404)
      .json({ error: `Книга с id ${id} не найдена в библиотеке` });
  }

  request.bookIndex = bookIndex;
  next();
};

export const validateBook = (request, response, next) => {
  const { body } = request;
  if (!body) {
    response.status(403).json({ error: "Запрос не может быть пустым" });
  }
  const { title, description, authors, favorite, fileCover, fileName } = body;

  const isFullRequestBody = [
    title,
    description,
    authors,
    typeof favorite === "boolean",
    fileCover,
    fileName,
  ].every(Boolean);

  if (!isFullRequestBody) {
    return response
      .status(403)
      .json({ error: "Пожалуйста, заполните все поля" });
  }

  next();
};
