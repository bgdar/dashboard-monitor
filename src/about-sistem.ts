import os from "os";

// mengambil data dari sistem
class Sistem {
  #platform = os.platform();

  //CPU property

  private cpu = os.cpus();

  model_cpu(): string {
    return this.cpu[0].model;
  }
  persentase_cpu() {
    let cpu = this.cpu;
    //cpu.forEach((value) => {});
  }
}
