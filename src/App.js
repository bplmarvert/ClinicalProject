import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//import logo from "./src/logo-efrei.png";

import { AddStudy } from "./components/add-study.component";
import { Study } from "./components/study.component";
import { StudyList } from "./components/study-list.component";

const App = () => {
  return (
    <div>
      <h2 className="App-header"> Patient follow-up in clinical studies </h2>
      <nav className="effetDeBord navbar navbar-expand{-sm|-md|-lg|-xl|-xxl} navbar-expand-xl navbar-light bg-light">
        <a className="navbar-brand" href="/study">
          Clinical studies
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/findAll">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/study"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Chose action
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/study">
                  display all studies
                </a>
                <a className="dropdown-item" href="/create">
                  Add a study
                  <AddStudy />
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/removeStudy">
                  Something else here
                </a>
              </div>
            </li>
            {/*<li className="nav-item">
              <a className="nav-link disabled" href="#">
                Disabled
              </a>
            </li>*/}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2 effetDeLigne"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn form-inline btn-outline-success my-2 my-sm-0 effetDeLigne"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      <AddStudy />
      <StudyList />
    </div>
  );
};

/*<nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Studies
            </Link>
            {/*<Link to={"/study"} className="nav-link">
              Studies
  </Link>*/

/*</li>{" "}
        </div>
        {/*<li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
            </li> */

/*<img src={logo}style={{width: "110px",height: "auto",float: "right",position: "absolute",right: "30px",}}/> */

/*</nav></div> */

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
