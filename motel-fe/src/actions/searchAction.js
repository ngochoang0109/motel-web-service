import searchConstant from "../constants/searchConstant";

const addCriteriaSearch = (param) => {
    console.log(param)
    return (dispatch) => {
        return dispatch({
            type:searchConstant.ADD_CRITERIA,
            criteria:{type:searchConstant.ADD_CRITERIA,
                    param:[param]}
        })
    }
}


export const searchAction = {
    addCriteriaSearch
};