import { API_USER_ADMIN } from "../constants/api";
import {
  callGetAPIAuthorization,
  callPostAPIAuthorization,
} from "./fetchApiService";

export const getUsersAdmin = async () => {
  const response = await callGetAPIAuthorization(API_USER_ADMIN);

  return response.data;
};

export const addUsersAdmin = async (value) => {
  const response = await callPostAPIAuthorization(API_USER_ADMIN, value);

  return response.data;
};
