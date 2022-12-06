import React, { useEffect } from "react";
import axios from "axios";

export const ModifyStudy = (props) => {
  const study = props.studyState;
  const setStudy = props.setStudyState;
  const setCurrentComponent = props.setCurrentComponent;
  // initialisation of the new study

  useEffect(() => {
    console.log(study);
  }, [study]);

  const onChangeModifStudyName = (e) => {
    setStudy({ ...study, studyName: e.target.value });
  };

  const onChangeModifComparedDrug = (e) => {
    setStudy({ ...study, comparedDrug: e.target.value });
  };

  const onChangeModifTestedDrug = (e) => {
    setStudy({ ...study, testedDrug: e.target.value });
  };

  const onChangeModifStudyObjective = (e) => {
    setStudy({ ...study, studyObjective: e.target.value });
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
          <label>Study Name</label>
          <input
            id={study.id}
            type="text"
            required
            value={study.studyName}
            onChange={onChangeModifStudyName}
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
            id={study.id}
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
