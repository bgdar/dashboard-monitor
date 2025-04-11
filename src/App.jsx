import "./App.css";
import { useSistem } from "./sistemContextManagement/useContexts";
import Navbar from "./nav/navbar";
import Descripsi from "./des/descriptionPage";

import CpuPage from "./CPU/cpuPage";
import NetworkPage from "./NETWORK/networkPage";

import HomePage from "./home/homePage";
import MemoryPage from "./memory/memoryPage";

import SystemInfo from "./systemInfo/systemInfoPage";

function App() {
  const { activeTaskId } = useSistem();

  return (
    <div className="container-App">
      <Navbar />
      {/* Menampilkan halaman berdasarkan task yang aktif */}
      {activeTaskId === 1 && <CpuPage />}
      {activeTaskId === 2 && <NetworkPage />}
      {activeTaskId === 3 && <MemoryPage />}
      {activeTaskId === 4 && <SystemInfo />}
      {activeTaskId == null && <HomePage />}

      <Descripsi />
    </div>
  );
}

export default App;
