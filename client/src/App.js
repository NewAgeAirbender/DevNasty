import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Quotes from "./pages/Quotes";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Quotes} />
        <Route exact path="/quotes" component={Quotes} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
