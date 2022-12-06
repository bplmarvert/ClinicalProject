import React, { useEffect, useState } from "react";
import { getStudy, updateStudy, deleteStudy } from "../services/study.service";
import { useParams, useNavigate } from "react-router-dom";

export const Study = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getStudy(id)
      .then((response) => {
        setCurrentStudy(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const [currentStudy, setCurrentStudy] = useState({
    id: null,
    studyName: "",
    studyObjective: "",
    testedDrug: "",
    comparedDrug: "",
  });

  const [message, setMessage] = useState("");

  const onChangeStudyName = (e) => {
    const studyName = e.target.value;
    setCurrentStudy({
      ...currentStudy,
      studyName: studyName,
    });
  };

  const onChangeStudyObjective = (e) => {
    const studyObjective = e.target.value;
    setCurrentStudy({
      ...currentStudy,
      studyObjective: studyObjective,
    });
  };

  const handleStudyUpdate = () => {
    updateStudy(currentStudy.id, currentStudy)
      .then((response) => {
        console.log(response.data);
        setMessage("The Study was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleStudyDelete = () => {
    deleteStudy(currentStudy.id)
      .then((response) => {
        console.log(response.data);
        navigate("/study");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Cela ne passe jamais dans la pemière condition
  return (
    <div>
      {currentStudy ? (
        <div className="edit-form">
          <h4>Study</h4>
          <form>
            <div className="form-group">
              <label htmlFor="studyName">Study Name</label>
              <input
                type="text"
                className="form-control"
                id="studyName"
                value={currentStudy.studyName}
                onChange={onChangeStudyName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="studyObjective">Study Objective</label>
              <input
                type="text"
                className="form-control"
                id="studyObjective"
                value={currentStudy.studyObjective}
                onChange={onChangeStudyObjective}
              />
            </div>
          </form>
          <button
            className="badge badge-danger mr-2 edit-link"
            onClick={handleStudyDelete}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={handleStudyUpdate}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Study...</p>
        </div>
      )}
    </div>
  );
};
