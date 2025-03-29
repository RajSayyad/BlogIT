import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import About from "./components/About";
import Dashboard from "./components/dashboard";
import Sidebar from "./components/sidebar";

const App = () => (
  <Router>
    <div className="flex">
      <Sidebar />
      <div className="ml-24 mt-6 flex-1 p-6">
        <Switch>
          <Route exact component={Dashboard} path="/" />
          <Route exact component={About} path="/about" />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
