import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './MenuBar.css';

const MenuBar = (props) => {

    const postsShowing=useSelector(state=>state.postsReducer.content);
    const postsReject=useSelector(state=>state.rejectPostsReducer.content);
    const postsWaiting=useSelector(state=>state.waitingPostsReducer.content);

    return (
        <>
            <div className="title">
                <h1>Quản lý tin</h1>
            </div>
            <div className="overlinegrow section">
                <Link to={`${props.url}/show-ing`} className="hvr-overline-from-center red">Đang Hiển Thị({postsShowing.length})</Link>
                <Link to={`${props.url}/reject`} className="hvr-overline-from-center green">Bị Từ Chối({postsReject.length})</Link>
                <Link to={`${props.url}/payment`} className="hvr-overline-from-center orange">Cần Thanh Toán(0)</Link>
                <Link to={`${props.url}/wait-approve`} className="hvr-overline-from-center blue">Tin Chờ Duyệt({postsWaiting.length})</Link>
                <Link to={`${props.url}/save-posts`} className="hvr-overline-from-center red">Tin Đã Lưu(0)</Link>
            </div>
        </>
    )
}

export default MenuBar;