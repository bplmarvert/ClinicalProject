import React from "react";
import axios from "axios";

export const ModifyAEvent = (props) => {
  const aEvent = props.aEventState;
  const setCurrentAEvent = props.updateAEvent;

  const onChangePatientName = (e) => {
    setCurrentAEvent({ ...aEvent, patientName: e.target.value });
  };

  const onChangeAEventTitle = (e) => {
    setCurrentAEvent({ ...aEvent, aEventTitle: e.target.value });
  };

  const onChangeAEventDesc = (e) => {
    setCurrentAEvent({ ...aEvent, aEventDesc: e.target.value });
  };

  const onChangeAEventDt = (e) => {
    setCurrentAEvent({ ...aEvent, aEventDt: e.target.value });
  };

  const modifAEvent = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8083/api/aevent/${aEvent.id}`, aEvent)
      .then((resp) => {
        console.log("response = ", resp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h4> Event to be modified </h4>
      <form onSubmit={modifAEvent}>
        <div>
          <label className="unelargeur form-inline my-2 my-lg-0">
            Patient Name:
          </label>{" "}
          <input
            type="text"
            required
            value={aEvent.patientName}
            onChange={onChangePatientName}
          />
        </div>
        <div>
          <label className="unelargeur form-inline my-2 my-lg-0">
            Event Title:
          </label>{" "}
          <input
            id={aEvent._id}
            type="text"
            required
            value={aEvent.aEventTitle}
            onChange={onChangeAEventTitle}
          />
        </div>

        <div>
          <label className="unelargeur form-inline my-2 my-lg-0">
            Event Description:
          </label>{" "}
          <input
            id={aEvent._id}
            type="text"
            required
            value={aEvent.aEventDesc}
            onChange={onChangeAEventDesc}
          />
        </div>

        <div>
          <label className="unelargeur form-inline my-2 my-lg-0">
            {" "}
            Date of Event:{" "}
          </label>{" "}
          <input
            id={aEvent._id}
            type="date"
            required
            value={aEvent.aEventDt}
            onChange={onChangeAEventDt}
          />
        </div>
        <p> </p>

        <button
          type="submit"
          className="edit-link btn btn-primary col-sm-offset "
        >
          Submit
        </button>
        <p> </p>
      </form>
    </>
  );
};
