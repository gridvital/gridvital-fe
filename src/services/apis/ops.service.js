import { postRequest } from "../apiClient";

export const opsLogin = (payload) => {
  return postRequest("/api/ops/login", payload);
};

export const opsClinicsList = (payload) => {
  return postRequest("/api/ops/clinics-list", payload);
};

export const opsClinicDetails = (payload) => {
  return postRequest("/api/ops/clinic-details", payload);
};

export const opsManageSubscription = (payload) => {
  return postRequest("/api/ops/manage-subscription", payload);
};

export const opsDeleteClinic = (payload) => {
  return postRequest("/api/ops/delete-clinic", payload);
};

export const opsRegisterRM = (payload) => {
  return postRequest("/api/ops/register-rm", payload);
};

export const opsRMsList = (payload) => {
  return postRequest("/api/ops/rms-list", payload);
};

export const opsDeleteRM = (payload) => {
  return postRequest("/api/ops/delete-rm", payload);
};
