import React, { useEffect } from "react";
import "./App.css";
import "typeface-roboto";
import Navbar from "./components/Navbar/Navbar";
import { CssBaseline } from "@material-ui/core";
import TopStreams from "./components/TopStreams/TopStreams";
import { Route, Switch } from "react-router-dom";
import GameInfo from "./components/GameInfo/GameInfo";

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Navbar />
      <Switch>
        <Route path="/gameInfo/:gameName" component={GameInfo} />
        <Route path="/" exact component={TopStreams} />
      </Switch>
    </div>
  );
};

export default App;
