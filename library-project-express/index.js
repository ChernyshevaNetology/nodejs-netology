import express, { json, request, response } from "express";
import { v4 as uuid } from "uuid";

const PORT = process.env.PORT || 8000;
console.log("server is running on Port", PORT);

const library = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    description:
      "A novel about the serious issues of rape and racial inequality.",
    authors: "Harper Lee",
    favorite: true,
    fileCover: "mockingbird_cover.jpg",
    fileName: "to_kill_a_mockingbird.pdf",
  },
  {
    id: "2",
    title: "1984",
    description:
      "A dystopian novel that delves into the dangers of totalitarianism.",
    authors: "George Orwell",
    favorite: true,
    fileCover: "1984_cover.jpg",
    fileName: "1984.pdf",
  },
  {
    id: "3",
    title: "The Great Gatsby",
    description: "A critique of the American Dream set in the Jazz Age.",
    authors: "F. Scott Fitzgerald",
    favorite: true,
    fileCover: "great_gatsby_cover.jpg",
    fileName: "the_great_gatsby.pdf",
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    description:
      "A romantic novel that also critiques the British landed gentry.",
    authors: "Jane Austen",
    favorite: true,
    fileCover: "pride_and_prejudice_cover.jpg",
    fileName: "pride_and_prejudice.pdf",
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    description:
      "A novel that explores themes of teenage angst and alienation.",
    authors: "J.D. Salinger",
    favorite: true,
    fileCover: "catcher_in_the_rye_cover.jpg",
    fileName: "the_catcher_in_the_rye.pdf",
  },
  {
    id: "6",
    title: "Brave New World",
    description:
      "A novel that explores a future dystopian society shaped by technology.",
    authors: "Aldous Huxley",
    favorite: true,
    fileCover: "brave_new_world_cover.jpg",
    fileName: "brave_new_world.pdf",
  },
  {
    id: "7",
    title: "Moby Dick",
    description: "An epic tale of the hunt for a giant white whale.",
    authors: "Herman Melville",
    favorite: false,
    fileCover: "moby_dick_cover.jpg",
    fileName: "moby_dick.pdf",
  },
  {
    id: "8",
    title: "War and Peace",
    description:
      "A historical novel that interweaves the lives of several families during the Napoleonic Wars.",
    authors: "Leo Tolstoy",
    favorite: true,
    fileCover: "war_and_peace_cover.jpg",
    fileName: "war_and_peace.pdf",
  },
  {
    id: "9",
    title: "The Lord of the Rings",
    description:
      "An epic high-fantasy novel about the struggle to destroy a powerful ring.",
    authors: "J.R.R. Tolkien",
    favorite: false,
    fileCover: "lotr_cover.jpg",
    fileName: "the_lord_of_the_rings.pdf",
  },
  {
    id: "10",
    title: "The Alchemist",
    description:
      "A philosophical book that deals with the journey of self-discovery.",
    authors: "Paolo Coelio",
    favorite: true,
    fileCover: "alchemist_cover.jpg",
    fileName: "the_alchemist.pdf",
  },
];

const app = express();
app.use(express.json());

app.get("/api/books", (request, response) => {
  response.status(200).json(library);
});

app.get("/api/books/:id", (request, response) => {
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

app.post("/api/user/login", (request, response) => {
  response.status(200).json({ id: 1, mail: "test@mail.ru" });
});

app.post("/api/books", (request, response) => {
  const { body } = request;
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
  response
    .status(200)
    .json({ message: "Книга была успешно добавлена" })
    .json(newBook);
});

app.delete("/api/books/:id", (request, response) => {
  const {
    params: { id },
  } = request;

  const foundBookIndex = library.findIndex((book) => book.id === id);

  if (foundBookIndex !== -1) {
    library.splice(foundBookIndex, 1);
    response.json({ message: `Книга с id ${id} удалена` });
  } else {
    response.json({ message: `Не удалось найти книгу с id ${id}` });
  }
});

app.put("/api/books/:id", (request, response) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    request.body;

  const {
    params: { id },
  } = request;

  const bookIndex = library.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
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
  }

  return response.status(404).json({ error: "Не удалось обновить книгу" });
});

app.listen(PORT);
