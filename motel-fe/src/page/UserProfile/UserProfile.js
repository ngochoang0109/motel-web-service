import React from 'react'
import './UserProfile.css'
import logo from './../../assets/images/user-profile.png';
import Select from 'react-select'


const options = [
    {label: 'Male', value: '0'},
    {label: 'Female', value: '1'},
    {label: 'Other', value: '2'},
]

function UserProfile() {
  return (
      <div>
          <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-40 p-b-20">
                    <form className="login100-form validate-form" >
                        <span className="login100-form-title p-b-30">
                            Chỉnh sửa trang cá nhân
                        </span>
                        <span className="login100-form-avatar">
                            <img src={logo} alt="AVATAR"></img>
                        </span>

                        <div className="wrap-input100 validate-input m-t-55 m-b-35" data-validate="Enter full name">
                            <input className="input100"
                                type="text"
                                name="fullname"
                                ></input>
                            <span className="focus-input100" data-placeholder="Full name"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-t-55 m-b-35" data-validate="Enter username">
                            <input className="input100"
                                type="text"
                                name="username"
                                ></input>
                            <span className="focus-input100" data-placeholder="Username"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-t-55 m-b-35" data-validate="Enter cardID">
                            <input className="input100"
                                type="text"
                                name="cardID"
                                ></input>
                            <span className="focus-input100" data-placeholder="Card ID"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-t-55 m-b-35" data-validate="Enter email">
                            <input className="input100"
                                type="email"
                                name="email"
                                ></input>
                            <span className="focus-input100" data-placeholder="Email"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-b-50" data-validate="Enter password">
                            <input className="input100"
                                type="password"
                                name="password"
                                ></input>
                            <span className="focus-input100" data-placeholder="Password"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-t-55 m-b-35" data-validate="Enter phonenumber">
                            <input className="input100"
                                type="text"
                                name="phone"
                                ></input>
                            <span className="focus-input100" data-placeholder="Phone"></span>
                        </div>

                        <div className="wrap-input100 validate-input m-t-55 m-b-35" data-validate="Enter address">
                            <input className="input100"
                                type="text"
                                name="email"
                                ></input>
                            <span className="focus-input100" data-placeholder="Address"></span>
                        </div>

                       

                        <div className=" validate-input m-b-50" data-validate="Enter gender">
                            <Select options={options} defaultValue={options[0]}></Select>
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn">
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    
  )
}

export default UserProfile
