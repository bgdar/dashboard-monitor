import http from "http";
import fs from "fs";
import path from "path";

import Sistem from "./about-sistem";
const PORT: number = 5000;

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "content-type": "text/html" });

    read_file_page("dashboard", (data) => {
      res.end(data);
    });
    // --------------data json------------------------------
  } else if (req.url == "/data_json") {
    res.setHeader("Access-Control-Allow-Origin", "*"); // ✅ Izinkan semua domain
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // ✅ Metode yang diperbolehkan
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // ✅ Header yang diperbolehkan

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(data_sistem()));

    //-------- data real time path ------------------------------
  } else if (req.url == "/event") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      //gunakan di mode development aja
      "Access-Control-Allow-Origin": "*", // ✅ Izinkan semua origin
      "Access-Control-Allow-Methods": "GET", // ✅ Izinkan metode GET
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    });
    res.flushHeaders(); //  Pastikan header dikirim sebelum data SSE

    const interval = setInterval(async () => {
      const data = await dataRealTime();
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
  system_info: {
    asitekture_cpu: string;
    version_os: string;
    mechin_used: string;
  };
  memory_info: {
    total_ram: number;
    ram_availebel: number;
    memory_usage: number;
  };
};
const data_sistem = (): data_sistem_type => {
  return {
    platform: SISTEM.platfrom,
    system_info: SISTEM.system_info(),
    memory_info: SISTEM.memori_info(),
  };
};

//return object data yang kan di kirim
const dataRealTime = async (): Promise<{
  persentase_cpu: string;
  persentase_network: { download: string; upload: string };
}> => {
  const cpuUsage = await SISTEM.persentase_cpu(); // ✅ Tunggu hasil Promise
  const network_info = await SISTEM.persentase_network();
  return {
    persentase_cpu: cpuUsage,
    persentase_network: network_info,
  };
};
