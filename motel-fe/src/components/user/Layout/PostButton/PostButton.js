import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import './PostButton.css';

const PostButton = () => {

    const auth = useSelector(state => state.authReducer.loggedIn);
    const history = useHistory();

    const goToPostPage = (event) => {
        if (!auth) {
            history.replace("/login");
        }
        else{
            history.replace("/home/user/posts/create-post")
        }
    }

    return (
        <div className="create-post-navbar">
            <div className="sub-main">
                {/* <Link to="home/user/posts/create-post"> */}
                    <button className="create-post-btn" onClick={goToPostPage}>Đăng tin</button>
                {/* </Link> */}
            </div>
        </div>
    )
}

export default PostButton;