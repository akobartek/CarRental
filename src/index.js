import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { render } from "react-dom";
import AppHeader from "./components/AppHeader";
import Main from "./components/Main";
import SearchResult from "./components/SearchResult";
import CarDetails from "./components/CarDetails";
import ReservationSummary from "./components/ReservationSummary";
import FaultReport from "./components/FaultReport";
import SignInPage from "./components/SignInPage";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";

registerLocale("pl", pl);
setDefaultLocale("pl");

class App extends React.Component {
  state = { isUserSignedIn: localStorage.getItem("token") !== "" };

  changeSignIn = () => {
    this.setState({
      isUserSignedIn: !this.state.isUserSignedIn
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <AppHeader
            isUserSignedIn={this.state.isUserSignedIn}
            signOut={this.changeSignIn}
          />
          <Route path="/" exact component={Main} />
          <Route path="/search" component={SearchResult} />
          <Route path="/car" component={CarDetails} />
          <Route path="/reservation" component={ReservationSummary} />
          <Route path="/report" component={FaultReport} />
          <Route
            path="/signin"
            render={props => (
              <SignInPage {...props} signIn={this.changeSignIn} />
            )}
          />
        </BrowserRouter>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
