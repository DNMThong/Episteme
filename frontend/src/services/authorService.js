import { API_USER } from "../constants/api";
import { callGetAPI } from "./fetchApiService";

export const getAuthors = async () => {
   const response = await callGetAPI(API_USER);

   return response.data;
};

export const getPostsOfAuthor = async (userId) => {
   const response = await callGetAPI(`${API_USER}/${userId}/posts`);

   return response.data;
};

export const searchAuthors = async (value) => {
   const response = await callGetAPI(`${API_USER}/search?q=${value}`);

   return response.data;
};

export const getAllPostOfAuthor = async (id) => {
   const response = await callGetAPI(`${API_USER}/${id}/posts`);

   return response.data;
};

export const getAllDraftOfAuthor = async (id) => {
   const response = await callGetAPI(`${API_USER}/${id}/drafts`);

   return response.data;
};

export const getFollowingsOfAuthor = async (id) => {
   const response = await callGetAPI(`${API_USER}/${id}/followings`);

   return response.data;
};

export const getFollowersOfAuthor = async (id) => {
   const response = await callGetAPI(`${API_USER}/${id}/followers`);

   return response.data;
};
