import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AddStudy } from "./components/add-study.component";
import { StudyList } from "./components/study-list.component";
import { Study } from "./components/study.component";
import { ModifyStudy } from "./components/ModifyStudy.component";

const App = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const [componentToDisplay, setCurrentComponent] = useState("StudyList");

  const handleMenu = (e) => {
    setCurrentComponent(e.target.id);
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
          Patient follow-up in clinical studies
        </h2>
      </span>
      <nav className="d-flex justify-content-around effetDeBord navbar navbar-expand{-sm|-md|-lg|-xl|-xxl} navbar-expand-xl navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/study">
            Clinical studies
          </a>

          {/* *********** Drop Down Menu ************* */}
          <div className="dropdown">
            <button onClick={handleOpen} btn btn-primary>
              {" "}
              Studies menu{" "}
            </button>
            {open ? (
              <ul className="menu">
                <li className="menu-item">
                  <button id="StudyList" onClick={handleMenu}>
                    Display all studies
                  </button>
                </li>
                <li className="menu-item">
                  <button id="AddStudy" onClick={handleMenu}>
                    {" "}
                    Add a study{" "}
                  </button>
                </li>
                <li className="menu-item">
                  <button id="ModifyStudy" onClick={handleMenu}>
                    Modify a study
                  </button>
                </li>
              </ul>
            ) : null}
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
                ? {/* bouton de la ligne du haut */}
              </button>
            </form>
          </div>
        </div>
      </nav>
      {/* n'affiche que le state sélectionné */}
      {/*{console.log("typeof componentToDisplay", typeof componentToDisplay)}
      {console.log(
        "componentToDisplay.componentToDisplay ",
        componentToDisplay.componentToDisplay
      )} */}
      {componentToDisplay === "StudyList" && (
        <StudyList setCurrentComponent={setCurrentComponent} />
      )}
      {componentToDisplay === "Study" && <Study />}
      {componentToDisplay === "AddStudy" && <AddStudy />}
      {componentToDisplay === "ModifyStudy" && (
        <ModifyStudy setCurrentComponent={setCurrentComponent} />
      )}
    </div>
  );
};

/*</nav>
      <div className="container mt-3">
        <Routes>
          {/*<Route path={"/"} element={<StudyList />} /> */

/*<Route path={"/study"} element={<StudyList />} />
          {/*<Route path="/add" element={<AddStudy />} />
          <Route path="/study/:id" element={<Study />} /> */

/*</Routes>
      </div>
        </div>*/

export default App;
