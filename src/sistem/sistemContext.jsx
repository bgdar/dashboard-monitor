import { createContext, useState } from "react";
import { MdNetworkWifi } from "react-icons/md";
import { BsCpu } from "react-icons/bs";
// Definisikan tipe context (jika pakai TypeScript)
const defaultValue = {
  showTask: [],
  setActiveTaskId: () => null,
  activeTaskId: null,
  handleShowTask: () => null,
  addTask: () => {},
};

const SistemContext = createContext(defaultValue);

const SistemProvider = ({ children }) => {
  const [showTask, setShowTask] = useState([
    { id: 1, task: "Cpu", icon: <BsCpu /> },
    { id: 2, task: "Network", icon: <MdNetworkWifi /> },
  ]);

  const [activeTaskId, setActiveTaskId] = useState(null); // State untuk ID task yang aktif

  // Fungsi untuk menambahkan task baru
  const addTask = (task) => {
    //id: crypto.randomUUID() agar id menjadi unik
    setShowTask((prev) => [...prev, { id: showTask.length + 1, task }]);
    //gunakan seperti () => addTask("Network")
  };

  return (
    <SistemContext.Provider
      value={{ showTask, addTask, activeTaskId, setActiveTaskId }}
    >
      {children}
    </SistemContext.Provider>
  );
};

export { SistemProvider, SistemContext };
