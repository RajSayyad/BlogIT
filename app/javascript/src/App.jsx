import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import About from "./components/About";
import Dashboard from "./components/dashboard";
import { CreateTask } from "./components/post";
import Sidebar from "./components/sidebar";

const App = () => (
  <Router>
    <div className="flex">
      <ToastContainer autoClose={3000} position="top-right" />
      <Sidebar />
      <div className="ml-24 mt-6 flex-1 p-6">
        <Switch>
          <Route exact component={CreateTask} path="/post/create" />
          <Route exact component={Dashboard} path="/" />
          <Route exact component={About} path="/about" />
        </Switch>
      </div>
    </div>
  </Router>
);

export default App;
