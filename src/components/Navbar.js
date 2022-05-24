import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a id="sitename" href="#">
              Collab Compiler
            </a>
          </li>
          <li>
            <a href="#">Code</a>
          </li>
          <li>
            <a href="#">Projects</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
