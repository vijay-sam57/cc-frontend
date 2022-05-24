import "./Navbar.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Login from "./Login";
import Compiler from "./Compiler";
function Navbar() {
  return (
    <div>
      <BrowserRouter>
        <ul>
          <li>
            <h2 id="sitename">Collab Compiler</h2>
          </li>
          <li>
            <Link to={"/compiler"}>Editor</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          {/* <li>
            <a href="#">Projects</a>
          </li> */}
        </ul>
        <Routes>
          <Route exact path="/compiler" element={<Compiler />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navbar;
