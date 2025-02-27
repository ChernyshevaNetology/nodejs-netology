import express from "express";
import booksRouter from "./routes.js";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 8000;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "images")));

app.use(express.json());
app.use(booksRouter);

console.log(`Server is running on port ${PORT}`);

app.listen(PORT);
