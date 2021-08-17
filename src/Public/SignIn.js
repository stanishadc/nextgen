import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
export default function SignIn(props) {
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
                            <Link to={"/register"}>Register</Link>
                            <Link to={"/signin"} className="active">Sign In</Link>
                        </div>
                        <a className="register-google-btn">
                            <img src="images/google-icon.png" style={{ width: 25, marginRight: 10 }} /> Register with Google
                        </a>
                        <div className="signup-email">
                            <p className>Or Sign Up with email</p>
                        </div>
                        <div className="form-box row">
                            <div className="col-lg-6 offset-lg-3">
                                <form>
                                    <div className="form-group">
                                        <label className="input-validate" htmlFor="email">Email</label>
                                        <input type="email" className="form-control input-trigger" id="email" placeholder="Enter your registered Email ID" name="email" />
                                    </div>
                                    <div className="form-group mart20">
                                        <label className="input-validate" htmlFor="pwd">Create Password</label>
                                        <input type="password" className="form-control input-trigger" id="pwd" placeholder="Enter Password" name="pswd" />
                                    </div>
                                    <button disabled type="submit" className="btn disabled-btn create-account-btn">Sign In</button>
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