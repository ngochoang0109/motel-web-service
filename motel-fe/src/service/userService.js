import callAPI from "../utils/callAPI";

const registerUser=(user)=>{
  console.log(user)
    return callAPI("auth/signup","POST",user)
            .then((response)=>{
                return response.data;
              });
}


export const userService={
    registerUser
}