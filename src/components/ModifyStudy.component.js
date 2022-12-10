import React from "react";
import axios from "axios";

export const ModifyStudy = (props) => {
  const study = props.studyState;
  const setCurrentStudy = props.updateStudy;

  const onChangeStudyName = (e) => {
    setCurrentStudy({ ...study, studyName: e.target.value });
  };

  const onChangeComparedDrug = (e) => {
    setCurrentStudy({ ...study, comparedDrug: e.target.value });
  };

  const onChangeTestedDrug = (e) => {
    setCurrentStudy({ ...study, testedDrug: e.target.value });
  };

  const onChangeStudyObjective = (e) => {
    setCurrentStudy({ ...study, studyObjective: e.target.value });
  };

  const modifStudy = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8083/api/study/${study.id}`, study)
      .then((resp) => {
        console.log("response = ", resp);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <h2> Study to be modified </h2>
      <form onSubmit={modifStudy}>
        <div>
          <label>
            <strong>Study Name:</strong>
          </label>{" "}
          <input
            id={study._id}
            type="text"
            className={"margin:10px"}
            required
            value={study.studyName}
            onChange={onChangeStudyName}
          />
        </div>
        <div>
          <label>
            <strong>Study Objectives: </strong>
          </label>{" "}
          <input
            type="text"
            required
            value={study.studyObjective}
            onChange={onChangeStudyObjective}
          />
        </div>
        <div>
          <label>
            <strong>Tested Drug: </strong>
          </label>{" "}
          <input
            id={study._id}
            type="text"
            required
            value={study.testedDrug}
            onChange={onChangeTestedDrug}
          />
        </div>

        <div>
          <label>
            {" "}
            <strong>Drug compared with: </strong>{" "}
          </label>{" "}
          <input
            id={study._id}
            type="text"
            className="Align-text-center"
            required
            value={study.comparedDrug}
            onChange={onChangeComparedDrug}
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
