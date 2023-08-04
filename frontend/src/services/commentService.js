import {
  callDeleteAPIAuthorization,
  callGetAPI,
  callPostAPIAuthorization,
  callPutAPIAuthorization,
} from "./fetchApiService";
import { API_POST } from "./../constants/api";

export const getCommentPost = async (postId) => {
  const response = await callGetAPI(`${API_POST}/${postId}/comments`);

  return response.data;
};

export const addCommentPost = async (postId, data) => {
  const response = await callPostAPIAuthorization(
    `${API_POST}/${postId}/comments`,
    data
  );

  return response.data;
};

export const addCommentReplyPost = async (postId, commentReplyId, data) => {
  const response = await callPostAPIAuthorization(
    `${API_POST}/${postId}/comments/reply/${commentReplyId}`,
    data
  );

  return response.data;
};

export const updateComment = async (postId, commentId, data) => {
  const response = await callPutAPIAuthorization(
    `${API_POST}/${postId}/comments/${commentId}`,
    data
  );

  return response.data;
};

export const deleteComment = async (postId, commentId) => {
  const response = await callDeleteAPIAuthorization(
    `${API_POST}/${postId}/comments/${commentId}`
  );

  return response.data;
};
