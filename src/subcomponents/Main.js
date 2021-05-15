import React from "react";
import { Switch, Route } from "react-router-dom";

import App from "../components/App";

const Main = () => {

  
  return (
    <Switch>
      <Route exact path="/app" component={App}></Route>
    </Switch>
  );
};

export default Main;
