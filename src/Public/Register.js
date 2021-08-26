import React, { useState } from 'react';
import config from '../config';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { handleSuccess, handleError } from '../Common/CustomAlerts'
const initialLoginValues = {
    email: '',
    password: '',
    name: ''
}
export default function Register(props) {
    const [values, setValues] = useState(initialLoginValues)
    const [errors, setErrors] = useState({})
    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' form-control-danger' : '')
    const applicationAPI = (url = config.url) => {
        return {
            checkLogin: newRecord => axios.post(url + "signup", newRecord)
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
            .then(res => {
                if (res.data.success === true) {
                    handleSuccess(res.data.message);
                    props.history.push({
                        pathname: '/customer/services',
                    })
                }
            })
            .catch(function (error) {
                if (error.response) {
                    handleError(error.response.data.message);
                }
            })
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            initialLoginValues.email = values.email
            initialLoginValues.password = values.password
            initialLoginValues.name = "Test"
            checkUser(initialLoginValues)
        }
        else{
            handleError("All fields are mandatory");
        }
    }
    return (
        <div>
            <div className="register-page">
                <div className="row">
                    <div className="col-md-6 register-text-box">
                        <div className="logo-box">
                            <img src="images/logo.png" />
                        </div>
                        <h1 className="title-register">Welcome to New Era</h1>
                        <div className="register-login-btn">
                            <Link to={"/register"} className="active">Register</Link>
                            <Link to={"/signin"}>Sign In</Link>
                        </div>
                        <a className="register-google-btn">
                            <img src="images/google-icon.png" style={{ width: 25, marginRight: 10 }} /> Register with Google
                        </a>
                        <div className="signup-email">
                            <p className>Or Sign Up with email</p>
                        </div>
                        <div className="form-box row">
                            <div className="col-lg-6 offset-lg-3">
                                <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                                    <div className="form-group">
                                        <label className="input-validate" htmlFor="email">Email</label>
                                        <input className={"form-control" + applyErrorClass('email')} name="email" type="email" id="email" value={values.email} onChange={handleInputChange} placeholder="Enter Email" />
                                    </div>
                                    <div className="form-group mart20">
                                        <label className="input-validate" htmlFor="pwd">Create Password</label>
                                        <input className={"form-control input-trigger" + applyErrorClass('password')} id="pwd" name="password" type="password" value={values.password} onChange={handleInputChange} placeholder="Password of 6-8 characters" />
                                    </div>
                                    <button type="submit" className="btn create-account-btn">Create Account</button>
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