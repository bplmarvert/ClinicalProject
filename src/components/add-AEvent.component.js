import React, { useState } from "react";
import { createAEvent } from "../services/aEvent.service";

export const AddAEvent = (props) => {
  const onGoingPatientName = props.onGoingPatient.patientName;

  const [aEvent, setAEvent] = useState({
    id: null,
    patientName: onGoingPatientName,
    aEventTitle: "",
    aEventDesc: "",
    aEventDt: "",
  });

  const handleSubmit = () => {
    let data = {
      patientName: aEvent.patientName,
      aEventTitle: aEvent.aEventTitle,
      aEventDesc: aEvent.aEventDesc,
      aEventDt: aEvent.aEventDt,
    };
    console.log("Data = ", data);
    createAEvent(data)
      .then((response) => {
        setAEvent({
          id: response.data.id,
          patientName: response.data.patientName,
          aEventTitle: response.data.aEventTitle,
          aEventDesc: response.data.aEventDesc,
          aEventDt: response.data.aEventDt,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log("Error in add-aEvent.component createAEvent");
        console.log(e);
      });
  };

  const saveAEvent = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const onChangePatientName = (e) => {
    setAEvent({ ...aEvent, patientName: e.target.patientName });
  };

  const onChangeAEventTitle = (e) => {
    setAEvent({ ...aEvent, aEventTitle: e.target.value });
  };

  const onChangeAEventDesc = (e) => {
    setAEvent({ ...aEvent, aEventDesc: e.target.value });
  };

  const onChangeAEventDt = (e) => {
    setAEvent({ ...aEvent, aEventDt: e.target.value });
  };

  const onClickCreateAEvent = (e) => {
    props.setCurrentComponent("AddAEvent");
    setAEvent({
      id: "",
      aEventTitle: "",
      aEventDesc: "",
      aEventDt: "",
    });
  };

  return (
    <div className="submit-form">
      <form id="enFlex add-study-form" onSubmit={saveAEvent}>
        <div className="enFlex form-group">
          <label
            className="margeHaute lesMarges form-inline my-2 my-lg-0"
            htmlFor="patientName"
          >
            <strong>Patient Name:</strong>
          </label>
          <input
            className=" enFlex form-control form-inline my-2 my-lg-0"
            type="text"
            id="patientName"
            required
            value={aEvent.patientName}
            onChange={onChangePatientName}
            name="patientName"
          />
        </div>
        <div></div>
        <p> </p>
        <div className="enFlex form-group">
          <label
            className="margeHaute lesMarges form-inline my-2 my-lg-0"
            htmlFor="aEventTitle"
          >
            <strong>Title of the event:</strong>
          </label>
          <input
            className="justeLaMargeHaute enFlex form-control form-inline my-2 my-lg-0"
            type="text"
            id="aEventTitle"
            required
            value={aEvent.aEventTitle}
            onChange={onChangeAEventTitle}
            name="aEventTitle"
          />
        </div>
        <div></div>
        <p> </p>

        <div className="form-group enFlex">
          <label
            htmlFor="aEventDesc"
            className="margeHaute lesMarges largeurDate form-inline my-2 my-lg-0"
          >
            <strong>Event description :</strong>
          </label>
          <input
            type="text"
            className="justeLaMargeHaute enFlex form-control form-inline my-2 my-lg-0"
            id="aEventDesc"
            required
            value={aEvent.aEventDesc}
            onChange={onChangeAEventDesc}
            name="aEventDesc"
          />
        </div>
        <div></div>
        <p> </p>

        <div className="enFlex form-group">
          <label
            htmlFor="aEventDt"
            className="margeHaute lesMarges largeurDate form-inline my-2 my-lg-0"
          >
            <strong>Date :</strong>
          </label>
          <input
            type="date"
            className="form-control"
            id="aEventDt"
            required
            value={aEvent.aEventDt}
            onChange={onChangeAEventDt}
            name="aEventDt"
          />
        </div>
        <div></div>
        <p> </p>
        <button type="submit" className=" btn btn-success largeurBouton ">
          Submit
        </button>
        <button
          type="button"
          className="edit-link btn btn-primary"
          onClick={onClickCreateAEvent}
        >
          enter another event ?
        </button>
      </form>
    </div>
  );
};
