import * as alertConstant from '../constants/alertConstant';

const alert=(state={},action)=>{
    console.log(action);
    switch(action.type){
        case alertConstant.SUCCESS:
            return {
                type:'alert-success',
                message:action.message
            }
        case alertConstant.ERROR:
            return{
                type:'alert-error',
                message:action.message
            }
        default:
            return state;
    }
}

export default alert;