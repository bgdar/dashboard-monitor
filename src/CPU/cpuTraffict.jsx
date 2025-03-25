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
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const data = {
  // labels : cpuLabels, dapatkan dari state
  labels: Array.from({ length: 20 }, (_, i) => i + 1),
  datasets: [
    {
      label: "cpu usage {:%}",
      // data:cpudata, dapatka dari state
      data: Array.from({ length: 50 }, () => Math.random() * 100), // Nilai acak antara 0-100
      borderColor: "red",
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      borderWidth: 2,
      fill: true,
    },
  ],
};
const options = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Waktu (detik)",
      },
    },
    y: {
      beginAtZero: true,
      max: 100,
      title: {
        display: true,
        text: "CPU Usage (%)",
      },
    },
  },
};

const CpuTraffict = () => {
  return <Line data={data} options={options} />;
};

export default CpuTraffict;
