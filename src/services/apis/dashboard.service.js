import { getRequest, postRequest } from "../apiClient";
import { API_ROUTES } from "../../constants/apiRoutes";

export const fetchDashboardProducts = (payload) => {
  postRequest(API_ROUTES.DASHBOARD_PRODUCTS, payload);
};

export const fetchDashboardData = (payload) => {
  return getRequest(API_ROUTES.GET_DASHBOARD_DATA, payload);
};

export const fetchTodayPatients = (payload) => {
  return getRequest(API_ROUTES.TODAY_PATIENT, payload);
};

export const fetchPatientHistory = (payload) => {
  return postRequest(API_ROUTES.PATIENT_HISTORY, payload);
};

export const fetchPatientAllDetails = (payload) => {
  return postRequest(API_ROUTES.PATIENT_ALL_DETAILS, payload);
};

export const fetchTodayPatientsDetails = (payload) => {
  return postRequest(API_ROUTES.TODAY_PATIENT_DETAILS, payload);
};

export const callSkipNextPatient = (payload) => {
  return postRequest(API_ROUTES.CALL_NEXT_PATIENTS, payload);
};

export const addPrescription = (payload) => {
  return postRequest(API_ROUTES.ADD_PRESCRIPTION, payload);
};

export const fetchClinicProfile = () => {
  return getRequest(API_ROUTES.CLINIC_PROFILE);
};

export const fetchSubscription = () => {
  return getRequest(API_ROUTES.SUBSCRIPTION);
};

export const currentConsulattionStatus = (payload) => {
  return getRequest(API_ROUTES.CURRENT_CONSULTATION_STATUS, payload);
};
