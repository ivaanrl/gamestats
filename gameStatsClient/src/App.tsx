import React from "react";
import "./App.css";
import "typeface-roboto";
import Navbar from "./components/Navbar/Navbar";
import { CssBaseline } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Navbar />
    </div>
  );
}

export default App;
