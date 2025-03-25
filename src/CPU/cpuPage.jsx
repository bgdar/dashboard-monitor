//import { useEffect } from "react";
import CpuTraffict from "./cpuTraffict";
import "./cpu.css";

const CpuPage = () => {
  // kirimkan prop ke cpu
  // const [cpuData, setCpuData] = useState([]);
  // const [cpuLabels, setCpuLabels] = useState([]);

  //useEffect(() => {});

  return (
    <section id="section-cpu">
      <div className="cpu-component">
        <CpuTraffict />
      </div>
    </section>
  );
};

export default CpuPage;
