import "./nav.css";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaArrowAltCircleLeft } from "react-icons/fa";

import { useState } from "react";
import { useSistem } from "../../sistem/useSistem";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const handleShowNav = () => {
    setShowNav(!showNav);
  };

  const { showTask, setActiveTaskId } = useSistem();

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
        {showNav ? <FaArrowAltCircleLeft /> : <AiOutlineMenuUnfold />}
      </button>
      <ul>
        {showTask.map((task) => (
          <li key={task.id} onClick={() => setActiveTaskId(task.id)}>
            {task.icon}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
