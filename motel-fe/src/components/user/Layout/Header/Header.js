import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { userActions } from '../../../../actions/userAction';
import logo from './../../../../assets/images/icon-ui.png';
import './Header.css';
const Header = () => {
    const alert = useAlert();
    const auth = useSelector(state => state.authReducer.loggedIn);
    console.log(auth)
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth) {
            alert.show('Bạn đã đăng nhập thành công', {
                timeout: 3000,
                type: 'success'
            })
        }
    })

    const handlerLogout = () => {
        dispatch(userActions.logout());
    }

    return (
        <nav>
            <div className="logo">
                <NavLink to='/'><img src={logo} alt="logo"></img></NavLink>
            </div>
            <ul className="nav-links">
                <li><a href="/#"><i className="fas fa-solid fa-landmark"></i> Trang chủ</a></li>
                <li><a href="/#"><i className="fas fa-solid fa-users"></i> Quản lý tin</a></li>
                <li><a href="/#"><i className="fas fa-solid fa-bookmark"></i> Tin đã lưu</a></li>
                <li><a href="/#"><i className="fas fa-solid fa-cart-arrow-down"></i> Đơn hàng đã cọc</a></li>
                <li><a href="/#"><i className="fas fa-solid fa-bell"></i> Thông báo</a></li>
                <li className="dropdown-action">
                    <div className="hover">
                        <label htmlFor="btn" className="button">
                            <i className="fas fa-solid fa-address-card"></i> Người dùng
                            <span className="fas fa-caret-down"></span>
                        </label>
                        <input type="checkbox" id="btn"></input>
                        <ul className="menu">
                            <li><a href="/#">Thông tin người dùng</a></li>
                            {auth ? "" : <li><Link to="/register">Đăng ký</Link></li>}
                            {auth ? <li><Link to="/login" onClick={handlerLogout}>Đăng xuất</Link></li>
                                : <li><Link to="/login">Đăng nhập</Link></li>}

                            <li><a href="/#">Lịch sử giao dịch</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
    )
};

export default Header;