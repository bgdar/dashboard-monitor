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
  async persentase_network(): Promise<{
    download: string;
    upload: string;
  }> {
    const allStats = await systemInformation.networkStats();

    // Filter interface yang aktif dan bukan loopback
    const filtered = allStats.find(
      (iface) => iface.iface !== "lo" && iface.operstate === "up"
    );

    if (!filtered) {
      return {
        download: "0",
        upload: "0",
      };
    }

    return {
      download: ((filtered.rx_sec * 8) / 1_000_000).toFixed(2), // Mbps
      upload: ((filtered.tx_sec * 8) / 1_000_000).toFixed(2), // Mbps
    };
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
