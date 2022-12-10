import http from "../http-common";

export const getAllPatients = () => {
  return http.get("/patient/findAll");
};

export const getPatient = (id) => {
  return http.get(`/patient/${id}`);
};

export const createPatient = (data) => {
  console.log(data);
  return http.post("/patient/create", data);
};

export const updatePatient = (id, data) => {
  console.log("sending", data);
  return http.put(`/patient/${id}`, data);
};

export const deletePatient = (id) => {
  return http.delete(`/patient/${id}`);
};

export const findPatientByPatientName = (patientName) => {
  return http.get(`/patient/findAll?patientName=${patientName}`);
};
