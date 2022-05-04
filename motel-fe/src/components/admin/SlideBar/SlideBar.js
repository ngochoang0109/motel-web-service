import { Link } from 'react-router-dom';
import './SlideBar.css';

const SlideBar = () => {
    return (<nav className="main-menu">
        <ul>
            <li>
                <Link to='/admin/home'>
                    <i className="fas fa-solid fa-house-user fas-2x"></i>
                    <span className="nav-text">
                        Thống kê
                    </span>
                </Link>
            </li>
            <li>
                <Link to='/admin/home/posts-management/wait-ing'>
                    <i className="fas fa-solid fa-house-user fas-2x"></i>
                    <span className="nav-text">
                        Đang chờ duyệt
                    </span>
                </Link>
            </li>
        </ul>

        <ul className="logout">
            <li>
                <Link to='/admin/logout'>
                    <i className="fas fa-power-off fas-2x"></i>
                    <span className="nav-text">
                        Logout
                    </span>
                </Link>
            </li>
        </ul>
    </nav>)

}

export default SlideBar;