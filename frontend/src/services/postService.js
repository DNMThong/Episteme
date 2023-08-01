import { API_POST, API_USER } from "../constants/api";
import { callGetAPI, callPostAPIAuthorization } from "./fetchApiService";

// cố lên cố tôi tin cốt sẽ code nốt phần còn lại
// tôi đã tạo 1 số service giúp cốt
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
