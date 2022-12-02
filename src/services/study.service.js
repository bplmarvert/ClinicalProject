import axios from "axios";
import http from "../http-common";

export const getAllStudies = () => {
  return http.get("/findAll");
};

export const getStudy = (id) => {
  return http.get(`/${id}`);
};

export const createStudy = (data) => {
  return http.post("/create", data);
};

export const updateStudy = (id, data) => {
  console.log("sending", data);
  return http.put(`/${id}`, data);
};

export const deleteStudy = (id) => {
  return http.delete(`/${id}`);
};

export const findStudyByStudyName = (studyName) => {
  return http.get(`/findAll?studyName=${studyName}`);
};
