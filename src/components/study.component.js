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
    title: "",
    description: "",
    published: false,
  });
  const [message, setMessage] = useState("");

  const onChangeTitle = (e) => {
    const title = e.target.value;

    setCurrentStudy({
      ...currentStudy,
      title: title,
    });
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentStudy({
      ...currentStudy,
      description: description,
    });
  };

  const updatePublished = (status) => {
    var data = {
      id: currentStudy.id,
      title: currentStudy.title,
      description: currentStudy.description,
      published: status,
    };

    updateStudy(currentStudy.id, data)
      .then((response) => {
        setCurrentStudy({
          ...currentStudy,
          published: status,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
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

  return (
    <div>
      {currentStudy ? (
        <div className="edit-form">
          <h4>Study</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentStudy.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentStudy.description}
                onChange={onChangeDescription}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentStudy.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentStudy.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2 edit-link"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

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
