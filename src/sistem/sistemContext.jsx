import { createContext, useRef, useState, useEffect } from "react";
import { MdNetworkWifi } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { BsCpu } from "react-icons/bs";
import { LuHardDrive } from "react-icons/lu";

// Definisikan tipe context (jika pakai TypeScript)
const defaultValue = {
  showTask: [],
  showTaskRights: [],
  setActiveTaskId: () => null,
  activeTaskId: null,
  handleShowTask: () => null,
  addTask: () => {},
  addTaskRight: () => {},
  cpuLimit: [],
  label: [],
};

const SistemContext = createContext(defaultValue);

const SistemProvider = ({ children }) => {
  const [showTask, setShowTask] = useState([
    { id: 1, task: "Cpu", icon: <BsCpu /> },
    { id: 2, task: "Network", icon: <MdNetworkWifi /> },
    { id: 3, task: "Memory", icon: <LuHardDrive /> },
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
  const [cpuLimit, setCpuLimit] = useState([]);
  const [label, setLabels] = useState([]);

  //useRef untuk Menghindari Penumpukan Timeout yang Tidak Dihapus
  const eventSourceRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const startEventSource = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close(); // Tutup EventSource lama sebelum membuat yang baru
      }

      const cpuEventSource = new EventSource("http://127.0.0.1:5000/event-cpu");
      eventSourceRef.current = cpuEventSource; // Simpan referensi EventSource

      cpuEventSource.onopen = () => {
        console.log("Terhubung...");
      };

      cpuEventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const newData = parseFloat(data.persentase_cpu);
        const timestamp = new Date().toLocaleTimeString();

        setCpuLimit((prev) => [...prev.slice(-9), newData]);
        setLabels((prev) => [...prev.slice(-9), timestamp]);
      };

      cpuEventSource.onerror = (err) => {
        console.error("Terjadi error", err);
        cpuEventSource.close();
      };
    };

    if (activeTaskId === 1) {
      startEventSource();
    } else {
      // Jika bukan CPU, tunggu 5 detik sebelum menutup koneksi
      timeoutRef.current = setTimeout(() => {
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
          console.log("EventSource dihentikan karena tidak aktif");
        }
      }, 5000);
    }

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
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
      }}
    >
      {children}
    </SistemContext.Provider>
  );
};

export { SistemProvider, SistemContext };
