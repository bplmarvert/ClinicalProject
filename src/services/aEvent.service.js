import http from "../http-common";

export const getAllAEvents = () => {
  return http.get("/aevent/findAll");
};

export const getAEvent = (id) => {
  return http.get(`/aevent/${id}`);
};

export const createAEvent = (data) => {
  console.log("data in aEvent.service.js createAEvent", data);
  return http.post("/aevent/create", data);
};

export const updateAEvent = (id, data) => {
  console.log("sending", data);
  return http.put(`/aevent/${id}`, data);
};

export const deleteAEvent = (id) => {
  return http.delete(`/aevent/${id}`);
};

export const findAEventbyTitle = (aEventTitle) => {
  return http.get(`/aevent/findAll?aEventTitle=${aEventTitle}`);
};

export const getAEventsByPatient = (onGoingPatientName) => {
  return http.get(`/aevent/findByPatient/${onGoingPatientName}`);
};
