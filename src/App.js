import "./App.css";
import Compiler from "./components/Compiler";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { useState } from "react";
function App() {
  const [login, setLogin] = useState(false);
  const [teacher, setTeacher] = useState(false);
  if (!login) {
    return <Login setLogin={setLogin} setTeacher={setTeacher} />;
  }
  return (
    <div className="App">
      <Navbar></Navbar>
      <Compiler isTeacher={teacher} />
    </div>
  );
}
export default App;
