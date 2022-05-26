import postConstant from "../constants/postConstant";

const initialState=[]

const typePostsReducer=(state=initialState, action)=>{
    switch (action.type) {
        case postConstant.GET_RELATED_POSTS:
            return action.data;
        default:
            return state;
    }

}

export default typePostsReducer;