import React, { useEffect, useState } from "react";
import { getAllStudies, findStudyByStudyName } from "../services/study.service";
import "./study-list.component.css";
import axios from "axios";
import { ModifyStudy } from "./ModifyStudy.component";

export const StudyList = (props) => {
  useEffect(() => {
    retrieveStudy();
  }, []);

  const [searchStudyName, setSearchStudyName] = useState("");
  const [studies, setStudies] = useState([]);
  const [currentStudy, setCurrentStudy] = useState({
    studyName: "",
    studyObjective: "",
    testedDrug: "",
    comparedDrug: "",
  });
  const [displayOrModify, setDisplayOrModify] = useState(true);

  const onChangeSearchStudyName = (e) => {
    const searchStudyName = e.target.value;
    setSearchStudyName(searchStudyName);
  };

  const retrieveStudy = () => {
    getAllStudies()
      .then((response) => {
        console.log(response.data);
        setStudies(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveStudy();
    setCurrentStudy({
      studyName: "",
      studyObjective: "",
      testedDrug: "",
      comparedDrug: "",
    });
  };

  const setActiveStudy = (studies, index) => {
    console.log("setting", studies);
    setCurrentStudy({ ...studies, index });
  };

  const doSearchStudyName = (e) => {
    e.preventDefault();
    setCurrentStudy({
      studyName: null,
      index: -1,
    });

    findStudyByStudyName(searchStudyName)
      .then((response) => {
        setStudies(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onClickModify = (e) => {
    setDisplayOrModify(!displayOrModify);
    //console.log("onClickModify e = ", e);
    //props.setCurrentComponent("ModifyStudy");
  };

  const onClickDelete = (e) => {
    const url = `http://localhost:8083/api/study/${e.target.id}`;
    axios
      .delete(url)
      .then(() => {
        refreshList();
        console.log("task deleted");
      })
      .catch((e) => {
        console.log("error in axio fetch in onClickDelete function", e);
      });
  };

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
            Clinical Study
          </h1>
          <p style={{ textAlign: "justify", color: "#fff" }}>
            This is a simple application for Clinical studies management,
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
        <h4>Study List</h4>

        <ul className="list-group">
          {studies &&
            studies.map((_studies, _index) => (
              <li
                className={
                  "list-group-item " +
                  (_index === currentStudy.index ? "active" : "")
                }
                data-index={_index}
                onClick={() => setActiveStudy(_studies, _index)}
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
        {currentStudy.index >= 0 ? (
          <div>
            {/* ****************************************************************** */}
            {/* Here is the condition to switch between display and modify studies */}
            {/* ****************************************************************** */}
            {displayOrModify ? (
              <div>
                <h4>Study</h4>
                {console.log("affichage de current study ", currentStudy)}
                <div>
                  <label>
                    <strong>Study name:</strong>
                  </label>{" "}
                  {currentStudy.studyName}
                </div>
                <div>
                  <label>
                    <strong>Study objective:</strong>
                  </label>{" "}
                  {currentStudy.studyObjective}
                </div>
                <div>
                  <label>
                    <strong>Tested drug:</strong>
                  </label>{" "}
                  {currentStudy.testedDrug}
                </div>
                <div>
                  <label>
                    <strong>Compared to drug:</strong>
                  </label>{" "}
                  {currentStudy.comparedDrug}
                </div>
                <button className="edit-link" onClick={onClickModify}>
                  Modify
                </button>
              </div>
            ) : (
              <div>
                <ModifyStudy studyState={currentStudy} />
                <button className="edit-link" onClick={onClickModify}>
                  Display
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
