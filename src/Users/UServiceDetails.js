import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import moment from "moment";
import { handleSuccess, handleError } from "../Common/CustomAlerts";
import Header from "../Common/Header";
import Conversation from "../Common/ConversationModal";

export default function UServiceDetails(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [serviceId, setServiceId] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [createFile, setCreateFile] = useState(null);
  const applicationAPI = () => {
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    return {
      fetchAll: () =>
        axios.get(config.apiurl + config.userservices, headerconfig),
      uploadFile: (newRecord) =>
        axios.post(config.apiurl + config.fileupload, newRecord, headerconfig),
      downloadDocument: (id) =>
        axios.get(
          config.apiurl + config.filedownload + serviceId + "/documents/1",
          headerconfig
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
      uploadData(formData);
    }
  }
  function ViewDocument(documentId) {
    applicationAPI()
      .downloadDocument(documentId)
      .then((res) => SaveFile(res.data))
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  function SaveFile(fileData) {
    const url = window.URL.createObjectURL(new Blob([fileData]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file.pdf");
    document.body.appendChild(link);
    link.click();
  }
  function OpenFile(fileData) {
    const url = window.URL.createObjectURL(new Blob([fileData]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file.pdf");
    document.body.appendChild(link);
    link.click();
  }
  function buildFileSelector() {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    return fileSelector;
  }
  function DownloadDocument(documentId) {
    applicationAPI()
      .downloadDocument(documentId)
      .then((res) => console.log(res.data))
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  const uploadData = (formData) => {
    applicationAPI()
      .uploadFile(formData)
      .then((res) => {
        if (res.data.status == 200) {
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
      .then((res) => setServicesList(res.data))
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  useEffect(() => {
    refreshServicesList();
    setCreateFile(buildFileSelector);
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
                    <img src="/images/file-icon.png" />
                    <span> LIMITED LIABILITY PARTNERSHIP</span>
                  </h2>
                </div>
              </div>
              <div className="col-md-4">
                <Link
                  className="startdiscussion-btn"
                  to={props.myroute}
                  onClick={checkConversation}
                >
                  <img src="/images/comments.png" /> Start Discussion
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
                        <th scope="col">Date Applied</th>
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
                              <tr key={document.id}>
                                <td scope="row">{index + 1}</td>
                                <td>{document.documentId}</td>
                                <td>
                                  {document.fileName ? (
                                    <span>{document.name}</span>
                                  ) : (
                                    <Link to={"#"}>
                                      <img src="/images/download-icon.png" />
                                      <span
                                        style={{ textDecoration: "underline" }}
                                      >
                                        {document.name}
                                      </span>
                                    </Link>
                                  )}
                                </td>
                                <td>
                                  {moment(document.createdAt).format(
                                    "DD MMM YYYY"
                                  )}
                                </td>
                                <td>
                                  {document.fileName ? (
                                    <Link
                                      className="button"
                                      to="#"
                                      onClick={(e) =>
                                        userFileUpload(e, document.documentId)
                                      }
                                    >
                                      <img src="/images/edit-icon.png" />
                                    </Link>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => {
                                          ViewDocument(document.documentId);
                                        }}
                                      >
                                        <img src="/images/view-icon.png" />
                                      </button>
                                      <button
                                        onClick={() => {
                                          ViewDocument(document.documentId);
                                        }}
                                      >
                                        <img src="/images/download-icon.png" />
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
      {isOpen && (
        <Conversation handleClose={togglePopup} userServiceId={serviceId} />
      )}
    </div>
  );
}
