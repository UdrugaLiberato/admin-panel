import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={LoginPage} />
    </Switch>
  );
};

export default App;
