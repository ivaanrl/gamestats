import React, { useEffect } from "react";
import "./App.css";
import "typeface-roboto";
import Navbar from "./components/Navbar/Navbar";
import { CssBaseline } from "@material-ui/core";
import TopStreams from "./components/TopStreams/TopStreams";

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Navbar />
      <TopStreams />
    </div>
  );
};

export default App;
