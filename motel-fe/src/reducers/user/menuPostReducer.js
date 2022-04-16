import postConstant from "../../constants/postConstant";

const initialState={
    content: [],
    pageNo: 0,
    pageSize: 0,
    totalElement: 0,
    totalPage: 0,
    last: false,
    first: false,
}

const menuPostReducer=(state=initialState, action )=>{
    switch (action.type) {
        case postConstant.GET_SHOWING_POSTS:
            return {
                content: action.page.content,
                pageNo: action.page.pageNo,
                pageSize: action.page.pageSize,
                totalElement: action.page.totalElements,
                totalPage: action.page.totalPages,
                last: action.page.last,
                first: action.page.first
            }
        
        default:
            return state;
    }
}

export default menuPostReducer;