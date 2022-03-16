
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../actions/userAction';
import logo from './../../assets/images/icon-ui.png';
import "./RegisterPage.css";
const RegisterPage = () => {
    const navigate= useNavigate();
    const statusRegister= useSelector(state=>state.alertReducer);
    const dispatch = useDispatch();
    const [user,setUser]=useState({
        "fullname":'',
        "username":'',
        "email":'',
        "password":''
    });

    const handlerChangeInput=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setUser(user=>{
            return {
                ...user,
                [name]:value
            }
        });
    }
    const handlerSubmit=(event)=>{
        event.preventDefault();
        dispatch(userActions.register(user));
        if(statusRegister){
            navigate("/login");
        }
    }

    const goToLoginForm=(event)=>{
        navigate('/login');
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

                                <a className="txt2" onClick={goToLoginForm}>
                                    Vui lòng đăng nhập
                                </a>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;