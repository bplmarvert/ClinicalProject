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
    setCurrentPatient({ ...patient, birthday: e.target.value });
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
      <h2> Patient to be modified </h2>
      <form onSubmit={modifPatient}>
        <div>
          <label className="unelargeur form-inline my-2 my-lg-0">
            Study Name:
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
            Patient Name:
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
          <label className="unelargeur form-inline my-2 my-lg-0">
            Birthday:
          </label>{" "}
          <input
            id={patient._id}
            type="text"
            required
            value={patient.birthday}
            onChange={onChangeBirthday}
          />
        </div>

        <div>
          <label className="unelargeur form-inline my-2 my-lg-0"> Sex: </label>{" "}
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
            eMail:{" "}
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
