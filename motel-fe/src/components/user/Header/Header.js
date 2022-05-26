import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { userActions } from '../../../actions/userAction';
import logo from './../../../assets/images/icon-ui.png';
import './Header.css';
import * as alertAction from '../../../actions/alertAction';
import * as alertConstant from '../../../constants/alertConstant';


const Header = () => {
    const alert = useAlert();
    const alertStatus = useSelector(state => state.alertReducer);
    const auth=useSelector(state => state.authReducer.loggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (alertStatus.success) {
            alert.show(alertStatus.message, {
                timeout: 3000,
                type: 'success',
                onClose:()=>{
                    dispatch(alertAction.success({
                        type:alertConstant.SUCCESS,
                        message:"",
                        success:false
                    }))
                }
            })
        };
    },[alertStatus])

    const handlerLogout = () => {
        dispatch(userActions.logout());
    }

    return (
        <nav>
            <div className="logo">
                <NavLink to='/'><img src={logo} alt="logo"></img></NavLink>
            </div>
            <ul className="nav-links">
                <li><Link to="/"><i className="fas fa-solid fa-landmark"></i> Trang chủ</Link></li>
                <li><Link to="/home/cho-thue-phong-tro"><i className="fas fa-hotel"></i> Cho thuê phòng trọ</Link></li>
                <li><Link to="/home/cho-thue-can-ho"><i className="fas fa-building"></i> Cho thuê căn hộ</Link></li>
                <li><Link to="/home/nha-cho-thue"><i className="fas fa-house-damage"></i> Nhà cho thuê</Link></li>
                <li><Link to="/home/user-management/user/posts"><i className="fas fa-solid fa-users"></i> Quản lý tin</Link></li>
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