//import { useEffect } from "react";
import "./network.css";
import WifiTraffic from "./wifiTraffict";

const NetworkPage = () => {
  // //ambil data network yang dikirimkan server
  // useEffect(()=>{

  // },[])

  return (
    <div id="section-net">
      <div className="section-net-wifi">
        <WifiTraffic />
      </div>
    </div>
  );
};

export default NetworkPage;
