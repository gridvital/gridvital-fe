import api from "../config/axios"

export const postRequest = async (url, data) => {
  try {
    return await api.post(url, data)
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return false;
  }

}

export const getRequest = async (url, params) => {
  try {
    return await api.get(url, { params })
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return false;
  }

}

export const putRequest = async (url, data) => {
  try {
    return await api.put(url, data)
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return false;
  }

}

export const deleteRequest = async (url, params) => {
  try {
    return await api.delete(url, { params })
  } catch (error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return false;
  }

}