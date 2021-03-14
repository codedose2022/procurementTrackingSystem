import axios from "axios";

export const login = (loginData) => axios.post(`auth/login`, loginData);
export const sendResetLink = (email) => axios.post(`auth/sendResetLink`, email);
export const resetPassword = (pwd) => axios.post(`auth/resetPassword`, pwd);
