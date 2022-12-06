import React, { useEffect, useState } from "react";
import axios from "axios";

export const ModifyStudy = (props) => {
  const study = props.studyState;
  /*const studies = props.studies;
  const setStudies = props.setStudies;*/

  //const setCurrentComponent = props.setCurrentComponent;
  // initialisation of the new study
  const [state, setState] = useState({
    id: null,
    studyName: "",
    studyObjective: "",
    testedDrug: "",
    comparedDrug: "",
  });

  useEffect(() => {
    console.log(study);
  }, [study]);

  const [currentStudy, setCurrentStudy] = useState({
    id: null,
    studyName: "",
    studyObjective: "",
    testedDrug: "",
    comparedDrug: "",
  });

  const onChangeStudyName = (e) => {
    setState({ ...state, studyName: e.target.value });
  };

  const onChangeModifComparedDrug = (e) => {
    setState({ ...state, comparedDrug: e.target.value });
  };

  const onChangeModifTestedDrug = (e) => {
    setState({ ...state, testedDrug: e.target.value });
  };

  const onChangeModifStudyObjective = (e) => {
    setState({ ...state, studyObjective: e.target.value });
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
      {console.log("props = ", props)}
      {console.log("study = ", study)}
      <h2> Study to be modified </h2>
      <form onSubmit={modifStudy}>
        <div>
          <label>Study Name</label>
          <input
            id={study._id}
            type="text"
            required
            value={study.studyName}
            onChange={onChangeStudyName}
          />
        </div>
        <div>
          <label>Study Objectives</label>
          <input
            type="text"
            required
            value={study.studyObjective}
            onChange={onChangeModifStudyObjective}
          />
        </div>
        <div>
          <label>Tested Drug</label>
          <input
            id={study._id}
            type="text"
            required
            value={study.testedDrug}
            onChange={onChangeModifTestedDrug}
          />
        </div>

        <div>
          <label> Drug compared with </label>
          <input
            id={study.id}
            type="text"
            required
            value={study.comparedDrug}
            onChange={onChangeModifComparedDrug}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};