import React, { useState } from "react";
import { createPatient } from "../../services/patient.service";

export const AddPatient = (props) => {
  const onGoingStudyName = props.onGoingStudy.studyName;

  const [patient, setPatient] = useState({
    id: null,
    studyName: onGoingStudyName,
    patientName: "",
    birthday: "",
    sex: "",
    email: "",
  });

  const handleSubmit = () => {
    let data = {
      studyName: patient.studyName,
      patientName: patient.patientName,
      birthday: patient.birthday,
      sex: patient.sex,
      email: patient.email,
    };
    console.log("Data = ", data);
    createPatient(data)
      .then((response) => {
        setPatient({
          id: response.data.id,
          studyName: response.data.studyName,
          patientName: response.data.patientName,
          birthday: response.data.birthday,
          sex: response.data.sex,
          email: response.data.email,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log("Error in add-patient.component createPatient");
        console.log(e);
      });
  };

  const savePatient = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const onChangeStudyName = (e) => {
    setPatient({ ...patient, studyName: e.target.studyName });
  };

  const onChangePatientName = (e) => {
    setPatient({ ...patient, patientName: e.target.value });
  };

  const onChangeBirthday = (e) => {
    setPatient({ ...patient, birthday: e.target.value });
  };

  const onChangeSex = (e) => {
    setPatient({ ...patient, sex: e.target.value.toUpperCase() });
  };

  const onChangeEmail = (e) => {
    setPatient({ ...patient, email: e.target.value });
  };

  return (
    <div className="submit-form">
      {console.log("props = ", props)}
      {console.log("onGoingStudyName = ", onGoingStudyName)}
      <form id="enFlex add-study-form" onSubmit={savePatient}>
        <div className="enFlex form-group">
          <label
            className="margeHaute lesMarges form-inline my-2 my-lg-0"
            htmlFor="studyName"
          >
            <strong>Study Name:</strong>
          </label>
          <input
            className=" enFlex form-control form-inline my-2 my-lg-0"
            type="text"
            id="studyName"
            required
            value={patient.studyName}
            onChange={onChangeStudyName}
            name="studyName"
          />
        </div>
        <div></div>
        <p> </p>
        <div className="enFlex form-group">
          <label
            className="margeHaute lesMarges form-inline my-2 my-lg-0"
            htmlFor="patientName"
          >
            <strong>Patient name:</strong>
          </label>
          <input
            className="justeLaMargeHaute enFlex form-control form-inline my-2 my-lg-0"
            type="text"
            id="patientName"
            required
            value={patient.patientName}
            onChange={onChangePatientName}
            name="patientName"
          />
        </div>
        <div></div>
        <p> </p>

        <div className="form-group enFlex">
          <label
            htmlFor="birthday"
            className="margeHaute lesMarges largeurDate form-inline my-2 my-lg-0"
          >
            <strong>Date of birth :</strong>
          </label>
          <input
            type="date"
            className="justeLaMargeHaute enFlex form-control form-inline my-2 my-lg-0"
            id="birthday"
            required
            value={patient.birthday}
            onChange={onChangeBirthday}
            name="birthday"
          />
        </div>
        <div></div>
        <p> </p>

        <div className="enFlex form-group">
          <label
            htmlFor="sex"
            className="margeHaute lesMarges largeurDate form-inline my-2 my-lg-0"
          >
            <strong>Sex (M/F) :</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="sex"
            maxLength={1}
            required
            value={patient.sex}
            onChange={onChangeSex}
            name="sex"
          />
        </div>
        <div></div>
        <p> </p>

        <div className="enFlex form-group">
          <label
            htmlFor="email"
            className="margeHaute lesMarges largeurDate form-inline my-2 my-lg-0"
          >
            <strong>email :</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            required
            value={patient.email}
            onChange={onChangeEmail}
            name="email"
          />
        </div>
        <div></div>
        <p> </p>

        <button type="submit" className=" btn btn-success largeurBouton ">
          Submit
        </button>
      </form>
    </div>
  );
};
