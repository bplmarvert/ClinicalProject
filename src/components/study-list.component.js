import React, { useEffect, useState } from "react";
import { getAllStudies, findStudyByStudyName } from "../services/study.service";
import { Link } from "react-router-dom";

export const StudyList = (props) => {
  useEffect(() => {
    retrieveStudy();
  }, []);

  const [searchStudyName, setSearchStudyName] = useState("");
  const [study, setStudy] = useState([]);
  const [currentStudy, setCurrentStudy] = useState({
    studyName: "",
    studyObjective: "",
    testedDrug: "",
    comparedDrug: "",
  });

  const onChangeSearchStudyName = (e) => {
    const searchStudyName = e.target.value;
    setSearchStudyName(searchStudyName);
  };

  /*const onChangeSearchStudyObjective = (e) => {
    const searchStudyObjective = e.target.value;
    setSearchStudyObjective(searchStudyObjective);
  };

  const onChangeSearchTestedDrug = (e) => {
    const searchTestedDrug = e.target.value;
    setSearchTestedDrug(searchTestedDrug);
  };

  const onChangeSearchComparedDrug = (e) => {
    const searchComparedDrug = e.target.value;
    setSearchComparedDrug(searchComparedDrug);
  };*/

  const retrieveStudy = () => {
    getAllStudies()
      .then((response) => {
        console.log(response.data);
        setStudy(response.data);
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

  const setActiveStudy = (study, index) => {
    console.log("setting", study);
    setCurrentStudy({ ...study, index });
  };

  const doSearchStudyName = () => {
    setCurrentStudy({
      study: null,
      index: -1,
    });

    findStudyByStudyName(searchStudyName)
      .then((response) => {
        setStudy(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
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
            a react Frontend, a Backend, a MongoDB database.
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
          {study &&
            study.map((_study, _index) => (
              <li
                className={
                  "list-group-item " +
                  (_index === currentStudy.index ? "active" : "")
                }
                data-index={_index}
                onClick={() => setActiveStudy(_study, _index)}
                key={_index}
              >
                {_study.studyName}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentStudy.index ? (
          <div>
            <h4>Study</h4>
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
            <button className="edit-link">
              <Link
                to={"/study/" + currentStudy.id}
                className="badge badge-warning"
                id="edit-study"
              >
                Edit
              </Link>
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Study...</p>
          </div>
        )}
      </div>
    </div>
  );
};
