import { API_POST, API_USER } from "../constants/api";
import { callGetAPI, callPostAPIAuthorization } from "./fetchApiService";

export const getPosts = async () => {
  const response = await callGetAPI(API_POST);

  return response.data;
};

export const getPostById = async (id) => {
  const response = await callGetAPI(`${API_POST}/${id}`);

  return response.data;
};

export const createPost = async (data, id) => {
  const response = await callPostAPIAuthorization(
    `${API_USER}/${id}/posts`,
    data
  );

  return response.data;
};
