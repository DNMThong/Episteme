import { API_USER_ADMIN } from "../constants/api";
import { callGetAPIAuthorization } from "./fetchApiService";

export const getUsersAdmin = async () => {
  const response = await callGetAPIAuthorization(API_USER_ADMIN);

  return response.data;
};
