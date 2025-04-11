import { createContext, useRef, useState, useEffect } from "react";
import { MdNetworkWifi } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { BsCpu } from "react-icons/bs";
import { LuHardDrive } from "react-icons/lu";
import { GrSystem } from "react-icons/gr";

// Definisikan tipe context (jika pakai TypeScript)
const defaultValue = {
  showTask: [],
  showTaskRights: [],
  setActiveTaskId: () => null,
  activeTaskId: null,
  handleShowTask: () => null,
  addTask: () => {},
  addTaskRight: () => {},
  label: [],
  cpuLimit: [],
  uploadLimit: [],
  dowloadLimit: [],
};

const SistemContext = createContext(defaultValue);

const SistemProvider = ({ children }) => {
  const [showTask, setShowTask] = useState([
    { id: 1, task: "Cpu", icon: <BsCpu /> },
    { id: 2, task: "Network", icon: <MdNetworkWifi /> },
    { id: 3, task: "Memory", icon: <LuHardDrive /> },
    { id: 4, task: "sistem info", icon: <GrSystem /> },
  ]);

  const [showTaskRights, setShowTaskRights] = useState([
    { id: 1, task: "Home", icon: <FaHome /> },
  ]);

  const [activeTaskId, setActiveTaskId] = useState(null); // State untuk ID task yang aktif(page yang aktive)

  // Fungsi untuk menambahkan task baru
  const addTask = (task) => {
    setShowTask((prev) => [...prev, { id: showTask.length + 1, task }]);
    //gunakan seperti () => addTask("Network")
  };
  const addTaskRight = (task) => {
    setShowTaskRights((prev) => [...prev, { id: showTask.length + 1, task }]);
    //gunakan seperti () => addTask("Network")
  };

  //----------[ real-time data usage]-------
  //--------cpu
  const [cpuLimit, setCpuLimit] = useState([]);
  const [label, setLabels] = useState([]);

  //--------Network
  const [dowloadLimit, setDownloadLimit] = useState([]);
  const [uploadLimit, setUploadLimit] = useState([]);

  //useRef untuk Menghindari Penumpukan Timeout yang Tidak Dihapus
  // useRef untuk menyimpan EventSource agar tidak membuat koneksi baru
  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (!activeTaskId) return; // Jika tidak ada task aktif, hentikan

    // Pastikan menutup koneksi lama sebelum membuka yang baru
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // ubah ke /evwnt jika ke mode production
    eventSourceRef.current = new EventSource("http://127.0.0.1:5000/event");

    eventSourceRef.current.onopen = () =>
      console.log("🔗 Terhubung ke EventSource");

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const timestamp = new Date().toLocaleTimeString();

      if (activeTaskId === 1) {
        // CPU Monitoring
        setCpuLimit((prev) => [
          ...prev.slice(-9),
          parseFloat(data.persentase_cpu),
        ]);
        setLabels((prev) => [...prev.slice(-9), timestamp]);
      } else if (activeTaskId === 2) {
        // Network Monitoring
        setDownloadLimit((prev) => [
          ...prev.slice(-9),
          parseFloat(data.persentase_network.download),
        ]);
        setUploadLimit((prev) => [
          ...prev.slice(-9),
          parseFloat(data.persentase_network.upload),
        ]);
      }
    };

    eventSourceRef.current.onerror = (err) => {
      console.error("❌ Terjadi error pada EventSource", err);
      eventSourceRef.current.close();
    };

    return () => {
      if (eventSourceRef.current) {
        console.log("🔌 EventSource ditutup");
        eventSourceRef.current.close();
      }
    };
  }, [activeTaskId]);

  return (
    <SistemContext.Provider
      value={{
        showTask,
        showTaskRights,
        addTask,
        addTaskRight,
        activeTaskId,
        setActiveTaskId,
        label,
        cpuLimit,
        dowloadLimit,
        uploadLimit,
      }}
    >
      {children}
    </SistemContext.Provider>
  );
};

export { SistemProvider, SistemContext };
