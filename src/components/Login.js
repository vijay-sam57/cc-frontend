import "./Login.css";
import React, { useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          id="email"
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          id="pass"
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={async (e) => {
            e.preventDefault();
            const auth = {
              email: email,
              password: password,
            };
            axios.post("http://localhost:5000/auth", auth).then((res) => {
              if (res.data === "Teacher") {
                props.setTeacher(true);
              } else {
                props.setTeacher(false);
              }
            });
            props.setLogin(true);
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
