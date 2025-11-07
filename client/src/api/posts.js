import axios from "axios";

export const getPosts = async () => {
  return axios.get("/posts", {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};

export const createPost = async (data) => {
  return axios.post("/posts", data, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};

export const updatePost = async (id, data) => {
  return axios.put(`/posts/${id}`, data, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};

export const deletePost = async (id) => {
  return axios.delete(`/posts/${id}`, {
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
};
