import { getRequest, postRequest } from "../apiClient";
import { API_ROUTES } from "../../constants/apiRoutes";

export const patientQrRegister = (payload) => {
  return postRequest(API_ROUTES.PATIENT_QR_REGISTER, payload);
};

export const clinicDetailPublic = (clinicDisplayId) => {
  return getRequest(`${API_ROUTES.CLINIC_DETAILS_PUBLIC}/${clinicDisplayId}`);
};