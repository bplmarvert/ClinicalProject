import React, { useEffect, useState } from "react";
import { findPatientsByStudy } from "../services/patient.service";
import "./study-list.component.css";
import axios from "axios";
import { ModifyPatient } from "./ModifyPatient.component";
import { AEventList } from "./aEvent-list.component";

export const PatientList = (props) => {
  const [searchPatientName, setSearchPatientName] = useState("");
  const [nbPatient, setNbPatient] = useState(0);
  const [patients, setPatients] = useState([]);
  const [displayOrModify, setDisplayOrModify] = useState(true);
  const onGoingStudyName = props.onGoingStudy.studyName;

  const retrievePatient = () => {
    findPatientsByStudy(onGoingStudyName)
      .then((response) => {
        console.log(response);
        setPatients(response.data);
      })
      .catch((e) => {
        console.log(
          "error returned in findPatientsByStudy in Patient-list.component",
          e
        );
      });
  };

  useEffect(() => {
    retrievePatient();
  }, []);

  const updatePatient = (patient) => {
    let newData = [...patients];
    newData[nbPatient] = patient;
    setPatients(newData);
  };

  const onChangeSearchPatientName = (e) => {
    const searchPatientName = e.target.value;
    setSearchPatientName(searchPatientName);
  };

  const refreshList = () => {
    retrievePatient();
  };

  const setActivePatient = (index) => {
    // setCurrentPatient(currentPatient);
    props.setOnGoingPatient(currentPatient);
    setNbPatient(index);
  };

  const doSearchPatientName = (e) => {
    console.log("fonction doSearchPatientName e = ", e);
    e.preventDefault();
  };

  const onClickModify = (e) => {
    setDisplayOrModify(!displayOrModify);
  };

  const onClickCreateAEvent = (e) => {
    props.setOnGoingPatient(currentPatient);
    props.setCurrentComponent("AddAEvent");
  };

  const onClickDelete = (e) => {
    const url = `http://localhost:8083/api/patient/${e.target.id}`;
    axios
      .delete(url)
      .then(() => {
        refreshList();
        setActivePatient(0);
        console.log("Patient deleted");
      })
      .catch((e) => {
        console.log("error in axio fetch in onClickDelete patient function", e);
      });
  };

  const currentPatient = patients[nbPatient];
  console.log("CurrentPatient= ", currentPatient);
  console.log("nbPatient = ", nbPatient);
  return (
    <div className="list row">
      <div className="col-md-12">
        {/* ************************************ */}
        {/* Here display the patient information */}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by patientName"
            value={searchPatientName}
            onChange={onChangeSearchPatientName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={doSearchPatientName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        {console.log("onGoingStudyName = ", onGoingStudyName)}
        <h2
          style={{
            textAlign: "center",
            padding: "15px 0",
            color: "#149151",
          }}
        >
          Study {onGoingStudyName}{" "}
        </h2>
        <h4 className="margeHaute lesMarges form-inline my-2 my-lg-0">
          {" "}
          Patient List
        </h4>
        <p> </p>
        <ul className="list-group">
          {patients &&
            patients
              //.filter((patient) => patient.studyName === onGoingStudyName)
              .map((_patients, _index) => (
                <li
                  className={
                    "list-group-item " +
                    (_index === currentPatient.index ? "active" : "")
                  }
                  data-index={_index}
                  onClick={() => setActivePatient(_index)}
                  key={_index}
                >
                  {_patients.patientName}
                  <button
                    type="button"
                    className={"btn btn-danger offset-sm-1"}
                    id={_patients.id}
                    onClick={onClickDelete}
                  >
                    X
                  </button>
                </li>
              ))}
        </ul>
      </div>
      <div className="col-md-8">
        {typeof currentPatient != "undefined" ? (
          <div>
            {/* ******************************************************************* */}
            {/* Here is the condition to switch between display and modify Patients */}
            {/* ******************************************************************* */}
            {displayOrModify ? (
              <div>
                <h4>Patient</h4>
                <div>
                  <label>
                    <strong>Study: </strong>
                  </label>{" "}
                  {currentPatient.studyName}
                </div>
                <div>
                  <label>
                    <strong>Patient name:</strong>
                  </label>{" "}
                  {currentPatient.patientName}
                </div>
                <div>
                  <label>
                    <strong>Birthday:</strong>
                  </label>{" "}
                  {currentPatient.birthday}
                </div>
                <div>
                  <label>
                    <strong>Sex:</strong>
                  </label>{" "}
                  {currentPatient.sex}
                </div>
                <div>
                  <label>
                    <strong>email:</strong>
                  </label>{" "}
                  {currentPatient.email}
                </div>
                <p> </p>
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
                  onClick={onClickCreateAEvent}
                >
                  Add an event
                </button>{" "}
                {/*<button
                  type="button"
                  className="edit-link btn btn-primary"
                  onClick={onClickListAEvent}
            > 
                  List events
                </button>{" "}*/}
                <AEventList onGoingPatient={currentPatient} />
              </div>
            ) : (
              <div>
                <ModifyPatient
                  patientState={currentPatient}
                  updatePatient={updatePatient}
                />
                <button
                  className="edit-link
                   btn btn-primary col-sm-offset "
                  onClick={onClickModify}
                >
                  Display
                </button>
                <AEventList onGoingPatient={currentPatient} />
              </div>
            )}
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a Patient to display or modify </p>
          </div>
        )}
      </div>
    </div>
  );
};
