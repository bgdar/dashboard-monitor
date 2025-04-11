import "./nav.css";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useSistem } from "../sistemContextManagement/useContexts";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  const handleShowNav = () => {
    setShowNav(!showNav);
  };
  const { showTask, showTaskRights, setActiveTaskId } = useSistem();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const taskLengthRef = useRef(showTask.length);

  useEffect(() => {
    taskLengthRef.current = showTask.length;
  }, [showTask]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "n") {
        setShowNav((prev) => !prev);
      }
      if (showNav) {
        setSelectedIndex((prev) => {
          if (event.key === "ArrowDown") {
            return (prev + 1) % taskLengthRef.current;
          }
          if (event.key === "ArrowUp") {
            return (prev - 1 + taskLengthRef.current) % taskLengthRef.current;
          }
          return prev;
        });
      }

      if (event.key === "Enter" && showNav) {
        const selectedTask = showTask[selectedIndex];
        if (selectedTask) {
          setActiveTaskId(selectedTask.id);
          console.log("selectet task", selectedTask);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showNav, selectedIndex, showTask, setActiveTaskId]);

  return (
    <nav>
      <button
        className="button button-nav "
        onClick={handleShowNav}
        type="button"
      >
        <div
          style={{ transform: `${showNav ? "rotate(180deg)" : "rotate(0)"}` }}
        >
          {showNav ? <FaArrowAltCircleLeft /> : <AiOutlineMenuUnfold />}
        </div>
      </button>
      {/* list items ke sebelah kanan */}
      <ul
        className="ul-right"
        style={{
          width: `${showNav ? " max-content" : "0px"}`,
          opacity: `${showNav ? "1" : "0"}`,
        }}
      >
        {showTaskRights.map((task) => (
          <li
            key={task.id}
            title={task.task}
            onClick={() => setActiveTaskId(null)}
          >
            {task.icon}
          </li>
        ))}
      </ul>

      {/* list item ke bawah */}
      <ul
        className="ul-button"
        style={{
          height: `${showNav ? "100vh" : "0px"}`,
          opacity: `${showNav ? "1" : "0"}`,
        }}
      >
        {showTask.map((task, index) => (
          <li
            key={task.id}
            className={`${selectedIndex === index ? "active" : "notactiver"}`}
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
