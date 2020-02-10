import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import "./App.css";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <div className="App">
              <Navbar />
              <Alert />
              <Switch>
                <div className="container">
                  <PrivateRoute exact path="/" component={Home} />
                  {/* <Route exact path="/" component={Home} /> */}
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </div>
              </Switch>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
