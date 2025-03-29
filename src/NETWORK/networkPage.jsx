//import { useEffect } from "react";
import "./network.css";
import NetworkTraffic from "./networkTraffict";

const NetworkPage = () => {
  // //ambil data network yang dikirimkan server
  // useEffect(()=>{

  // },[])

  return (
    <section id="section-net">
      <div className="section-net-wifi">
        <NetworkTraffic />
      </div>
    </section>
  );
};

export default NetworkPage;
