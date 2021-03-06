import React, { useState,useEffect } from 'react';
import config from '../config';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { handleSuccess, handleError } from '../Common/CustomAlerts'
const initialLoginValues = {
    email: '',
    password: ''
}
export default function SignIn(props) {
    const [values, setValues] = useState(initialLoginValues)
    const [errors, setErrors] = useState({})
    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' form-control-danger' : '')
    const applicationAPI = () => {
        return {
            checkLogin: newRecord => axios.post(config.apiurl + config.usersignin, newRecord)
        }
    }
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const validate = () => {
        let temp = {}
        temp.email = values.email == "" ? false : true;
        temp.password = values.password == "" ? false : true;
        setErrors(temp)
        return Object.values(temp).every(x => x == true)
    }
    const checkUser = (loginData) => {
        applicationAPI().checkLogin(loginData)
            .then((res) => {
                localStorage.setItem('userToken', res.data.accessToken);
                handleSuccess("Login Success");
                GetUserRole(res.data.accessToken)

            })
            .catch(function (error) {
                if (error.response) {
                    handleError(error.response.data.message);
                }
            })
    }
    function GetUserRole(token) {
        const headerconfig = {
            headers: { Authorization: `Bearer ${token}` },
        };
        return axios
            .get(config.apiurl + config.getuser, headerconfig)
            .then(response => {
                localStorage.setItem('userRole', response.data.role);
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('userName', response.data.name);
                if (response.data.role === "ROLE_USER") {
                    props.history.push({
                        pathname: '/users/services',
                    })
                }
                else if (response.data.role === "ROLE_ADMIN") {
                    props.history.push({
                        pathname: '/admin/services',
                    })
                }
                else if (response.data.role === "ROLE_EXECUTIVE") {
                    props.history.push({
                        pathname: '/executive/services',
                    })
                }
                else {
                    handleError("Authorization failed for this user");
                }
            });
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            initialLoginValues.email = values.email
            initialLoginValues.password = values.password
            checkUser(initialLoginValues)
        }
        else {
            handleError("All fields are mandatory");
        }
    }
    useEffect(() => {
        if (localStorage.getItem('userToken') !== "") {
            GetUserRole(localStorage.getItem('userToken'))
        }
        else{
            props.history.push({
                pathname: '/',
            })
        }
      }, []);
    return (
        <div>
            <div className="register-page">
                <div className="row">
                    <div className="col-md-6 register-text-box">
                        <div className="logo-box">
                            <img src="images/logo.png" />
                        </div>
                        <h1 className="title-register">Welcome to Back</h1>
                        <div className="register-login-btn">
                            <Link to={"/signin"} className="active">Sign In</Link>
                        </div>
                        <a className="register-google-btn">
                            <img src="images/google-icon.png" style={{ width: 25, marginRight: 10 }} /> Sign In with Google
                        </a>
                        <div className="signup-email">
                            <p className>Or Sign In with email</p>
                        </div>
                        <div className="form-box row">
                            <div className="col-lg-6 offset-lg-3">
                                <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                                    <div className="form-group">
                                        <label className="input-validate" htmlFor="email">Email</label>
                                        <input className={"form-control" + applyErrorClass('email')} name="email" type="email" id="email" value={values.email} onChange={handleInputChange} placeholder="Enter your registered Email ID" />
                                    </div>
                                    <div className="form-group mart20">
                                        <label className="input-validate" htmlFor="pwd">Password</label>
                                        <input className={"form-control" + applyErrorClass('password')} id="pwd" name="password" type="password" value={values.password} onChange={handleInputChange} placeholder="Enter Password" />
                                    </div>
                                    <button type="submit" className="btn create-account-btn">Sign In</button>
                                    <a href="#" className="forgot-pass">Forgot Password?</a>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 register-img-box">
                        <div className="register-img">
                            <img src="images/register-img.png" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}