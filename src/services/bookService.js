import { Book } from "../models/Book.js";

export function createBook(data) {
  return Book.create(data);
}

export function getAllBooks() {
  return Book.find();
}

export function updateBook(id, data) {
  return Book.findByIdAndUpdate(id, data, { new: true });
}

export function deleteBook(id) {
  return Book.findByIdAndDelete(id);
}