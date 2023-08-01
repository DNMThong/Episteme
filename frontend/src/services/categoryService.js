import { API_CATEGORY } from "../constants/api";
import { callGetAPI } from "./fetchApiService";

export const getCategories = async () => {
  const response = await callGetAPI(API_CATEGORY);

  return response.data;
};
