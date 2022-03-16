import './LoginPage.css';
import logo from './../../assets/images/icon-ui.png';
const LoginPage = () => {
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-40 p-b-20">
                    <form className="login100-form validate-form">
                        <span className="login100-form-title p-b-30">
                            Đăng nhập
                        </span>
                        <span className="login100-form-avatar">
                            <img src={logo} alt="AVATAR"></img>
                        </span>

                        <div className="wrap-input100 validate-input m-t-55 m-b-35" data-validate="Enter username or email">
                            <input className="input100" type="text" name="username-email"></input>
                                <span className="focus-input100" data-placeholder="Username or email"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-b-50" data-validate="Enter password">
                            <input className="input100" type="password" name="pass"></input>
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

                                <a href="/#" className="txt2">
                                    Đăng ký
                                </a>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    )
};


export default LoginPage;