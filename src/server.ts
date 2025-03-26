import http from "http";
import fs from "fs";
import path from "path";

import Sistem from "./about-sistem";
const PORT: number = 5000;

// --------------[main server]--------------------------------
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "content-type": "text/html" });
    //home page
    read_file_page("home", (data) => {
      res.end(data);
    });
    //halaman yang di kirimkan
  } else if (req.url == "/dashboard") {
    res.writeHead(200, { "content-type": "text/html" });

    read_file_page("dashboard", (data) => {
      res.end(data);
    });
    //-------- real time path ------------------------------
  } else if (req.url == "/event-cpu") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      // gunakan properti ini saat masa dev ( frontend dan backend berbeda server)
      "Access-Control-Allow-Origin": "*", // ✅ Izinkan semua origin
      "Access-Control-Allow-Methods": "GET", // ✅ Izinkan metode GET
    });
    res.flushHeaders(); //  Pastikan header dikirim sebelum data SSE

    const interval = setInterval(async () => {
      const data = await data_cpu();
      res.write(`data: ${JSON.stringify(data)}\n\n`); // Format SSE

      //kirim dan sleep 1 second
    }, 1000);

    req.on("close", () => {
      clearInterval(interval); // Hentikan interval saat koneksi ditutup
      res.end();
    });
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    //kirim halaman web nya
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(PORT, () => {
  console.log("serever running http://127.0.0.1:" + PORT);
});

//-------------[handle ]--------------------------------
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
const SISTEM = new Sistem();

type data_sistem_type = {
  platform: string;
};
const data_sistem_dasboard = (): data_sistem_type => {
  return {
    platform: SISTEM.platfrom,
  };
};

//return object data yang kan di kirim
const data_cpu = async (): Promise<{ persentase_cpu: string }> => {
  const cpuUsage = await SISTEM.persentase_cpu(); // ✅ Tunggu hasil Promise
  return {
    persentase_cpu: cpuUsage,
  };
};
