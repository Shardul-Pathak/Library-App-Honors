import {
  borrowBookService,
  returnBookService
} from "../services/borrowService.js";

export async function borrowBook(req, res, next) {
  try {
    const data = await borrowBookService(req.user.id, req.body.bookId);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function returnBook(req, res, next) {
  try {
    await returnBookService(req.body.borrowId);
    res.send("Returned");
  } catch (err) {
    next(err);
  }
}