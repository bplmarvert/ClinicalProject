import React, { useEffect, useState } from "react";
import {
  getAEvent,
  updateAEvent,
  deleteAEvent,
} from "../services/aEvent.service";
import { useParams, useNavigate } from "react-router-dom";

export const AEvent = (props) => {
  const onGoingPatientName = props.onGoingPatient.patientName;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getAEvent(id)
      .then((response) => {
        setCurrentAEvent(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [currentAEvent, setCurrentAEvent] = useState({
    id: null,
    Name: props.onGoingpatient.patientName,
    aEventTitle: "",
    aEventDesc: "",
    aEventDt: "",
  });

  const [message, setMessage] = useState("");

  const onChangeAEventTitle = (e) => {
    setCurrentAEvent({
      ...currentAEvent,
      aEventTitle: e.target.value,
    });
  };

  const onChangeAEventDesc = (e) => {
    setCurrentAEvent({
      ...currentAEvent,
      aEventDesc: e.target.value,
    });
  };

  const onChangeAEventDt = (e) => {
    setCurrentAEvent({
      ...currentAEvent,
      aEventDt: e.target.value,
    });
  };

  const handleAEventUpdate = () => {
    updateAEvent(currentAEvent.id, currentAEvent)
      .then((response) => {
        console.log(response.data);
        setMessage("The event was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAEventDelete = () => {
    deleteAEvent(currentAEvent.id)
      .then((response) => {
        console.log(response.data);
        navigate("/aevent");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentAEvent ? (
        <div className="edit-form">
          <h4>Event</h4>
          <form>
            <div className="form-group">
              <label htmlFor="aEventName">Event title</label>
              <input
                type="text"
                className="form-control"
                id="aEventName"
                value={currentAEvent.aEventTitle}
                onChange={onChangeAEventTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="aEventDesc">Event Description</label>
              <input
                type="date"
                className="form-control"
                id="aEventDesc"
                value={currentAEvent.aEventDesc}
                onChange={onChangeAEventDesc}
              />
            </div>
            <div className="form-group">
              <label htmlFor="aEventDt">Date of the event</label>
              <input
                type="date"
                className="form-control"
                id="aEventDt"
                value={currentAEvent.aEventDt}
                onChange={onChangeAEventDt}
              />
            </div>
          </form>
          <button
            className="badge badge-danger mr-2 edit-link"
            onClick={handleAEventDelete}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={handleAEventUpdate}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an event...</p>
        </div>
      )}
    </div>
  );
};
