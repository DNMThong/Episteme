import { API_USER } from "../constants/api";
import { callGetAPI } from "./fetchApiService";

export const getAuthors = async () => {
  const response = await callGetAPI(API_USER);

  return response.data;
};

export const searchAuthors = async (value) => {
  const response = await callGetAPI(`${API_USER}/search?q=${value}`);

  return response.data;
};
