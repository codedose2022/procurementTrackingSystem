import axios from "axios";

export const login = (loginData) => axios.post(`auth/login`, loginData);
export const sendResetLink = (username) =>
  axios.post(`auth/sendResetLink`, username);
export const resetPassword = (pwd) => axios.post(`auth/resetPassword`, pwd);
export const isTokenValid = (token) =>
  axios.post(`auth/isTokenValid`, null, { headers: { "x-auth-token": token } });
export const changePassword = (changePasswordData, token) =>
  axios.post(`auth/changePassword`, changePasswordData, {
    headers: { "x-auth-token": token },
  });

export const getServiceRequests = (userId, token) =>
  axios.post(`serviceRequests/getServiceRequests`, userId, {
    headers: { "x-auth-token": token },
  });

export const getUsers = (token) =>
  axios.post(`adminActions/getUsers`, null, {
    headers: { "x-auth-token": token },
  });
export const deleteUser = (id, token) =>
  axios.post(`adminActions/deleteUser`, id, {
    headers: { "x-auth-token": token },
  });
export const createUser = (userData, token) =>
  axios.post(`adminActions/createUser`, userData, {
    headers: { "x-auth-token": token },
  });
