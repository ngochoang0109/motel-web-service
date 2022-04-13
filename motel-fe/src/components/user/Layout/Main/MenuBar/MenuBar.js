import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './MenuBar.css';

const MenuBar = (props) => {

    const posts=useSelector(state=>state.postsReducer.content);

    return (
        <>
            <div className="title">
                <h1>Quản lý tin</h1>
            </div>
            <div className="overlinegrow section">
                <Link to="/home/user/posts/list-posts" className="hvr-overline-from-center red">Đang Hiển Thị({posts.length})</Link>
                <Link to="/home/user/posts/list-posts" className="hvr-overline-from-center green">Bị Từ Chối(0)</Link>
                <Link to="/home/user/posts/list-posts" className="hvr-overline-from-center orange">Cần Thanh Toán(0)</Link>
                <Link to="/home/user/posts/list-posts" className="hvr-overline-from-center blue">Tin Chờ Duyệt(0)</Link>
                <Link to="/home/user/posts/list-posts" className="hvr-overline-from-center red">Tin Đã Lưu(0)</Link>
            </div>
        </>
    )
}

export default MenuBar;