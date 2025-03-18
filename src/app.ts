import http from "http";
import fs from "fs";

const pages: Record<string, string> = {
  dasboard: "/",
  about: "/about",
  contact: "/contact",
};
const server = http.createServer((req, res) => {
  for (const page in pages) {
    if (req.url == pages[page]) {
      res.writeHead(200, { "content-type": "text/html" });

      //kirim halaman web nya
      res.end(read_file(page));
    }
  }
});

function read_file(name_file: string) {
  fs.readFile(name_file, (err, data) => {
    if (err) {
      console.error("terjadi error saat membaca page ", err);
    }
    return data;
  });
}
