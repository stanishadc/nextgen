import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import { handleSuccess, handleError } from "../Common/CustomAlerts";
import Header from "../Common/Header";
import Conversation from "../Common/ConversationModal";
import ReactTooltip from 'react-tooltip';

export default function UServiceDetails(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [serviceId, setServiceId] = useState(0);
  const [serviceName, setServiceName] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [serviceStatus, setServiceStatus] = useState(null);
  const applicationAPI = () => {
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    const fileHeaderconfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        responseType: "arraybuffer",
      },
    };
    return {
      fetchAll: () =>
        axios.get(config.apiurl + config.userservices, headerconfig),
      uploadFile: (id, newRecord) =>
        axios.post(
          config.apiurl + config.fileupload + serviceId + "/documents/" + id,
          newRecord,
          headerconfig
        ),
      downloadDocument: (id) =>
        axios.get(
          config.apiurl + config.filedownload + serviceId + "/documents/" + id,
          fileHeaderconfig
        ),
    };
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const checkConversation = () => {
    {
      togglePopup();
    }
  };
  function userFileUpload(e, documentId) {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      const formData = new FormData();
      formData.append("documentId", documentId);
      formData.append("userServiceId", serviceId);
      formData.append("file", e.target.files[0]);
      uploadData(documentId, formData);
    }
  }
  function ViewDocument(documentId) {    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", config.apiurl + config.filedownload + serviceId + "/documents/" + documentId, true);
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("userToken")}`)
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
    xhr.open("GET", config.apiurl + config.filedownload + serviceId + "/documents/" + documentId, true);
    xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("userToken")}`)
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
  const uploadData = (documentId, formData) => {
    applicationAPI()
      .uploadFile(documentId, formData)
      .then((res) => {
        if (res.status == 200) {
          handleSuccess("File uploaded successfully");
          refreshServicesList();
        } else {
          handleError("Failed to upload file");
        }
      })
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  };
  
  function refreshServicesList() {
    var m = window.location.pathname.split("/");
    setServiceId(m[4]);
    applicationAPI()
      .fetchAll()
      .then(
        (res) => (
          setServicesList(res.data), setServiceName(res.data[0].serviceName)
        )
      )
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
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
                      <Link to={"/users/services"}> My Dashboard </Link> &gt;
                    </li>
                    <li>
                      <Link to={"/users/services"}>&nbsp;Applied Services</Link>{" "}
                      &gt;
                    </li>
                    <li>&nbsp;{serviceName} </li>
                  </ul>
                </div>
              </div>
              <div className="clearfix pad30" />
              <div className="col-md-8">
                <div className="page-title-d">
                  <h2 className="font-avenir-bold">
                    <img src="/images/file-icon.png" />
                    <span> {serviceName}</span>
                  </h2>
                </div>
              </div>
              <div className="col-md-4">
              {serviceStatus !== "WIP" ? (
                 <Link className="sort-btn active">
                    <img src="/images/checked.png" /> Mark As Done
                  </Link>                  
                ) : (
                 <Link
                  className="startdiscussion-btn"
                  to={props.myroute}
                  onClick={checkConversation}
                >
                  <img src="/images/comments.png" /> Start Discussion
                </Link>
                )}
                
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
                        <th scope="col" style={{ width: "20%" }}>
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
                              <tr key={document.id}>
                                <td scope="row">{index + 1}</td>
                                <td>{document.documentId}</td>
                                <td>
                                  {document.fileName ? (
                                    <Link to={props.myroute}>
                                      <img src="/images/download-icon.png" />
                                      <span
                                        style={{ textDecoration: "underline" }}
                                      >
                                        {document.name}
                                      </span>
                                    </Link>
                                  ) : (
                                    <span>{document.name}</span>
                                  )}
                                </td>
                                <td>
                                  {document.createdAt}
                                </td>
                                <td>
                                  {document.fileName ? (
                                    <>
                                      <button data-tip data-for="viewTip"
                                        onClick={() => {
                                          ViewDocument(document.documentId);
                                        }}
                                      >
                                        <img src="/images/view-icon.png" />
                                      </button>
                                      <button data-tip data-for="downloadTip"
                                        onClick={() => {
                                          DownloadDocument(document.documentId);
                                        }}
                                      >
                                        <img src="/images/download-icon.png" />
                                      </button>
                                      <label>
                                        <input data-tip data-for="uploadTip"
                                          className="button"
                                          type="file"
                                          onChange={(e) => {
                                            userFileUpload(
                                              e,
                                              document.documentId
                                            );
                                          }}
                                          style={{ display: "none" }}
                                        ></input>
                                        <img src="/images/edit-icon.png" data-tip data-for="editTip"/>
                                      </label>
                                    </>
                                  ) : (
                                    <>
                                      <button className="button">
                                        <img
                                          src="/images/view-icon.png"
                                          className="disabled-icon"
                                        />
                                      </button>
                                      <label>
                                        <input
                                          className="button"
                                          type="file"
                                          onChange={(e) => {
                                            userFileUpload(
                                              e,
                                              document.documentId
                                            );
                                          }}
                                          style={{ display: "none" }}
                                        ></input>
                                        <img src="/images/upload-icon.png" data-tip data-for="uploadTip"/>
                                      </label>
                                      <button className="button">
                                        <img
                                          src="/images/edit-icon.png"
                                          className="disabled-icon"
                                        />
                                      </button>
                                    </>
                                  )}
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
        UploadDocument
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
      {isOpen && (
        <Conversation handleClose={togglePopup} userServiceId={serviceId} />
      )}
    </div>
  );
}
