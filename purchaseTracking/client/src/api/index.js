import axios from "axios";
const path = 'http://localhost:5000/'
export const login = (loginData) =>
  axios.post(`auth/login`, loginData);