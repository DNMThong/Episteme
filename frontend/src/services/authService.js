import { callPostAPI } from "./fetchApiService";

export const authentication = async (url, data) => {
   return await callPostAPI(url, data);
};
