import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useHistory  } from "react-router-dom";
import auth from '../UserSecurity/CheckAuth';

export default function Sidebar(props) {
    const history = useHistory();
  return (
    <div id="sidebar" className="side-menu">
      <div className="custom-menu-2">
        <ul>
          <li>
            <Link to={"/home"} className="active">
              <i className="fa fa-home" />
            </Link>
          </li>
          <li>
            <Link to={"/profile"}>
              <i className="fa fa-user-circle-o" />
            </Link>
          </li>
          <li>
            <Link to={"/user"}>
              <i className="fa fa-user-secret" />
            </Link>
          </li>
          <li>
            <Link to={"/charts"}>
              <i className="fa fa-pie-chart" />
            </Link>
          </li>
          <li>
            <Link to={"/sendmessages"}>
              <i className=" fa fa-send" />
            </Link>
          </li>
          <li>
            <Link to={"/notifications"}>
              <i className=" fa fa-bell" />
            </Link>
          </li>
          <li>
            <Link to={"/download"}>
              <i className=" fa fa-cloud-download" />
            </Link>
          </li>
          <li>
            <Link
              to={props.myroute}
              onClick={() => {
                auth.isLogout(() => {
                  history.push("/");
                });
              }}
            >
              <i className=" fa fa-sign-out" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
