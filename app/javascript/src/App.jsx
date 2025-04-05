import React, { useState } from "react";

import { either, isNil, isEmpty } from "ramda";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login, Signup } from "./components/Authentication";
import CategoryBar from "./components/categorybar";
import PrivateRoute from "./components/commons/PrivateRoute";
import Dashboard from "./components/dashboard";
import { CreateTask, ShowTask } from "./components/post";
import Sidebar from "./components/sidebar";
import { getFromLocalStorage } from "./utils/storage";

const Root = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [postCategories, setPostCategories] = useState([]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="flex">
        <ToastContainer autoClose={3000} position="top-right" />
        <div className={`${!isLoggedIn ? "hidden" : " "}`}>
          <Sidebar handleOpen={handleOpen} />
        </div>
        <div className={`${!isOpen ? "hidden" : ""}`}>
          <CategoryBar
            setIsOpen={setIsOpen}
            setPostCategories={setPostCategories}
          />
        </div>
        <div className={`${isOpen ? "ml-[375px]" : "ml-24"} mt-6 flex-1 p-6`}>
          <Switch>
            <Route exact component={CreateTask} path="/post/create" />
            <Route exact component={ShowTask} path="/post/:slug" />
            <Route exact component={Login} path="/login" />
            <Route exact component={Signup} path="/signup" />
            <PrivateRoute
              condition={isLoggedIn}
              path="/"
              redirectRoute="/login"
              render={() => <Dashboard postCategories={postCategories} />}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const App = () => (
  <Router>
    <Root />
  </Router>
);

export default App;
