import './LoginPage.css';
import logo from './../../assets/images/icon-ui.png';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions/userAction';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';


const LoginPage = () => {

    const auth = useSelector(state => state.authReducer.loggedIn);
    const message = useSelector(state => state.authReducer.message);
    const alert = useAlert();
    
    const dispatch = useDispatch();
    const history = useHistory();

    const [user, setUser] = useState({
        usernameOrEmail: '',
        password: ''
    });



    const handlerChangeInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(user => {
            return {
                ...user,
                [name]: value
            }
        });
    }

    const mounted = useRef();
    useEffect(() => {
        
        if (!mounted.current) {
            // do componentDidMount logic
            mounted.current = true;
        } else {
            if (auth === true) {
                history.push('/home');
            }
            else {
                alert.show("Nhập sai tài khoản hoặc mật khẩu", {
                    timeout: 3000,
                    type: 'error',
                });
                setUser({
                    usernameOrEmail: '',
                    password: ''
                })
            }
        }
    }, [auth, message])

    const handlerSubmit = async (event) => {
        event.preventDefault();
        await dispatch(userActions.login(user));
    }


    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-40 p-b-20">
                    <form className="login100-form validate-form" onSubmit={handlerSubmit}>
                        <span className="login100-form-title p-b-30">
                            Đăng nhập
                        </span>
                        <span className="login100-form-avatar">
                            <img src={logo} alt="AVATAR"></img>
                        </span>

                        <div className="wrap-input100 validate-input m-t-55 m-b-35" data-validate="Enter username or email">
                            <input className="input100" type="text" name="usernameOrEmail"
                                onChange={handlerChangeInput}></input>
                            <span className="focus-input100" data-placeholder="Username or email"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-b-50" data-validate="Enter password">
                            <input className="input100" type="password" name="password"
                                onChange={handlerChangeInput}></input>
                            <span className="focus-input100" data-placeholder="Password"></span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn">
                                Đăng nhập
                            </button>
                        </div>

                        <ul className="login-more p-t-30">
                            <li className="m-b-8">
                                <span className="txt1">
                                    Quên
                                </span>

                                <a href="/#" className="txt2">
                                    mật khẩu?
                                </a>
                            </li>

                            <li>
                                <span className="txt1">
                                    Chưa có tài khoản
                                </span>

                                <Link to='/register' className="txt2">
                                    Đăng ký
                                </Link>
                            </li>
                            <li>
                                <span className="txt1">
                                    Xem các phòng đang có sẵn
                                </span>
                                <Link to='/' className='txt2'>
                                    Trang chủ
                                </Link>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    )
};


export default LoginPage;