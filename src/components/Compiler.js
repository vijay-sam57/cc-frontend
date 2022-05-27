import React, { Component } from "react";
import "./Compiler.css";
import { io } from "socket.io-client";
const socket = io(`http://localhost:5000`);
socket.on("connect", () => {
  console.log(` Connected`);
});

socket.on("message", (msg) => {
  const code = document.getElementById("source");
  code.value = msg;
});

export default class Compiler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ``,
      output: ``,
      language_id: 2,
      user_input: ``,
    };
  }
  input = (event) => {
    event.preventDefault();
    this.setState({ input: event.target.value });
  };

  userInput = (event) => {
    event.preventDefault();
    this.setState({ user_input: event.target.value });
  };

  language = (event) => {
    event.preventDefault();
    this.setState({ language_id: event.target.value });
  };

  submit = async (e) => {
    e.preventDefault();
    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Creating Submission ...\n";
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key":
            "fb11d78fbdmsh505a8c0c98901c3p1e2b87jsnb89802cc43c2",
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: this.state.input,
          stdin: this.state.user_input,
          language_id: this.state.language_id,
        }),
      }
    );

    outputText.innerHTML += "Submission Created ...\n";
    const jsonResponse = await response.json();
    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };
    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key":
              "fb11d78fbdmsh505a8c0c98901c3p1e2b87jsnb89802cc43c2",
            "content-type": "application/json",
          },
        });
        jsonGetSolution = await getSolution.json();
      }
    }

    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);
      outputText.innerHTML = "";
      outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);
      outputText.innerHTML = "";
      outputText.innerHTML += `\n Error :${error}`;
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);
      outputText.innerHTML = "";
      outputText.innerHTML += `\n Error :${compilation_error}`;
    }
  };

  edit() {
    const editor = document.getElementById("source");
    socket.send(editor.value);
  }

  render() {
    return (
      <div>
        <div className="row container-fluid">
          <div className="col-6 ml-4 ">
            <label htmlFor="solution ">
              <span className="badge badge-info heading mt-2 ">
                <b>Code Here</b>
              </span>
            </label>
            <textarea
              required
              name="solution"
              id="source"
              onChange={this.input}
              className=" source"
              value={this.state.input}
              onKeyUp={this.edit}
            ></textarea>
            <button
              type="submit"
              className="btn btn-danger ml-2 mr-2 "
              onClick={this.submit}
            >
              <em>Run</em>
            </button>

            {/* <button
              type="submit"
              className="btn btn-info ml-2 mr-2 "
              onClick={this.edit}
            >
              <em>Share</em>
            </button> */}
            <br></br>
            <label htmlFor="tags" className="mr-1">
              <b>Language:</b>
            </label>
            <select
              value={this.state.language_id}
              onChange={this.language}
              id="tags"
              className="form-control form-inline mb-2 language"
            >
              <option value="54">C++</option>
              <option value="50">C</option>
              <option value="62">Java</option>
              <option value="71">Python</option>
            </select>
          </div>
          <div className="col-5">
            <div>
              <b>Output</b>
              <br></br>
              <textarea id="output"></textarea>
            </div>
          </div>
        </div>
        <div className="mt-2 ml-5">
          <span className="badge badge-primary heading my-2 ">
            <b>User Input</b>
          </span>
          <br />
          <textarea id="input" onChange={this.userInput}></textarea>
        </div>
      </div>
    );
  }
}
