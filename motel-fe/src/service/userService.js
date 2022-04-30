import { authHeader } from "../helper/authHeader";
import callAPI from "../utils/callAPI";

const registerUser = (user) => {
  return callAPI({},"auth/signup", "POST", user)
    .then((response) => {
      return response.data;
    })
    .catch((error)=>{
      return error.response.data;
    });
}

const loginUser = (user) => {
  return callAPI({},"auth/signin","POST",user);
}

const logout=()=> {
  // remove user from local storage to log user out
  localStorage.removeItem('tokenUser');
}

const getTokenUser=()=>{
  let user = JSON.parse(localStorage.getItem('tokenUser'));
  return user;
}

const getCurrentUser=()=>{
  const headers=authHeader()
  return callAPI(headers,"users", "GET");
}

export const userService = {
  loginUser,
  registerUser,
  logout,
  getTokenUser,
  getCurrentUser
}