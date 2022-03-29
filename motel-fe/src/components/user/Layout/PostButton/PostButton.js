import { useAlert } from 'react-alert';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './PostButton.css';

const PostButton = () => {

    const auth = useSelector(state => state.authReducer.loggedIn);
    const alert = useAlert();
    const history = useHistory();

    const goToPostPage = (event) => {
        if (auth) {
            history.push("home/posts/create-post")
        }
        else {
            
            alert.show("Đăng nhập để tạo tin rao", {
                timeout: 2500,
                type: 'error',
                onClose: () => {
                    history.push("/login");
                }
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