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
import { useSistem } from "../sistemContextManagement/useContexts";

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
const options = {
  responsive: true,
  maintainAspectRatio: true,
  animation: {
    duration: 500,
    easing: "easeInOutQuad",
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
  elements: {
    line: {
      tension: 0.4, // ⚠️ Ini bikin garis lebih smooth, bukan kaku
      borderWidth: 3,
    },
    point: {
      radius: 0, // titik data dihilangkan biar lebih clean
      hoverRadius: 5,
      hitRadius: 5,
    },
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#fff", // Warna teks legend (ubah sesuai tema kamu)
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#333",
      titleColor: "#fff",
      bodyColor: "#ddd",
      cornerRadius: 5,
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
      ticks: {
        color: "#aaa",
      },
    },
    y: {
      display: true,
      grid: {
        color: "rgba(255,255,255,0.05)",
      },
      ticks: {
        color: "#aaa",
        callback: (value) => `${value} Mbps`, // contoh: tampilkan satuan Mbps
      },
    },
  },
};

const NetworkTraffic = () => {
  const { dowloadLimit, uploadLimit } = useSistem();

  const data = {
    labels: Array.from({ length: dowloadLimit.length }, (_, i) => `T${i + 1}`),
    datasets: [
      {
        label: "Download",
        data: dowloadLimit,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Upload",
        data: uploadLimit,
        borderColor: "rgba(32, 173, 19, 1)",
        backgroundColor: "rgba(32, 173, 19, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default NetworkTraffic;
