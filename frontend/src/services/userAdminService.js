import { API_USER_ADMIN } from "../constants/api";
import {
  callGetAPIAuthorization,
  callPostAPIAuthorization,
  callPutAPIAuthorization,
} from "./fetchApiService";

export const getUsersAdmin = async () => {
  const response = await callGetAPIAuthorization(API_USER_ADMIN);

  return response.data;
};

export const addUsersAdmin = async (data) => {
  const response = await callPostAPIAuthorization(API_USER_ADMIN, data);

  return response.data;
};

export const updateUsersAdmin = async (id, data) => {
  const response = await callPutAPIAuthorization(
    `${API_USER_ADMIN}/${id}`,
    data
  );

  return response.data;
};
