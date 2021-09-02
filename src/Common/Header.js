import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
export default function Header(props) {
    return(
        <div className="navigation-wrap bg-light start-header start-style">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <nav
                id="header-1"
                className="navbar navbar-expand-lg navbar-light "
              >
                <div
                  id="btn"
                  className="side-menu-btn-3"
                  onclick="show(sidebar)"
                >
                  <span />
                  <span />
                  <span />
                </div>
                <a className="navbar-brand" href="index.html">
                  <img src="/images/logo.png" alt />
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <div className=" search-login-reg-box">
                    <div
                      id="Search-icon"
                      className="search-box pl-4 pl-md-0 ml-0 ml-md-4"
                    >
                      <a href="#">
                        <i className="fa fa-search" />
                      </a>
                    </div>
                  </div>
                  <div className="login-box pl-4 pl-md-0 ml-0 ml-md-4">
                    <a href="#">
                      <img
                        src="/images/user-icon.png"
                        alt
                        style={{ width: 20 }}
                      />{" "}
                      Account
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <form id="Search-box-hide" className="search-box-show">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <button id="Search-hide" className="search-hide-btn">
                  {" "}
                  X{" "}
                </button>
                <div className="search-iput">
                  <input
                    type="text"
                    className
                    placeholder="Type here to search..."
                  />
                  <button type="button" className="btn search-iput-btn">
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
}