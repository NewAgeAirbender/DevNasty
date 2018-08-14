import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Quotes from "./pages/Quotes";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { Button, Navbar, NavItem, NavLink, NavbarBrand } from 'reactstrap';

// const App = () => (
//   <Router>
//     <div>
//       <Nav />
//       <Switch>
//         <Route exact path="/" component={Quotes} />
//         <Route exact path="/quotes" component={Quotes} />
//         <Route component={NoMatch} />
//       </Switch>
//     </div>
//   </Router>
// );

// export default App;

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <Router>
        <div>
          <Navbar color="light">
            <NavbarBrand href="/">
              Dev Nasty
            </NavbarBrand>
            {
              !isAuthenticated() && (
                <Button
                  id="qsLoginBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.login.bind(this)}
                >
                  Log In
                  </Button>
              )
            }

            {
              isAuthenticated() && (
                <Button
                  id="qsLogoutBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                  </Button>
              )
            }

          </Navbar>
          <Switch>
            <Route exact path="/" component={Quotes} />
            <Route exact path="/quotes" component={Quotes} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

