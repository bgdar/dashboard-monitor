//import { useEffect } from "react";
import { useState } from "react";
import { useSistem } from "../sistemContextManagement/useContexts";
import "./network.css";
import NetworkTraffic from "./networkTraffict";

const NetworkPage = () => {
  // //ambil data network yang dikirimkan server
  // useEffect(()=>{

  // },[])

  const [infoNet, setInfoNet] = useState("");
  const { dowloadLimit, uploadLimit } = useSistem();

  if (dowloadLimit == "0" && uploadLimit == "0") {
    setInfoNet("tidak ada interface yang aktiv");
  }

  return (
    <section id="section-net">
      <div className="section-net">
        <NetworkTraffic />
      </div>

      <div className="net-descripsion">
        {infoNet.length > 0 ? (
          <div
            className="section-net-info"
            style={{ backgroundColor: "rgb(195, 38, 38)" }}
          >
            {infoNet}
          </div>
        ) : (
          <div
            className="section-net-info"
            style={{ backgroundColor: "rgb(9, 120, 9)" }}
          >
            {`Download Limit: ${dowloadLimit} Upload Limit: ${uploadLimit}`}
          </div>
        )}
      </div>
    </section>
  );
};

export default NetworkPage;
