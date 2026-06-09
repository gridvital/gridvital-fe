import { getRequest, postRequest } from "../apiClient";
import { API_ROUTES } from "../../constants/apiRoutes";

export const fetchDashboardProducts = (payload) => {
  postRequest(API_ROUTES.DASHBOARD_PRODUCTS, payload);
};

export const fetchDashboardData = (payload) => {
  return getRequest(API_ROUTES.GET_DASHBOARD_DATA, payload);
};

export const callSkipNextPatient = (payload) => {
  return postRequest(API_ROUTES.CALL_NEXT_PATIENTS, payload);
};
