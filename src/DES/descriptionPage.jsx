// buat component descripti yang melayang di sebelah kanan denagn ukuran sama seperti navigasi
// - kiri navigasi   dan - kanan descripsi
import { useState } from "react";
import "./description.css";
import { BiSolidLeftArrow, BiSolidTagAlt } from "react-icons/bi";
import { MdOutlineHelp } from "react-icons/md";
const Descripsi = () => {
  const [showDes, setShowDes] = useState(false);

  const handleShowDes = () => {
    setShowDes((prev) => !prev);
  };

  return (
    <div>
      <button
        className="button button-des"
        style={{ width: `${showDes ? "22vw" : ""}` }}
        type="button"
        onClick={handleShowDes}
        aria-expanded={showDes}
      >
        {showDes ? <BiSolidLeftArrow /> : <MdOutlineHelp />}
      </button>

      <section id="section-des" className={`${showDes ? "show" : "close"}`}>
        {showDes ? (
          <p>
            Click key <strong>n</strong> untuk membuka navbar
          </p>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default Descripsi;
