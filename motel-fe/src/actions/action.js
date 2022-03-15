import { ADD } from "../../constants/ActionType"



export const add = (data) =>dispatch=>{

 return{
    type:ADD,
    payload:{
     data:data
    }
 }
}