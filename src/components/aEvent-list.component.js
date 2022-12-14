import React, { useEffect, useState } from "react";
import { getAEventsByPatient } from "../services/aEvent.service";
import "./study-list.component.css";
import axios from "axios";
import { ModifyAEvent } from "./ModifyAEvent.component";

export const AEventList = (props) => {
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

  useEffect(() => {
    retrieveAEvent();
  }, [props.onGoingPatient]);

  const updateAEvent = (aEvent) => {
    let newData = [...aEvents];
    newData[nbAEvent] = aEvent;
    setAEvents(newData);
  };

  const refreshList = () => {
    retrieveAEvent();
  };

  const setActiveAEvent = (index) => {
    setNbAEvent(index);
  };

  const doSearchAEventTitle = (e) => {
    console.log("fonction doSearchAEventTitle e = ", e);
    e.preventDefault();
  };

  const onClickModify = (e) => {
    setDisplayOrModify(!displayOrModify);
  };

  const onClickDelete = (e) => {
    const url = `http://localhost:8083/api/aevent/${e.target.id}`;
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
      <div className="col-md-6">
        <h4 className="margeHaute lesMarges form-inline my-2 my-lg-0">
          {" "}
          Event list for {onGoingPatientName}
        </h4>
        <p> </p>
        <ul className="list-group">
          {aEvents &&
            aEvents.map((_aEvents, _index) => (
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
                  {currentAEvent.aEventDt.substr(0, 10)}
                </div>
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
