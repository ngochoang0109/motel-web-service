import userConstant from "../../constants/userConstant";


const initialState = {role:[]};

const userInfor = (state = initialState, action) => {
    switch (action.type) {
        case userConstant.USER_INFOR:
            return {
                fullName:action.user.fullName,
                phone: action.user.phone,
                role: action.user.roles
            }
        default:
            return state;
    }
}

export default userInfor;