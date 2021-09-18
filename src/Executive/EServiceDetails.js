import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import { handleError, handleSuccess } from "../Common/CustomAlerts";
import Header from "../Common/Header";
import ConversationModal from "../Common/ConversationModal";
import ReactTooltip from "react-tooltip";

export default function EServiceDetails(props) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [serviceIds, setServiceIds] = useState(null);
  const [userName, setUserName] = useState([]);
  const [serviceName, setServiceName] = useState([]);
  const applicationAPI = () => {
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    return {
      fetchAll: (sId) =>
        axios.get(config.apiurl + config.getuserservice + sId, headerconfig),
      assignExecutive: (updateData) =>
        axios.put(
          config.apiurl + config.updateservice + serviceIds,
          updateData,
          headerconfig
        ),
    };
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  function refreshServicesList() {
    var m = window.location.pathname.split("/");
    setServiceIds(m[4]);
    applicationAPI()
      .fetchAll(m[4])
      .then(
        (res) => (
          setServicesList(res.data.documents),
          setUserName(res.data.userName),
          setServiceName(res.data.serviceName)
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
  function ViewDocument(documentId) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      config.apiurl +
        config.filedownload +
        serviceIds +
        "/documents/" +
        documentId,
      true
    );
    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    xhr.responseType = "arraybuffer";
    xhr.onload = function (e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], { type: "application/pdf" });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        window.open(link.href, "_blank");
      }
    };
    xhr.send();
  }
  function DownloadDocument(documentId) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      config.apiurl +
        config.filedownload +
        serviceIds +
        "/documents/" +
        documentId,
      true
    );
    xhr.setRequestHeader(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    xhr.responseType = "arraybuffer";
    xhr.onload = function (e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], { type: "application/pdf" });
        var link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "Report_" + new Date() + ".pdf";
        link.click();
      }
    };
    xhr.send();
  }
  const UpdateTaskStatus = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", "COMPLETED");
    formData.append("serviceId", serviceIds);
    formData.append("executiveId", localStorage.getItem("userId"));
    updateService(formData);
  };
  const updateService = (formData) => {
    applicationAPI()
      .assignExecutive(formData)
      .then((res) => {
        handleSuccess("Successfully Submitted");
        props.handleEClose();
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  };
  useEffect(() => {
    refreshServicesList();
    ReactTooltip.rebuild();
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
                      <Link to={"/executive/services"}> Home </Link> &gt;
                    </li>
                    <li>
                      <Link to={"/executive/services"}>
                        &nbsp;Services Applied
                      </Link>
                      &gt;
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
                <Link
                  className="startdiscussion-btn active"
                  onClick={UpdateTaskStatus}
                >
                  <img src="/images/checked.png" /> Mark As Done
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
                    <tbody>
                      {servicesList &&
                        servicesList.map((document, index) => (
                          <tr key={document.id}>
                            <td scope="row" key={document.id}>
                              {index + 1}
                            </td>
                            <td>{document.documentId}</td>
                            <td>
                              {document.fileName ? (
                                <Link
                                  to={props.myroute}
                                  onClick={() => {
                                    DownloadDocument(document.documentId);
                                  }}
                                >
                                  <img
                                    src="/images/download-icon.png"
                                    data-tip
                                    data-for="downloadTip"
                                  />
                                  <span style={{ textDecoration: "underline" }}>
                                    {document.name}
                                  </span>
                                </Link>
                              ) : (
                                <span>{document.name}</span>
                              )}
                            </td>
                            <td>{document.createdAt}</td>
                            <td>
                              {document.fileName ? (
                                <>
                                  <button
                                    data-tip
                                    data-for="viewTip"
                                    onClick={() => {
                                      ViewDocument(document.documentId);
                                    }}
                                  >
                                    <img src="/images/view-icon.png" />
                                  </button>
                                  <button
                                    data-tip
                                    data-for="downloadTip"
                                    onClick={() => {
                                      DownloadDocument(document.documentId);
                                    }}
                                  >
                                    <img
                                      src="/images/download-icon.png"
                                      data-tip
                                      data-for="downloadTip"
                                    />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button className="button">
                                    <img
                                      src="/images/view-icon.png"
                                      className="disabled-icon"
                                    />
                                  </button>
                                  <button className="button">
                                    <img
                                      src="/images/download-icon.png"
                                      className="disabled-icon"
                                    />
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="clearfix" />
            <div className="row mart40">
              <div className="col-md-6">
                <p className="showing-entries">
                  Showing <span> 1 to 1 of 1</span> entries
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
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip id="uploadTip" place="right">
        Upload Document
      </ReactTooltip>
      <ReactTooltip id="downloadTip" place="right">
        Download Document
      </ReactTooltip>
      <ReactTooltip id="editTip" place="right">
        Edit Document
      </ReactTooltip>
      <ReactTooltip id="viewTip" place="right">
        View Document
      </ReactTooltip>
      {isOpen && <ConversationModal handleClose={togglePopup} />}
    </div>
  );
}
