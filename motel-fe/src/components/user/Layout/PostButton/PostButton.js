import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import './PostButton.css';

const PostButton = () => {

    const auth=useSelector(state=>state.authReducer.loggedIn);
    const alert= useAlert();
    const goToPostPage=(event)=>{
        if(auth){
            console.log("go to post page");
        }
        else{
            alert.show("Đăng nhập để tạo tin rao", {
                timeout: 3000,
                type: 'error',
            });
            
        }
    }

    return (
        <div className="create-post-navbar">
            <div className="sub-main">
                <button className="create-post-btn" onClick={goToPostPage}>Đăng tin</button>
            </div>
        </div>
    )
}

export default PostButton;