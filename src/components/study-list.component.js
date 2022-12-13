import React, { useEffect, useState } from "react";
import { getAllStudies } from "../services/study.service";
import "./study-list.component.css";
import axios from "axios";
import { ModifyStudy } from "./ModifyStudy.component";

export const StudyList = (props) => {
  const [searchStudyName, setSearchStudyName] = useState("");
  const [nbStudy, setNbStudy] = useState(0);
  const [studies, setStudies] = useState([]);
  const [displayOrModify, setDisplayOrModify] = useState(true);

  const retrieveStudy = () => {
    getAllStudies()
      .then((response) => {
        setStudies(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveStudy();
  }, []);

  const updateStudy = (study) => {
    let newData = [...studies];
    newData[nbStudy] = study;
    setStudies(newData);
  };

  const onChangeSearchStudyName = (e) => {
    const searchStudyName = e.target.value;
    setSearchStudyName(searchStudyName);
  };

  const refreshList = () => {
    retrieveStudy();
  };

  const setActiveStudy = (index) => {
    setNbStudy(index);
  };

  const doSearchStudyName = (e) => {
    console.log("fonction doSearchStudyName e = ", e);
    e.preventDefault();
  };

  const onClickCreatePatient = (e) => {
    props.setOnGoingStudy(currentStudy);
    props.setCurrentComponent("AddPatient");
  };

  const onClickListPatient = (e) => {
    props.setOnGoingStudy(currentStudy);
    props.setCurrentComponent("ListPatient");
  };

  const onClickModify = (e) => {
    props.setOnGoingStudy(currentStudy);
    setDisplayOrModify(!displayOrModify);
  };

  const onClickDelete = (e) => {
    const url = `http://localhost:8083/api/study/${e.target.id}`;
    axios
      .delete(url)
      .then(() => {
        refreshList();
        setActiveStudy(0);
        console.log("Study deleted");
      })
      .catch((e) => {
        console.log("error in axio fetch in onClickDelete study function", e);
      });
  };

  const currentStudy = studies[nbStudy];
  props.setOnGoingStudy(currentStudy);
  getAllStudies();
  return (
    <div className="list row">
      <div className="col-md-12">
        <div
          style={{
            backgroundColor: "#3c5176",
            padding: "20px 30px",
            marginBottom: "30px",
            borderRadius: "5px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              padding: "15px 0",
              color: "#cbce51",
            }}
          >
            Patient diary for clinical studies
          </h1>
          <p style={{ textAlign: "justify", color: "#fff" }}>
            This Diary is a simple tool for Clinical studies management. It was
            designed for the course of Full Stack Developers, at Efrei Paris. It
            serves to provide an example of a full-stack application, including
            a react Frontend, Backend and a MongoDB database.
          </p>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by studyName"
            value={searchStudyName}
            onChange={onChangeSearchStudyName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={doSearchStudyName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4 className="d-flex justify-content-center"> Study List</h4>

        <ul className="list-group">
          {studies &&
            studies.map((_studies, _index) => (
              <li
                className={
                  "list-group-item " +
                  (_index === currentStudy.index ? "active" : "")
                }
                data-index={_index}
                onClick={() => setActiveStudy(_index)}
                key={_index}
              >
                {_studies.studyName}
                <button
                  type="button"
                  className={"btn btn-danger offset-sm-1"}
                  id={_studies.id}
                  onClick={onClickDelete}
                >
                  X
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {typeof currentStudy != "undefined" ? (
          <div>
            {/* ****************************************************************** */}
            {/* Here is the condition to switch between display and modify studies */}
            {/* ****************************************************************** */}
            {displayOrModify ? (
              <div>
                {" "}
                <h4>Study</h4>
                <div>
                  {" "}
                  <label>
                    <strong>Study name:</strong>
                  </label>{" "}
                  {currentStudy.studyName}
                </div>
                <div>
                  {" "}
                  <label>
                    <strong>Study objective :</strong>
                  </label>{" "}
                  {currentStudy.studyObjective}
                </div>
                <div>
                  {" "}
                  <label>
                    <strong>Tested drug:</strong>
                  </label>{" "}
                  {currentStudy.testedDrug}
                </div>
                <div>
                  {" "}
                  <label>
                    <strong>Compared to drug:</strong>
                  </label>{" "}
                  {currentStudy.comparedDrug}
                </div>{" "}
                <button
                  type="button"
                  className="edit-link btn btn-primary"
                  onClick={onClickModify}
                >
                  Modify
                </button>{" "}
                <button
                  type="button"
                  className="edit-link btn btn-primary"
                  onClick={onClickCreatePatient}
                >
                  Add a patient
                </button>{" "}
                <button
                  type="button"
                  className="edit-link btn btn-primary"
                  onClick={onClickListPatient}
                >
                  List patients
                </button>
              </div>
            ) : (
              <div>
                <ModifyStudy
                  studyState={currentStudy}
                  updateStudy={updateStudy}
                />{" "}
                <p> </p>
                <button
                  type="button"
                  className="edit-link btn btn-primary col-sm-offset "
                  onClick={onClickModify}
                >
                  Display
                </button>{" "}
                <button
                  type="button"
                  className="edit-link btn btn-primary col-sm-offset "
                  onClick={onClickCreatePatient}
                >
                  Add a patient
                </button>{" "}
                <button
                  type="button"
                  className="edit-link btn btn-primary col-sm-offset "
                  onClick={onClickListPatient}
                >
                  List Patients{" "}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a study to display or modify it</p>
          </div>
        )}
      </div>
    </div>
  );
};
