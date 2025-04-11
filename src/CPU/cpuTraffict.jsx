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
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  maintainAspectRatio: false, // 🔥 Hindari rasio tetap agar lebih fleksibel | grafict mengikuti ukuran perrenta nya

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
  // const [cpuLimit, setCpuLimit] = useState([]);
  // const [label, setLabels] = useState([]);

  // useEffect(() => {
  //   // saat masa produksi nanti ubah ke /event-cpu saja
  //   const cpuEventSource = new EventSource("http://127.0.0.1:5000/event-cpu");

  //   cpuEventSource.onopen = () => {
  //     console.log(" terhubung ...");
  //   };
  //   cpuEventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     const newData = parseFloat(data.persentase_cpu);

  //     const timestamp = new Date().toLocaleTimeString();

  //     setCpuLimit((prev) => [...prev.slice(-9), newData]);
  //     setLabels((prev) => [...prev.slice(-9), timestamp]);
  //   };

  //   cpuEventSource.onerror = (err) => {
  //     console.error("terjadi erro", err);
  //     cpuEventSource.close();
  //   };
  // });

  const { label, cpuLimit } = useSistem();

  const data = {
    // labels : cpuLabels, dapatkan dari state
    labels: label,
    datasets: [
      {
        label: "cpu usage {:%}",
        // data:cpudata, dapatka dari state
        data: cpuLimit,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default CpuTraffict;
