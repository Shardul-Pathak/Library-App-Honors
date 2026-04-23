import { Borrow } from "../models/Borrow.js";
import { Book } from "../models/Book.js";
import { User } from "../models/User.js";
import { sendEmail } from "./emailService.js";
import { broadcast } from "../config/ws.js";

export async function borrowBookService(userId, bookId) {
  const book = await Book.findById(bookId);
  if (!book || !book.available) throw new Error("Unavailable");

  book.available = false;
  await book.save();

  const record = await Borrow.create({
    user: userId,
    book: bookId,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  const user = await User.findById(userId);
  if (user?.email) {
    await sendEmail(user.email, "Book Issued", "You borrowed a book");
  }

  broadcast({ type: "BOOK_BORROWED", bookId });

  return record;
}

export async function returnBookService(borrowId) {
  const record = await Borrow.findById(borrowId);
  if (!record) throw new Error("Not found");

  record.returned = true;
  await record.save();

  const book = await Book.findById(record.book);
  if (book) {
    book.available = true;
    await book.save();
  }

  broadcast({ type: "BOOK_RETURNED", bookId: record.book });

  return true;
}