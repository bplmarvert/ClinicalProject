import React, { useEffect, useState } from "react";
import {
  getPatient,
  updatePatient,
  deletePatient,
} from "../../services/patient.service";
import { useParams, useNavigate } from "react-router-dom";

export const Patient = (props) => {
  const onGoingStudyName = props.onGoingStudy.studyName;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPatient(id)
      .then((response) => {
        setCurrentPatient(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [currentPatient, setCurrentPatient] = useState({
    id: null,
    Name: props.onGoingStudy.studyName,
    patientName: "",
    birthday: "",
    sex: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const onChangePatientName = (e) => {
    setCurrentPatient({
      ...currentPatient,
      patientName: e.target.value,
    });
  };

  const onChangeBirthday = (e) => {
    setCurrentPatient({
      ...currentPatient,
      birthday: e.target.value,
    });
  };

  const onChangeSex = (e) => {
    setCurrentPatient({
      ...currentPatient,
      sex: e.target.value,
    });
  };

  const onChangeEmail = (e) => {
    setCurrentPatient({
      ...currentPatient,
      email: e.target.value,
    });
  };

  const handlePatientUpdate = () => {
    updatePatient(currentPatient.id, currentPatient)
      .then((response) => {
        console.log(response.data);
        setMessage("The Patient was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePatientDelete = () => {
    deletePatient(currentPatient.id)
      .then((response) => {
        console.log(response.data);
        navigate("/patient");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Cela ne passe jamais dans la pemière condition
  return (
    <div>
      {currentPatient ? (
        <div className="edit-form">
          <h4>Patient</h4>
          <form>
            <div className="form-group">
              <label htmlFor="patientName">Patient Name</label>
              <input
                type="text"
                className="form-control"
                id="patientName"
                value={currentPatient.patientName}
                onChange={onChangePatientName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                value={currentPatient.birthday}
                onChange={onChangeBirthday}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sex">Sex</label>
              <input
                type="text"
                className="form-control"
                id="sex"
                value={currentPatient.sex}
                onChange={onChangeSex}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">eMail</label>
              <input
                type="mail"
                className="form-control"
                id="email"
                value={currentPatient.email}
                onChange={onChangeEmail}
              />
            </div>
          </form>
          <button
            className="badge badge-danger mr-2 edit-link"
            onClick={handlePatientDelete}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={handlePatientUpdate}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Patient...</p>
        </div>
      )}
    </div>
  );
};
