import "./App.css";
import { useSistem } from "./sistem/useSistem";
import Navbar from "./components/nav/navbar";
import CpuPage from "./components/CPU/cpuPage";
import NetworkPage from "./components/NETWORK/networkPage";

function App() {
  const { activeTaskId } = useSistem();

  return (
    <div className="container-App">
      <Navbar />
      {/* Menampilkan halaman berdasarkan task yang aktif */}
      {activeTaskId === 1 && <CpuPage />}
      {activeTaskId === 2 && <NetworkPage />}

      {/* {showTask
        .filter((task) => task.id === activeTaskId) // Hanya task yang dipilih yang ditampilkan
        .map((task) => (
          <div key={task.id}>
            {task.task === "CPU" && <CpuPage />}
            {task.task === "NETWORK" && <div>Network Page</div>}
            <p>Task aktif: {task.task}</p>
          </div>
))} */}
    </div>
  );
}

export default App;
