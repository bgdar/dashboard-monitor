import { FaCopyright, FaGithub } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import "./home.css";

const HomePage = () => {
  return (
    <main>
      <h3 className="title">DASHBOARD MONITORING</h3>

      <div className="description">
        <p>
          Dashboard ini menyediakan pemantauan real-time untuk CPU, Memori,
          Jaringan, Disk dan lain sebagainya.
        </p>
      </div>

      <div className="guide">
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>n</td>
              <td>click Key n untuk membuka navigasi secara otomatis</td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer className="footer">
        <p>
          <FaCopyright /> bg dar
        </p>
        <p>
          <FaGithub />
          <a
            href="https://github.com/bgdar/"
            target="_blank"
            rel="noopener noreferrer"
          >
            bgdar
          </a>
        </p>
        <p>
          <BsWhatsapp /> 089523135244
        </p>
      </footer>
    </main>
  );
};

export default HomePage;
