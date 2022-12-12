import React, { useEffect, useState } from "react";
import { getAllAEvents } from "../services/aEvent.service";
import { getAEventsByPatient } from "../services/aEvent.service";
import "./study-list.component.css";
import axios from "axios";
import { ModifyAEvent } from "./ModifyAEvent.component";

export const AEventList = (props) => {
  const [searchAEventTitle, setSearchAEventTitle] = useState("");
  const [nbAEvent, setNbAEvent] = useState(0);
  const [aEvents, setAEvents] = useState([]);
  const [displayOrModify, setDisplayOrModify] = useState(true);
  const onGoingPatientName = props.onGoingPatient.patientName;

  const retrieveAEvent = () => {
    getAEventsByPatient(onGoingPatientName)
      .then((response) => {
        console.log(response);
        setAEvents(response.data);
      })
      .catch((e) => {
        console.log(
          "error returned in retrieveAEvent in aEvent-list.component",
          e
        );
      });
  };

  const retrieveAllAEvent = () => {
    getAllAEvents()
      .then((response) => {
        console.log(response);
        setAEvents(response.data);
      })
      .catch((e) => {
        console.log("getAllPatients in Patient-list.component", e);
      });
  };

  useEffect(() => {
    retrieveAEvent();
  }, []);

  const updateAEvent = (aEvent) => {
    let newData = [...aEvents];
    newData[nbAEvent] = aEvent;
    setAEvents(newData);
  };

  const onChangeSearchAEventTitle = (e) => {
    const searchAEventTitle = e.target.value;
    setSearchAEventTitle(searchAEventTitle);
  };

  const refreshList = () => {
    retrieveAEvent();
  };

  const setActiveAEvent = (index) => {
    // setCurrentAEvent(currentAEvent);
    setNbAEvent(index);
  };

  const doSearchAEventTitle = (e) => {
    console.log("fonction doSearchAEventTitle e = ", e);
    e.preventDefault();
  };

  /*const getFilteredList = () => {
    if (!selectedCategory) {
      return sportList;
    }
    return sportList.filter((item) => item.category === selectedCategory);
  }*/

  const onClickModify = (e) => {
    setDisplayOrModify(!displayOrModify);
    //setCurrentPatient(currentPatient);
    //console.log("onClickModify e = ", e);
    //props.setCurrentComponent("ModifyPatient");
  };

  const onClickDelete = (e) => {
    const url = `http://localhost:8083/api/aevent/${e.target.id}`;
    //console.log("e.target = " + e.target);
    //console.log("e.target.id = " + e.target.id);
    axios
      .delete(url)
      .then(() => {
        refreshList();
        setActiveAEvent(0);
        console.log("Patient deleted");
      })
      .catch((e) => {
        console.log("error in axio fetch in onClickDelete patient function", e);
      });
  };

  const currentAEvent = aEvents[nbAEvent];
  console.log("CurrentAEvent= ", currentAEvent);
  console.log("nbAEvent = ", nbAEvent);
  return (
    <div className="list row">
      {/*<div className="col-md-12">
        {/* ************************************ */}
      {/* Here display the patient information */}{" "}
      {/*}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by event title"
            value={searchAEventTitle}
            onChange={onChangeSearchAEventTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={doSearchAEventTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div> */}
      <div className="col-md-6">
        {console.log("onGoingPatientName = ", onGoingPatientName)}
        {/*<h2
          style={{
            textAlign: "center",
            padding: "15px 0",
            color: "#149151",
          }}
        >
          Patient {onGoingPatientName}{" "}
        </h2> */}
        <h4 className="margeHaute lesMarges form-inline my-2 my-lg-0">
          {" "}
          Event list for {onGoingPatientName}
        </h4>
        <p> </p>
        <ul className="list-group">
          {aEvents &&
            aEvents
              .filter((aEvent) => aEvent.patientName === onGoingPatientName)
              .map((_aEvents, _index) => (
                <li
                  className={
                    "list-group-item " +
                    (_index === currentAEvent.index ? "active" : "")
                  }
                  data-index={_index}
                  onClick={() => setActiveAEvent(_index)}
                  key={_index}
                >
                  {_aEvents.aEventTitle}
                  {/*<button
                    type="button"
                    className={"btn btn-danger offset-sm-1"}
                    id={_aEvents.id}
                    onClick={onClickDelete}
                  >
                    X
                </button>*/}
                </li>
              ))}
        </ul>
      </div>
      <div className="col-md-6">
        {typeof currentAEvent != "undefined" ? (
          <div>
            {/* ******************************************************************* */}
            {/* Here is the condition to switch between display and modify Patients */}
            {/* ******************************************************************* */}
            {displayOrModify ? (
              <div>
                <h4>Event</h4>
                <div>
                  <label>
                    <strong>Patient: </strong>
                  </label>{" "}
                  {currentAEvent.patientName}
                </div>
                <div>
                  <label>
                    <strong>Event title:</strong>
                  </label>{" "}
                  {currentAEvent.aEventTitle}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentAEvent.aEventDesc}
                </div>
                <div>
                  <label>
                    <strong>Date:</strong>
                  </label>{" "}
                  {currentAEvent.aEventDt}
                </div>
                <p> </p>
                {/* <button
                  type="button"
                  className="edit-link btn btn-primary"
                  onClick={onClickModify}
                >
                  Modify
            </button> */}
              </div>
            ) : (
              <div>
                <ModifyAEvent
                  patientState={currentAEvent}
                  updatePatient={updateAEvent}
                />
                <button
                  className="edit-link
                   btn btn-primary col-sm-offset "
                  onClick={onClickModify}
                >
                  Display
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <br />
            <p>Please select an event to display or modify </p>
          </div>
        )}
      </div>
    </div>
  );
};
