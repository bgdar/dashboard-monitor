import http from "http";
import fs from "fs";
import path from "path";

// ----------------[variable]--------------------------------
const PORT: number = 5000;
const pages: Record<string, string> = {
  dashboard: "/",
  about: "/about",
  contact: "/contact",
};

// --------------[main server]--------------------------------
const server = http.createServer((req, res) => {
  //dapatkan semua kunci dan find kunci yang di cari sesuai dengan url
  const page = Object.keys(pages).find((page) => req.url == pages[page]);

  if (page) {
    res.writeHead(200, { "content-type": "text/html" });
    //kirim halaman web nya
    read_file_page(page, (data) => {
      res.end(data);
    });
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    read_file_page("404", (data) => {
      res.end(data);
    });
  }
});

server.listen(PORT, () => {
  console.log("serever running http://127.0.0.1:" + PORT);
});

//-------------[handle function]--------------------------------
function read_file_page(name_file: string, callback: (path: string) => void) {
  fs.readFile(
    path.join(__dirname, "pages/" + name_file + ".html"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("pages tidak ditemukan ", err);
        callback("");
      } else {
        callback(data);
      }
    }
  );
}
