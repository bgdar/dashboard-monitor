import { createContext } from "react";
import { useEffect, useState } from "react";

const defaultContext = {
  systemInfo: {},
  memoryInfo: {},
  platform: String,
  isLoading: false,
};

const JsonContext = createContext(defaultContext);
const JsonProvider = ({ children }) => {
  //-----------[json data]--------------------------------
  const [platform, setPlatform] = useState(null);
  const [systemInfo, setSystemInfo] = useState({});
  const [memoryInfo, setMemoryInfo] = useState({});
  const [isLoading, setIsloading] = useState(false); //

  // platform: SISTEM.platfrom,
  // system_info:SISTEM.system_info(),
  // memory_info:SISTEM.memori_info(),
  useEffect(() => {
    fetch("http://127.0.0.1:5000/data_json") // Ganti URL dengan server-mu
      .then((response) => response.json())
      .then((data) => {
        setPlatform(data.platfrom);
        setMemoryInfo(data.system_info);
        setSystemInfo(data.memory_info);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setPlatform({});
        setMemoryInfo({});
        setSystemInfo({});
      })
      .finally(() => {
        setIsloading(false); // Set loading ke false setelah data diambil
      });
  }, []);
  return (
    <JsonContext.Provider
      value={{ isLoading, platform, systemInfo, memoryInfo }}
    >
      {children}
    </JsonContext.Provider>
  );
};
export { JsonContext, JsonProvider };
