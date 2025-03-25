import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
Chart.register(
  CategoryScale, // Skala kategori untuk sumbu X
  LinearScale, // Skala linier untuk sumbu Y
  PointElement, // Titik data pada grafik
  LineElement, // Garis pada grafik
  Title, // Judul grafik
  Tooltip, // Tooltip saat hover
  Legend, // Legenda untuk menjelaskan warna garis
  Filler
);
// 🔹 Data untuk grafik
const data = {
  // Label pada sumbu X (dalam kasus ini, hanya angka dari 1 sampai 50)
  labels: Array.from({ length: 50 }, (_, i) => i + 1),

  // Dataset untuk setiap garis yang akan ditampilkan
  datasets: [
    {
      label: "Data 1", // Nama dataset pertama
      data: Array.from({ length: 50 }, () => Math.random() * 100), // Nilai acak antara 0-100
      borderColor: "rgba(54, 162, 235, 1)", // Warna biru
      backgroundColor: "rgba(54, 162, 235, 0.2)", // Warna latar belakang (tidak digunakan karena fill: false)
      borderWidth: 3, // Ketebalan garis
      fill: false, // Tidak mengisi area di bawah garis
    },
    // {
    //   label: "Data 2", // Nama dataset kedua
    //   data: Array.from({ length: 50 }, () => Math.random() * 100), // Nilai acak
    //   borderColor: "rgba(75, 192, 192, 1)", // Warna hijau
    //   backgroundColor: "rgba(75, 192, 192, 0.2)",
    //   borderWidth: 2,
    //   fill: false,
    // }
  ],
};

// 🔹 Opsi konfigurasi grafik
const options = {
  responsive: true, // Grafik akan menyesuaikan ukuran layar
  plugins: {
    legend: { display: true }, // Sembunyikan legenda (jika ingin terlihat, ubah menjadi `true`)
    title: { display: false }, // Sembunyikan judul
  },
  scales: {
    x: { display: false }, // Sembunyikan label sumbu X
    y: { display: false }, // Sembunyikan label sumbu Y
  },
};

const WifiTraffic = () => {
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default WifiTraffic;
