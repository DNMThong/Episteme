import { API_POST, API_USER } from "../constants/api";
import { callGetAPI, callPostAPIAuthorization } from "./fetchApiService";

export const getPosts = async () => {
   const response = await callGetAPI(API_POST);

   return response.data;
};

export const getPostsByType = async ({
   type = undefined,
   pageNumber = 0,
   pageSize = 8,
   sortBy = "id",
   sortDir = "asc",
}) => {
   const typeParam = type ? `type=${type}` : "";
   const response = await callGetAPI(
      `${API_POST}?${typeParam}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
   );

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
