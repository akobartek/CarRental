import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { render } from "react-dom";
import AppHeader from "./components/AppHeader";
import Main from "./components/Main";
import SearchResult from "./components/SearchResult";
import CarDetails from "./components/CarDetails";
import ReservationSummary from "./components/ReservationSummary";
import FaultReport from "./components/FaultReport";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";

registerLocale("pl", pl);
setDefaultLocale("pl");

render(
  <div>
    <BrowserRouter>
      <AppHeader />
      <Route path="/" exact component={Main} />
      <Route path="/search" component={SearchResult} />
      <Route path="/car" component={CarDetails} />
      <Route path="/reservation" component={ReservationSummary} />
      <Route path="/report" component={FaultReport} />
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
