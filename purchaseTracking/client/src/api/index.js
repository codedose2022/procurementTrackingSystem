import axios from "axios";

export const login = (loginData) => axios.post(`auth/login`, loginData);
export const sendResetLink = (username) =>
  axios.post(`auth/sendResetLink`, username);
export const resetPassword = (pwd) => axios.post(`auth/resetPassword`, pwd);
export const isTokenValid = (token) =>
  axios.post(`auth/isTokenValid`, null, { headers: { "x-auth-token": token } });

export const getServiceRequests = (userId,token ) =>
  axios.post(`serviceRequests/getServiceRequests`, userId, {
    headers: { "x-auth-token": token },
  });
