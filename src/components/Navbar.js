import "./Navbar.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import App from "../App";
import { Navigate } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <BrowserRouter>
        <ul>
          <li>
            <Link to={"/"}>
              <h2 id="sitename">Collab Compiler</h2>
            </Link>
          </li>
        </ul>
        <Routes>
          <Route exact path="/compiler" element={<App />}></Route>
          <Route
            path="/redirect"
            element={<Navigate to={"/compiler"}></Navigate>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Navbar;
