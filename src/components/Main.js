import React from "react";
import MainSearchForm from "./MainSearchForm";
import MainCarList from "./MainCarsList";

class Main extends React.Component {
  render() {
    if (
      localStorage.getItem("role") &&
      localStorage.getItem("role") === "worker"
    )
      return <MainCarList />;
    else return <MainSearchForm />;
  }
}

export default Main;
