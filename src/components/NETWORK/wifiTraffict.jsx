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
} from "chart.js";
Chart.register(
  CategoryScale, // Skala kategori untuk sumbu X
  LinearScale, // Skala linier untuk sumbu Y
  PointElement, // Titik data pada grafik
  LineElement, // Garis pada grafik
  Title, // Judul grafik
  Tooltip, // Tooltip saat hover
  Legend // Legenda untuk menjelaskan warna garis
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
      borderWidth: 2, // Ketebalan garis
      fill: false, // Tidak mengisi area di bawah garis
    },
    {
      label: "Data 2", // Nama dataset kedua
      data: Array.from({ length: 50 }, () => Math.random() * 100), // Nilai acak
      borderColor: "rgba(75, 192, 192, 1)", // Warna hijau
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Data 3", // Nama dataset ketiga
      data: Array.from({ length: 50 }, () => Math.random() * 100),
      borderColor: "rgba(255, 206, 86, 1)", // Warna kuning
      backgroundColor: "rgba(255, 206, 86, 0.2)",
      borderWidth: 2,
      fill: false,
    },
    {
      label: "Data 4", // Nama dataset keempat
      data: Array.from({ length: 50 }, () => Math.random() * 100),
      borderColor: "rgba(255, 99, 132, 1)", // Warna merah
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderWidth: 2,
      fill: false,
    },
  ],
};

// 🔹 Opsi konfigurasi grafik
const options = {
  responsive: true, // Grafik akan menyesuaikan ukuran layar
  plugins: {
    legend: { display: false }, // Sembunyikan legenda (jika ingin terlihat, ubah menjadi `true`)
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
