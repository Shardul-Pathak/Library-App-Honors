import { createObjectCsvWriter } from "csv-writer";

export async function writeCSV(path, data, headers) {
  const writer = createObjectCsvWriter({
    path,
    header: headers
  });

  await writer.writeRecords(data);
}