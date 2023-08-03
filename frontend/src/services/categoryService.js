import { API_CATEGORY, API_CATEGORY_ADMIN } from "../constants/api";
import {
  callDeleteAPIAuthorization,
  callGetAPI,
  callPostAPIAuthorization,
} from "./fetchApiService";

export const getCategories = async () => {
  const response = await callGetAPI(API_CATEGORY);

  return response.data;
};

export const addCategory = async (data) => {
  const response = await callPostAPIAuthorization(API_CATEGORY_ADMIN, data);

  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await callDeleteAPIAuthorization(
    `${API_CATEGORY_ADMIN}/${id}`
  );

  return response.data;
};
