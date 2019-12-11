import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../AppHeader.css";

// TODO() -> Logged in user = different layout

class AppHeader extends Component {
  signOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("role", "");
    this.props.signOut();
  };

  render() {
    return (
      <header>
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand>
            <Link to="/">Car Rental</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {this.props.isUserSignedIn &&
                localStorage.getItem("role") !== "worker" && (
                  <Link className="nav-link" to="/myrentals">
                    Wypożyczenia
                  </Link>
                )}
              {this.props.isUserSignedIn &&
                localStorage.getItem("role") !== "worker" && (
                  <Link className="nav-link" to="/report">
                    Zgłoś usterkę
                  </Link>
                )}
              {this.props.isUserSignedIn && (
                <Link className="nav-link" to="/" onClick={this.signOut}>
                  Wyloguj
                </Link>
              )}
              {!this.props.isUserSignedIn && (
                <Link className="nav-link" to="/signin">
                  Logowanie
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default AppHeader;
