import React, { useState } from "react";
import { createStudy } from "../services/study.service";
import axios from "axios";

export const AddStudy = () => {
  const [state, setState] = useState({
    id: null,
    studyName: "",
    studyObjective: "",
    testedDrug: "",
    comparedDrug: "",
  });

  const handleSubmit = () => {
    let data = {
      studyName: state.studyName,
      studyObjective: state.studyObjective,
      testedDrug: state.testedDrug,
      comparedDrug: state.comparedDrug,
    };

    createStudy(data)
      .then((response) => {
        setState({
          id: response.data.id,
          studyName: response.data.studyName,
          studyObjective: response.data.studyObjective,
          published: response.data.published,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const saveStudy = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const onChangeStudyName = (e) => {
    setState({ ...state, studyName: e.target.value });
  };

  const onChangeStudyObjective = (e) => {
    setState({ ...state, studyObjective: e.target.value });
  };

  const onChangeTestedDrug = (e) => {
    setState({ ...state, testedDrug: e.target.value });
  };

  const onChangeComparedDrug = (e) => {
    setState({ ...state, comparedDrug: e.target.value });
  };

  const newStudy = () => {
    setState({
      id: null,
      studyName: "",
      studyObjective: "",
      published: false,
      submitted: false,
    });
  };

  return (
    <div className="submit-form">
      {state.submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newStudy}>
            Add
          </button>
        </div>
      ) : (
        <form id="enFlex add-study-form" onSubmit={saveStudy}>
          <div className="enFlex form-group ">
            <label
              className="margeHaute lesMarges form-inline my-2 my-lg-0"
              htmlFor="studyName"
            >
              Name of the study :
            </label>
            <input
              className="justeLaMargeHaute enFlex form-control form-inline my-2 my-lg-0"
              type="text"
              id="studyName"
              required
              value={state.studyName}
              onChange={onChangeStudyName}
              name="studyName"
            />
          </div>
          <div></div>
          <div className="form-group enFlex">
            <label
              htmlFor="studyObjective"
              className="margeHaute lesMarges form-inline my-2 my-lg-0"
            >
              Study Objective :
            </label>
            <input
              type="text"
              className="justeLaMargeHaute enFlex form-control form-inline my-2 my-lg-0"
              id="studyObjective"
              required
              value={state.studyObjective}
              onChange={onChangeStudyObjective}
              name="studyObjective"
            />
          </div>

          <div className="form-group">
            <label htmlFor="testedDrug">Drug to test :</label>
            <input
              type="text"
              className="form-control"
              id="testedDrug"
              required
              value={state.testedDrug}
              onChange={onChangeTestedDrug}
              name="testedDrug"
            />
          </div>

          <div className="form-group">
            <label htmlFor="studyObjective">Compared to drug :</label>
            <input
              type="text"
              className="form-control"
              id="comparedDrug"
              required
              value={state.comparedDrug}
              onChange={onChangeComparedDrug}
              name="comparedDrug"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};
