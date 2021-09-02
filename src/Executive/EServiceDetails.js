import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import moment from "moment";
import { handleSuccess, handleError } from "../Common/CustomAlerts";
import conversation from "../Common/Conversation";
import Header from "../Common/Header";

export default function EServiceDetails(props) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [serviceId, setServiceId] = useState([]);
  const [userName, setUserName] = useState([]);
  const [serviceName, setServiceName] = useState([]);
  const applicationAPI = () => {
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    return {
      fetchAll: () =>
        axios.get(config.apiurl + config.userservices, headerconfig),
    };
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  function refreshServicesList() {
    var m = window.location.pathname.split("/");
    setServiceId(m[4]);
    applicationAPI()
      .fetchAll()
      .then(
        (res) => (
          setServicesList(res.data),
          setUserName(res.data[0].userName),
          setServiceName(res.data[0].serviceName)
        )
      )
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  const checkConversation = () => {
    {
      togglePopup();
    }
  };
  useEffect(() => {
    refreshServicesList();
  }, []);
  return (
    <div>
     <Header></Header>
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
                      <a href="#">&nbsp;My Customers</a> &gt;
                    </li>
                    <li>&nbsp;Services Applied </li>
                  </ul>
                </div>
              </div>
              <div className="clearfix pad30" />
              <div className="col-md-8">
                <div className="page-title-d">
                  <h2>
                    <img src="/images/file-icon.png" />
                    <span className="font-avenir-bold">{userName}</span>
                    <p style={{ color: "#8C8D95" }}>
                      Service applied for: {serviceName}
                    </p>
                  </h2>
                </div>
              </div>
              <div className="col-md-4 admin-btn">
                <Link className="conversation-btn" onClick={checkConversation}>
                  <img src="/images/comments.png" /> Mark As Done
                </Link>
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
                        <th scope="col">Date Added</th>
                        <th scope="col" style={{ width: "12%" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {servicesList &&
                      servicesList
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
                                    <span
                                      style={{ textDecoration: "underline" }}
                                    >
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
      {isOpen && <conversation handleClose={togglePopup} />}
    </div>
  );
}