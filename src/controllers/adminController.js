import { scrapeBooks } from "../services/scraperService.js";
import { Book } from "../models/Book.js";
import axios from "axios";
import { writeCSV } from "../utils/csv.js";

export async function importBooks(req, res, next) {
  try {
    const data = await scrapeBooks(req.body.url);
    await Book.insertMany(data);
    res.json({ inserted: data.length });
  } catch (err) {
    next(err);
  }
}

export async function fetchAndStore(req, res, next) {
  try {
    const { data } = await axios.get("https://openlibrary.org/search.json?q=the+lord+of+the+rings");
    const books = data.docs.map((doc) => ({
      title: doc.title,
      author: doc.author_name ? doc.author_name[0] : "Unknown"
      }));
      await Book.insertMany(books);
      res.json({ inserted: books.length });
  } catch (err) {
    next(err);
  }
}

export async function exportBooks(req, res, next) {
  try {
    const books = await Book.find().lean();

    await writeCSV("books.csv", books, [
      { id: "title", title: "TITLE" },
      { id: "author", title: "AUTHOR" }
    ]);

    res.send("CSV Generated");
  } catch (err) {
    next(err);
  }
}