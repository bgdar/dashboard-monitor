import os from "os";
import systemInformation from "systeminformation";

class Sistem {
  platfrom = os.platform();
  // Method untuk mendapatkan model CPU

  //--------------[CPU]
  model_cpu(): string {
    return os.cpus()[0].model;
  }
  // Method untuk mendapatkan persentase CPU (dengan Promise)
  async persentase_cpu(): Promise<string> {
    return new Promise((resolve) => {
      const cpu1 = os.cpus(); // Ambil data CPU awal
      setTimeout(() => {
        const cpu2 = os.cpus(); // Ambil data CPU setelah 100ms
        let idleDiff = 0;
        let totalDiff = 0;

        if (!cpu1 || !cpu2 || cpu1.length !== cpu2.length) {
          console.error("Data CPU tidak valid!");
          return resolve("Error");
        }

        cpu1.forEach((cpu, index) => {
          const cpu2Times = cpu2[index].times;
          const idle1 = cpu.times.idle;
          const idle2 = cpu2Times.idle;

          const total1 = Object.values(cpu.times).reduce(
            (acc, val) => acc + val,
            0
          );
          const total2 = Object.values(cpu2Times).reduce(
            (acc, val) => acc + val,
            0
          );

          idleDiff += idle2 - idle1;
          totalDiff += total2 - total1;
        });

        const cpuUsage = 100 - (idleDiff / totalDiff) * 100;
        resolve(cpuUsage.toFixed(2)); // Format ke 2 decimal
      }, 100);
    });
  }

  //----------[System informasi]----------
  async persentase_network() {
    const stats = await systemInformation.networkStats();
    const data = {
      download: (stats[0].rx_sec / 1024 / 1024).toFixed(2), // MB/s
      upload: (stats[0].tx_sec / 1024 / 1024).toFixed(2), // MB/s
    };
    if (stats.length === 0) {
      console.log("⚠️ Tidak ada jaringan yang aktif!");
      data.download = "tidak ada jaringan yang aktif";
      data.upload = "tidak ada jaringan yang aktif";
    }
    return data;
  }
  //----------[memory]----------
  memori_info() {
    `return Object dalam nilai MB`;
    const total_ram = os.totalmem() / 1024 / 1024;
    const ram_availebel = os.freemem() / 1024 / 1024;
    const memory_usage = os.freemem() - os.totalmem() / 1024 / 1024;

    return {
      total_ram: total_ram,
      ram_availebel: ram_availebel,
      memory_usage: memory_usage,
    };
  }

  //----------[Network]----------
  system_info() {
    return {
      asitekture_cpu: os.arch(),
      version_os: os.version(),
      mechin_used: os.machine(),
    };
  }
}

export default Sistem;
