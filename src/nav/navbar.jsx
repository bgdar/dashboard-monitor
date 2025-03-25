import "./nav.css";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSistem } from "../sistem/useSistem";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const handleShowNav = () => {
    setShowNav(!showNav);
  };
  const { showTask, setActiveTaskId } = useSistem();

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "n") {
        console.log("tombol n di tekan");
        setShowNav(!showNav);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    //untuk menghapus eventListener saat depedesi berubah
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [showNav]);

  return (
    <nav
      style={{
        height: `${showNav ? "100vh" : "50px"}`,
      }}
    >
      <button
        className="button button-nav "
        onClick={handleShowNav}
        type="button"
      >
        {showNav ? <FaArrowAltCircleRight /> : <AiOutlineMenuUnfold />}
      </button>
      <ul>
        {showTask.map((task) => (
          <li
            key={task.id}
            title={task.task}
            onClick={() => setActiveTaskId(task.id)}
          >
            {task.icon}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
