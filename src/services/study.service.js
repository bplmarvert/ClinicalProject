import http from "../http-common";

export const getAllStudies = () => {
  let token = localStorage.getItem("token");
  //console.log("Token = ", token);
  return http.get("/study/findAll"); //, , headers: { token: token.token});
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
