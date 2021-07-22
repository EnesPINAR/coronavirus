import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from "./components/Header";
import AboutCoronavirus from "./components/AboutCoronavirus";
import TopCountries from "./components/TopCountries";
import AboutMe from "./components/AboutMe";
import "./css/style.css";

const App = () => {
  return (
    <Router>

      <Header />

      <Switch>
        <Route path="/Home" component={App}></Route>
        <Route path="/about-coronavirus" component={AboutCoronavirus}></Route>
        <Route path="/top-countries" component={TopCountries}></Route>
        <Route path="/about-me" component={AboutMe}></Route>
      </Switch>

    </Router>
  );
}

export default App;
