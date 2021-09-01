import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import moment from "moment";
import { handleSuccess, handleError } from "../Common/CustomAlerts";
export default function UServiceDetails(props) {
  const [servicesList, setServicesList] = useState([]);
  const [serviceId, setServiceId] = useState([]);
  const applicationAPI = () => {
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    return {
      fetchAll: () =>
        axios.get(config.apiurl + config.userservices, headerconfig),
    };
  };
  function refreshServicesList() {
    var m = window.location.pathname.split("/");
    setServiceId(m[4]);
    applicationAPI()
      .fetchAll()
      .then((res) => setServicesList(res.data))
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  useEffect(() => {
    refreshServicesList();
  }, []);
  return (
    <div>
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
      <Sidebar></Sidebar>
      <div className="main-page">
        <div className>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="breadcrum-1">
                  <ul>
                    <li>
                      <a href="#"> My Dashboard </a> &gt;
                    </li>
                    <li>
                      <a href="#">&nbsp;Applied Services </a> &gt;
                    </li>
                    <li>&nbsp;Limited Liability Partnership </li>
                  </ul>
                </div>
              </div>
              <div className="clearfix pad30" />
              <div className="col-md-8">
                <div className="page-title-d">
                  <h2 className="font-avenir-bold">
                    {" "}
                    <img src="/images/file-icon.png" />{" "}
                    <span> LIMITED LIABILITY PARTNERSHIP</span>
                  </h2>
                </div>
              </div>
              <div className="col-md-4">
                <a
                  data-toggle="modal"
                  data-target="#Conversation_modal"
                  href="#"
                  className="conversation-btn"
                >
                  {" "}
                  <img src="/images/comments.png" /> Conversation
                </a>
              </div>
            </div>
            <div className="clearfix" />
            <div className="row mart40">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table document-table">
                    <thead>
                      <tr>
                        <th scope="col">Sl No</th>
                        <th scope="col">Id</th>
                        <th scope="col" style={{ width: "40%" }}>
                          Document Name
                        </th>
                        <th scope="col">Date Applied</th>
                        <th scope="col" style={{ width: "12%" }}>
                          {" "}
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {servicesList && servicesList
                      .filter((servicesList) => servicesList.id == serviceId)
                      .map((documentList) => (
                        <tbody key={documentList.id}>
                          {documentList.documents.map((document, index) => (
                            <tr>
                              <td scope="row" key={document.id}>
                                {index + 1}
                              </td>
                              <td>{document.documentId}</td>
                              <td>
                                <a href="#">
                                  <img src="/images/download-icon.png" />{" "}
                                  <span style={{ textDecoration: "underline" }}>
                                    {document.name}
                                  </span>
                                </a>
                              </td>
                              <td>12 Jun 2021</td>
                              <td>
                                <button>
                                  <img src="/images/view-icon.png" />
                                </button>
                                <button>
                                  <img src="/images/download-icon.png" />
                                </button>
                                <button disabled>
                                  <img
                                    src="/images/edit-icon.png"
                                    className="disabled-icon"
                                  />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ))}
                  </table>
                </div>
              </div>
            </div>
            <div className="clearfix" />
            <div className="row mart40">
              <div className="col-md-6">
                <p className="showing-entries">
                  Showing <span> 1 to 10 of 48</span> entries
                </p>
              </div>
              <div className="col-md-6">
                <div className="list-box-p">
                  <div className="pagination-list-box">
                    <ul className="pagination justify-content-end">
                      <li className="page-item">
                        <a className="page-link" href="javascript:void(0);">
                          <i className="fa  fa-caret-left" />
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="javascript:void(0);">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="javascript:void(0);">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="javascript:void(0);">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="javascript:void(0);">
                          4
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="javascript:void(0);">
                          5
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="javascript:void(0);">
                          <i className="fa  fa-caret-right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="pagination-list-box">
                    <div className="go-age-box">
                      <small>Go page</small>
                      <input type="text" />
                      <a href="#" style={{ color: "#000", fontWeight: 700 }}>
                        {" "}
                        Go{" "}
                        <i
                          className="fa  fa-caret-right"
                          style={{ verticalAlign: "middle" }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
