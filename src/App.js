// for Cypress https://learn.cypress.io/testing-your-first-application/app-install-and-overview

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AddStudy } from "./components/add-study.component";
import { StudyList } from "./components/study-list.component";
import { Study } from "./components/study.component";
import { AddPatient } from "./components/add-patient.component";
import { PatientList } from "./components/patient-list.component";
import { AddAEvent } from "./components/add-AEvent.component";
import { LoginP } from "./login/LoginP";

const App = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const [componentToDisplay, setCurrentComponent] = useState("StudyList");
  const [onGoingStudy, setOnGoingStudy] = useState("");
  const [onGoingPatient, setOnGoingPatient] = useState("");

  const handleMenu = (e) => {
    setCurrentComponent(e.target.value);
    handleOpen();
  };

  const handleDisplayOne = (e) => {
    setCurrentComponent("ModifyStudy");
    console.log(componentToDisplay);
    console.log("l'étude est la ", e);
    const currentStudy = e.target.getAttribute("data_study"); // because it is an object
    console.log("search for a currentStudy", currentStudy, "and event", e);
  };

  return (
    <div>
      <span>
        <h2 className="App-header d-flex justify-content-around">
          <img src="./logo-efrei.png" alt="" />
          Patient diary in clinical studies
        </h2>
      </span>
      <nav className="d-flex justify-content-around effetDeBord navbar navbar-expand{-sm|-md|-lg|-xl|-xxl} navbar-expand-xl navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/study">
            Diary for use in clinical studies
          </a>

          {/* *********** Drop Down Menu ************* */}
          <div className="dropdown">
            <select onChange={handleMenu}>
              <option value="StudyList">Display all studies</option>
              <option value="AddStudy">Add a study</option>
              <option value="AddPatient">Add a patient</option>
              <option value="ListPatient">List of the patients</option>
              <option value="Connection">Connection</option>
            </select>
          </div>
          <div>
            <form className="d-flex form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2 effetDeLigne"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                id="Study"
                className="effetDeLigne btn form-inline btn-outline-success my-2 my-sm-0 "
                type="submit"
                onSubmit={handleDisplayOne}
              >
                ? {/* bouton ? de la ligne du haut */}
              </button>
            </form>
          </div>
        </div>
      </nav>
      {componentToDisplay === "StudyList" && (
        <StudyList
          setCurrentComponent={setCurrentComponent}
          setOnGoingStudy={setOnGoingStudy}
        />
      )}
      {componentToDisplay === "Study" && <Study />}
      {componentToDisplay === "AddStudy" && <AddStudy />}
      {componentToDisplay === "AddPatient" && (
        <AddPatient
          setCurrentComponent={setCurrentComponent}
          onGoingStudy={onGoingStudy}
        />
      )}
      {componentToDisplay === "ListPatient" && (
        <PatientList
          setCurrentComponent={setCurrentComponent}
          onGoingStudy={onGoingStudy}
          setOnGoingPatient={setOnGoingPatient}
        />
      )}
      {componentToDisplay === "AddAEvent" && (
        <AddAEvent
          setCurrentComponent={setCurrentComponent}
          onGoingPatient={onGoingPatient}
        />
      )}
      {componentToDisplay === "Connection" && <LoginP />}
    </div>
  );
};
export default App;
