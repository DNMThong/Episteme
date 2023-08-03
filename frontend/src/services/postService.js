import { API_POST, API_USER, API_USER_ADMIN } from "../constants/api";
import {
  callDeleteAPIAuthorization,
  callGetAPI,
  callPostAPIAuthorization,
  callPutAPIAuthorization,
} from "./fetchApiService";

export const getPosts = async () => {
  const response = await callGetAPI(API_POST);

  return response.data;
};

export const getPostById = async (id) => {
  const response = await callGetAPI(`${API_POST}/${id}`);

  return response.data;
};

export const getPostBySlug = async (slug) => {
  const response = await callGetAPI(`${API_POST}/by-slug/${slug}`);

  return response.data;
};

export const createPost = async (data, id) => {
  const response = await callPostAPIAuthorization(
    `${API_USER}/${id}/posts`,
    data
  );

  return response.data;
};

export const updatePost = async (id, data) => {
  const response = await callPutAPIAuthorization(`${API_POST}/${id}`, data);

  return response.data;
};

export const deletePost = async (id) => {
  const response = await callDeleteAPIAuthorization(`${API_POST}/${id}`);

  return response.data;
};
