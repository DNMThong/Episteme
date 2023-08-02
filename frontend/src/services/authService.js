import { API_LOGIN, API_REGISTER } from "../constants/api";
import { callPostAPI } from "./fetchApiService";

export const register = async (data) => {
   return await callPostAPI(API_REGISTER, data);
};

export const login = async (data) => {
   return await callPostAPI(API_LOGIN, data);
};
