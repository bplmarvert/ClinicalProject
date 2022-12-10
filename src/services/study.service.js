import http from "../http-common";

export const getAllStudies = () => {
  return http.get("/study/findAll");
};

export const getStudy = (id) => {
  return http.get(`/study/${id}`);
};

export const createStudy = (data) => {
  return http.post("/study/create", data);
};

export const updateStudy = (id, data) => {
  console.log("sending", data);
  return http.put(`/study/${id}`, data);
};

export const deleteStudy = (id) => {
  return http.delete(`/study/${id}`);
};

export const findStudyByStudyName = (studyName) => {
  return http.get(`/study/findAll?studyName=${studyName}`);
};
