import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import moment from "moment";
import { handleSuccess,handleError } from "../Common/CustomAlerts";
import Header from "../Common/Header";
import ConversationModal from "../Common/ConversationModal";
import ExecutiveModal from "../Common/ExecutiveModal";

const initialServiceValues = {
    userServiceId: 0,
    status: ''
}

export default function AServiceDetails(props) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isEOpen, setIsEOpen] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [serviceId, setServiceId] = useState([]);
  const [userName, setUserName] = useState([]);
  const [serviceName, setServiceName] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [createFile, setCreateFile] = useState(null);
  const [serviceStatus, setServiceStatus] = useState(null);

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
          config.apiurl + config.filedownload + serviceId + "/documents/" + id,
          headerconfig
        )
    };
  };
  const togglePopup = () => {
    if(isOpen)
    {
    setIsOpen(false);
    }
    else{
      setIsOpen(true);
    }
  };
  const toggleEPopup = () => {
    if(isEOpen)
    {
      setIsEOpen(false);
    }
    else{
      setIsEOpen(true);
    }
  };
  async function refreshServicesList() {
    var m = window.location.pathname.split("/");
    setServiceId(m[4]);
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    let response = await fetch(config.apiurl + config.userservices, headerconfig)
        const json = await response.json()
        setServicesList(json);
          setUserName(json[0].userName);
          setServiceName(json[0].serviceName);
          if((json.filter((servicesList) => servicesList.id == serviceId))[0].status !== undefined)
          {
          setServiceStatus((json.filter((servicesList) => servicesList.id == serviceId))[0].status)
          }
  }
  const checkConversation = () => {
    {
      togglePopup();
    }
  };
  const assignExecutive = () => {
    {
      toggleEPopup();
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
  function DownloadDocument(documentId) {
    applicationAPI()
      .downloadDocument(documentId)
      .then((res) => SaveFile(res.data))
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
                      <Link to={"/admin/services"}> My Dashboard </Link> &gt;
                    </li>
                    <li>
                      <Link to={"/admin/services"}>&nbsp;My Customers</Link> &gt;
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
                  <img src="/images/comments.png" /> Conversation
                </Link>
                {serviceStatus!=="ASSIGNED" ? (
                <Link className="conversation-btn active" onClick={assignExecutive}>
                  <img src="/images/admin-assig-icon.png" /> ASSIGN
                </Link>):(
                <Link className="conversation-btn active">
                  <img src="/images/checked.png" /> {serviceStatus}
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
                                 {document.fileName ? 
                                 (
                                    <Link to={props.myroute} onClick={() => {
                                          DownloadDocument(document.documentId);
                                        }}>
                                      <img src="/images/download-icon.png" />
                                      <span
                                        style={{ textDecoration: "underline" }}
                                      >
                                        {document.name}
                                      </span>
                                    </Link>
                                  ) :(
                                    <span>{document.name}</span>
                                  ) }
                                </td>
                                <td>{moment(document.createdAt).format(
                                    "DD MMM YYYY"
                                  )}</td>
                                <td>
                                  {document.fileName ? (
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
                                          DownloadDocument(document.documentId);
                                        }}
                                      >
                                        <img src="/images/download-icon.png" />
                                      </button>
                                       <button
                                        onClick={() => {
                                          ViewDocument(document.documentId);
                                        }}
                                      >
                                        <img src="/images/edit-icon.png" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                     <button className="button">
                                        <img src="/images/view-icon.png" className="disabled-icon"/>
                                      </button>
                                      <label onClick={(e) =>
                                        userFileUpload(e, document.documentId)
                                      }>
                                    <input className="button" type="file" style={{display:"none"}}></input>
                                      <img src="/images/upload-icon.png" />
                                    
                                    </label>
                                    <button className="button">
                                        <img src="/images/edit-icon.png" className="disabled-icon"/>
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
      {isOpen && <ConversationModal handleClose={togglePopup} userServiceId={serviceId}/>}
      {isEOpen && <ExecutiveModal handleEClose={toggleEPopup} userServiceId={serviceId}/>}
    </div>
  );
}
