import { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userActions } from '../../actions/userAction';
import logo from './../../assets/images/icon-ui.png';
import "./RegisterPage.css";
const RegisterPage = () => {
    const statusRegister=useSelector(state=>state.alertReducer);
    const [status, setStatus]=useState(false);

    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        fullname: '',
        username: '',
        email: '',
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

    
    useEffect(()=>{
        if(status===true){
            if ( statusRegister.success) {
                // show
                alert.show('Bạn đã đăng ký thành công', {
                    timeout: 3000,
                    type: 'success',
                    onClose: () => {
                        history.push("/login");
                    }
                })
            }
            else{
                alert.show(statusRegister.message, {
                    timeout: 3000,
                    type: 'error',
                });
                setUser({
                    fullname: '',
                    username: '',
                    email: '',
                    password: ''
                })
            }
        }
    },[statusRegister])



    const handlerSubmit = (event) => {
        event.preventDefault();
        dispatch(userActions.register(user));
        setStatus(true)
    }


    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-40 p-b-20">
                    <form className="login100-form validate-form" onSubmit={handlerSubmit}>
                        <span className="login100-form-title p-b-30">
                            Đăng ký
                        </span>
                        <span className="login100-form-avatar">
                            <img src={logo} alt="AVATAR"></img>
                        </span>

                        <div className="wrap-input100 validate-input m-t-55 m-b-35" data-validate="Enter full name">
                            <input className="input100"
                                type="text"
                                name="fullname"
                                onChange={handlerChangeInput}></input>
                            <span className="focus-input100" data-placeholder="Full name"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-t-55 m-b-35" data-validate="Enter username">
                            <input className="input100"
                                type="text"
                                name="username"
                                onChange={handlerChangeInput}></input>
                            <span className="focus-input100" data-placeholder="Username"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-t-55 m-b-35" data-validate="Enter email">
                            <input className="input100"
                                type="email"
                                name="email"
                                onChange={handlerChangeInput}></input>
                            <span className="focus-input100" data-placeholder="Email"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-b-50" data-validate="Enter password">
                            <input className="input100"
                                type="password"
                                name="password"
                                onChange={handlerChangeInput}></input>
                            <span className="focus-input100" data-placeholder="Password"></span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn">
                                Đăng ký
                            </button>
                        </div>

                        <ul className="login-more p-t-30">
                            <li>
                                <span className="txt1">
                                    Bạn đã có tài khoản
                                </span>
                                <Link to='/login' className='txt2'>
                                    Vui lòng đăng nhập
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
}

export default RegisterPage;