import React, { useState } from "react";
import GetRandom from "./Components/GetRandom";
import "./App.css";
function App() {
  const [input, setInput] = useState("");
  return (
    <div className="App">
      <div className=" mt-5">
        <center>
          <h2>View n Number Of Data List</h2>
          <br />
          <input
            type="number"
            value={input}
            className="form-control w-50"
            placeholder="Enter Number Of List"
            onChange={(e) => setInput(e.target.value)}
          />
          <br />
        </center>
        <GetRandom rowNum={input} />
      </div>
    </div>
  );
}

export default App;
