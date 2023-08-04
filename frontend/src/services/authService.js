import { API_AUTH, API_USER } from "../constants/api";
import { callGetAPI, callPostAPI } from "./fetchApiService";

export const register = async (data) => {
  return await callPostAPI(`${API_AUTH}/register`, data);
};

export const login = async (data) => {
  return await callPostAPI(`${API_AUTH}/login`, data);
};

export const getUserWithToken = async (token) => {
  const response = await callGetAPI(`${API_USER}/token/${token}`);

  return response.data;
};
