import {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook
} from "../services/bookService.js";

export async function createBookController(req, res, next) {
  try {
    const data = {
      ...req.body,
      cover: req.file?.path
    };

    const book = await createBook(data);
    res.json(book);
  } catch (err) {
    next(err);
  }
}

export async function getBooksController(req, res, next) {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (err) {
    next(err);
  }
}

export async function updateBookController(req, res, next) {
  try {
    const data = {
      ...req.body
    };

    if (req.file) {
      data.cover = req.file.path;
    }

    const book = await updateBook(req.params.id, data);
    res.json(book);
  } catch (err) {
    next(err);
  }
}

export async function deleteBookController(req, res, next) {
  try {
    await deleteBook(req.params.id);
    res.send("Deleted");
  } catch (err) {
    next(err);
  }
}