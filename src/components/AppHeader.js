import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../AppHeader.css";

// TODO() -> Logged in user = different layout

class AppHeader extends Component {
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
            {/* <Nav>
              LOGOWANIE
            </Nav> */}
            <Nav>
              <Nav.Link>
                {/* <Link to="/rentals"> */}
                Wypożyczenia
                {/* </Link> */}
              </Nav.Link>
              <Link className="nav-link" to="/report">
                Zgłoś usterkę
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }
}

export default AppHeader;
