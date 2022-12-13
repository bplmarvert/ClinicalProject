import React from "react";
import axios from "axios";

export const ModifyPatient = (props) => {
  const patient = props.patientState;
  const setCurrentPatient = props.updatePatient;

  const onChangePatientName = (e) => {
    setCurrentPatient({ ...patient, patientName: e.target.value });
  };

  const onChangeStudyName = (e) => {
    setCurrentPatient({ ...patient, studyName: e.target.value });
  };

  const onChangeBirthday = (e) => {
    setCurrentPatient({
      ...patient,
      birthday: e.target.value,
    });
  };

  const onChangeSex = (e) => {
    setCurrentPatient({ ...patient, sex: e.target.value });
  };

  const onChangeEmail = (e) => {
    setCurrentPatient({ ...patient, email: e.target.value });
  };

  const modifPatient = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8083/api/patient/${patient.id}`, patient)
      .then((resp) => {
        console.log("response = ", resp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h4> Patient to be modified </h4>
      <form onSubmit={modifPatient}>
        <div>
          <label className="unelargeur form-inline my-2 my-lg-0">
            <strong>Study Name:</strong>
          </label>{" "}
          <input
            type="text"
            required
            value={patient.studyName}
            onChange={onChangeStudyName}
          />
        </div>
        <div>
          <label className="unelargeur form-inline my-2 my-lg-0">
            <strong>Patient Name:</strong>
          </label>{" "}
          <input
            id={patient._id}
            type="text"
            required
            value={patient.patientName}
            onChange={onChangePatientName}
          />
        </div>
        <div>
          <label
            placeholder={patient.birthday}
            className="unelargeur form-inline my-2 my-lg-0"
          >
            <strong>Birthday: </strong>
          </label>{" "}
          <input
            id={patient._id}
            type="date"
            required
            value={toLocaleDateString(Date(patient.birthday))}
            onChange={onChangeBirthday}
          />
        </div>

        <div>
          <label className="unelargeur form-inline my-2 my-lg-0">
            {" "}
            <strong>Sex: </strong>
          </label>{" "}
          <input
            id={patient._id}
            type="text"
            required
            value={patient.sex}
            onChange={onChangeSex}
          />
        </div>
        <div>
          <label className="unelargeur form-inline my-2 my-lg-0">
            {" "}
            <strong>eMail: </strong>
          </label>{" "}
          <input
            id={patient._id}
            type="text"
            required
            value={patient.email}
            onChange={onChangeEmail}
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
