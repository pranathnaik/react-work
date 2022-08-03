import http from "./HttpRequests";

const baseURL = "http://localhost:5002";

export const GetAllUsers = () => http.get(`${baseURL}/users`);

export const SearchUserByUserName = (username) => {
  return http.get(`${baseURL}/users/${username}`);
};
export const CreateUser = (user) => {
  return http.post(`${baseURL}/users/`, user);
};

export const DeleteUser = (username) => {
  return http.delete(`${baseURL}/users/${username}`);
};

export const UpdateUserData = (username, user) => {
  return http.put(`${baseURL}/users/${username}`, user);
};
