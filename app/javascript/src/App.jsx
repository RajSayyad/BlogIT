import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CategoryBar from "./components/categorybar";
import Dashboard from "./components/dashboard";
import { CreateTask, ShowTask } from "./components/post";
import Sidebar from "./components/sidebar";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [postCategories, setPostCategories] = useState([]);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="flex">
        <ToastContainer autoClose={3000} position="top-right" />
        <Sidebar handleOpen={handleOpen} />
        <div className={`${!isOpen ? "hidden" : ""}`}>
          <CategoryBar setPostCategories={setPostCategories} />
        </div>
        <div className={`${isOpen ? "ml-[375px]" : "ml-24"} mt-6 flex-1 p-6`}>
          <Switch>
            <Route exact component={CreateTask} path="/post/create" />
            <Route
              exact
              path="/"
              render={() => <Dashboard postCategories={postCategories} />}
            />
            <Route exact path="/dashboard">
              <Redirect to="/" />
            </Route>
            <Route exact component={ShowTask} path="/post/:slug" />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
