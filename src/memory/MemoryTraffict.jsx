import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        font: { size: 14 },
        color: "#333",
      },
    },
  },
  animation: {
    animateRotate: true,
    animateScale: true,
  },
};

const MemoryTraffict = () => {
  const data = {
    labels: ["Used Memory", "Free Memory", "Cached Memory", "Buffer Memory"],
    datasets: [
      {
        //ganti dengan label yang di dapat dari server
        data: [5120, 8192, 2048, 1024], // Contoh dalam MB
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"],
        hoverBackgroundColor: ["#ff4d6b", "#2a94d6", "#ffb100", "#3aa9a9"],
        borderWidth: 2,
      },
    ],
  };
  return (
    <>
      <Doughnut data={data} options={options} />;
    </>
  );
};
export default MemoryTraffict;
