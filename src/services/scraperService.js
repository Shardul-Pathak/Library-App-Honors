import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeBooks(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  const books = [];

  $(".book").each((i, el) => {
    books.push({
      title: $(el).find(".title").text()
    });
  });

  return books;
}