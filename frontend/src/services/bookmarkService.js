import { API_BOOKMARK } from "../constants/api";
import {
  callDeleteAPIAuthorization,
  callPostAPIAuthorization,
} from "./fetchApiService";

export const addBookmark = async (bookmark) => {
  const response = await callPostAPIAuthorization(API_BOOKMARK, bookmark);

  return response.data;
};

export const removeBookmark = async (bookmark) => {
  const response = await callDeleteAPIAuthorization(API_BOOKMARK, bookmark);

  return response.data;
};
