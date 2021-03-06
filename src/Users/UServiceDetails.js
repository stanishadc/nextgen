import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import { handleSuccess, handleError } from "../Common/CustomAlerts";
import Header from "../Common/Header";
import Conversation from "../Common/ConversationModal";
import ReactTooltip from "react-tooltip";

export default function UServiceDetails(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [serviceName, setServiceName] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [serviceStatus, setServiceStatus] = useState(null);
  const [markStatus, setMarkStatus] = useState(null);
  const [serviceIds, setServiceIds] = useState(null);
  const [currentpage, setcurrentpage] = useState(0);
  const [perpage, setperpage] = useState(10);
  const [totalrecords, settotalrecords] = useState(0);
  const [noofpages, setnoofpages] = useState(0);
  const [indexPage, setIndexPage] = useState(0);
  const [firstPage, setFirstPage] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [goPage, setGoPage] = useState(0);
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
      fetchAll: (sId) =>
        axios.get(
          config.apiurl + config.getuserservice + sId,
          headerconfig
        ),
        fetchPerPage: (cp, pp, sId) =>
        axios.get(
          config.apiurl +
            config.getuserservice +
            sId +
            `?pageNo=${cp}&pageSize=${pp}`,
          headerconfig
        ),
      uploadFile: (id, serviceId, newRecord) =>
        axios.post(
          config.apiurl + config.fileupload + serviceId + "/documents/" + id,
          newRecord,
          headerconfig
        ),
      downloadDocument: (id, serviceId) =>
        axios.get(
          config.apiurl + config.filedownload + serviceId + "/documents/" + id,
          fileHeaderconfig
        ),
      updateETaskStatus: (updateData) =>
        axios.put(
          config.apiurl + config.updateservice + serviceIds,
          updateData,
          headerconfig
        )
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
    var m = window.location.pathname.split("/");
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      const formData = new FormData();
      formData.append("documentId", documentId);
      formData.append("userServiceId", m[4]);
      formData.append("file", e.target.files[0]);
      uploadData(documentId, formData);
    }
  }
  function ViewDocument(documentId) {
    var m = window.location.pathname.split("/");
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      config.apiurl + config.filedownload + m[4] + "/documents/" + documentId,
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
    var m = window.location.pathname.split("/");
    var xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      config.apiurl + config.filedownload + m[4] + "/documents/" + documentId,
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
  const uploadData = (documentId, formData) => {
    var m = window.location.pathname.split("/");
    applicationAPI()
      .uploadFile(documentId, m[4], formData)
      .then((res) => {
        if (res.status == 200) {
          handleSuccess("File uploaded successfully");
          refreshServicesList(currentpage);
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

  function refreshServicesList(cp) {
    var m = window.location.pathname.split("/");
    setServiceIds(m[4]);
    applicationAPI()
      .fetchPerPage(cp, perpage, m[4])
      .then(
        (res) => (
          setServiceName(res.data.service.serviceName),
          setServiceStatus(res.data.service.status),
          setMarkStatus(res.data.service.enableMarkAsDone),
          setServicesList(res.data.service.documents)
        )
      )
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  const UpdateTaskStatus = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", "COMPLETED");
    formData.append("serviceId", serviceIds);
    updateService(formData);
  };
  const updateService = (formData) => {
    applicationAPI()
      .updateETaskStatus(formData)
      .then((res) => {
        handleSuccess("Successfully Submitted");
        props.handleEClose();
      })
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  };
  function GetAllServices() {
    var m = window.location.pathname.split("/");
    setServiceIds(m[4]);
    applicationAPI()
      .fetchAll(m[4])
      .then((res) => calculatepagination(res.data.service.documents))
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  function calculatepagination(DataList) {
    settotalrecords(DataList.length);
    var dt = DataList.length / perpage;
    if (dt % 1 != 0) {
      if (dt > 1) {
        setnoofpages(Math.round(DataList.length / perpage) + 1);
      } else {
        setnoofpages(Math.round(DataList.length / perpage));
      }
    } else {
      setnoofpages(Math.round(DataList.length / perpage));
    }
    if (currentpage > 0) {
      setFirstPage(true);
    } else {
      setFirstPage(false);
    }
    if (currentpage < noofpages - 1) {
      setLastPage(true);
    } else {
      setLastPage(false);
    }
  }
  function updateShowEntries() {
    return (
      <div className="col-md-6">
        <p className="showing-entries">
          Showing
          <span>
            &nbsp;
            {currentpage} to {noofpages} of {totalrecords}
          </span>
          &nbsp; entries
        </p>
      </div>
    );
  }
  function updatePagination() {
    const list = [];
    for (var i = 0; i < noofpages; i++) {
      list.push(
        <li className="page-item active">
          <Link
            className="page-link"
            onClick={(e) => updateCurrentPage(e)}
            id={i}
          >
            {Number(i) + 1}
          </Link>
        </li>
      );
    }
    return (
      <ul className="pagination justify-content-end">
        {firstPage == true ? (
          <li className="page-item">
            <Link className="page-link" onClick={(e) => updatePreviousPage(e)}>
              <i className="fa  fa-caret-left" />
            </Link>
          </li>
        ) : null}
        {list}
        {lastPage == true ? (
          <li className="page-item">
            <Link className="page-link" onClick={(e) => updateNextPage(e, i)}>
              <i className="fa  fa-caret-right" />
            </Link>
          </li>
        ) : null}
      </ul>
    );
  }
  function updateCurrentPage(e) {
    if (e.target.id > 0) {
      setFirstPage(true);
    } else {
      setFirstPage(false);
    }
    if (e.target.id < noofpages - 1) {
      setLastPage(true);
    } else {
      setLastPage(false);
    }
    setIndexPage(perpage * Number(e.target.id));
    setcurrentpage(Number(e.target.id));
    refreshServicesList(Number(e.target.id));
  }
  function updatePreviousPage(e) {
    if (currentpage > 0) {
      setFirstPage(true);
    } else {
      setFirstPage(false);
    }
    setIndexPage(perpage * Number(currentpage - 1));
    setcurrentpage(Number(currentpage - 1));
    refreshServicesList(Number(currentpage - 1));
  }
  function updateNextPage(e) {
    setIndexPage(perpage * Number(currentpage + 1));
    setcurrentpage(Number(currentpage + 1));
    refreshServicesList(Number(currentpage + 1));
  }
  function updateGoPage(pNo) {
    setIndexPage(perpage * Number(pNo));
    setcurrentpage(Number(pNo));
    refreshServicesList(Number(pNo));
  }
  function updateInput(event) {
    setGoPage(event.target.value);
  }
  useEffect(() => {
    GetAllServices();
    ReactTooltip.rebuild();
  });
  useEffect(() => {
    refreshServicesList(currentpage);
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
                {markStatus === true ? (
                  <Link className="sort-btn active" onClick={UpdateTaskStatus}>
                    <img src="/images/checked.png" /> Mark As Done
                  </Link>
                ) : null}
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
                        <th scope="col" style={{ width: "20%" }}>
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicesList &&
                        servicesList.map((document, index) => (
                          <tr key={document.id}>
                            <td scope="row"> {currentpage == 0
                                ? index + 1
                                : indexPage + index + 1}</td>
                            <td>{document.documentId}</td>
                            <td>
                              {document.fileName ? (
                                <Link to={props.myroute}>
                                  <img src="/images/download-icon.png" />
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
                                    <img src="/images/download-icon.png" />
                                  </button>
                                  <label>
                                    <input
                                      data-tip
                                      data-for="uploadTip"
                                      className="button"
                                      type="file"
                                      onChange={(e) => {
                                        userFileUpload(e, document.documentId);
                                      }}
                                      style={{ display: "none" }}
                                    ></input>
                                    <img
                                      src="/images/edit-icon.png"
                                      data-tip
                                      data-for="editTip"
                                    />
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
                                        userFileUpload(e, document.documentId);
                                      }}
                                      style={{ display: "none" }}
                                    ></input>
                                    <img
                                      src="/images/upload-icon.png"
                                      data-tip
                                      data-for="uploadTip"
                                    />
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
                  </table>
                </div>
              </div>
            </div>
            <div className="clearfix" />
            <div className="row mart40">
              {updateShowEntries()}
              <div className="col-md-6">
                <div className="list-box-p">
                  <div className="pagination-list-box">
                    <ul className="pagination justify-content-end">
                      {updatePagination()}
                    </ul>
                  </div>
                  <div className="pagination-list-box">
                    <div className="go-age-box">
                      <small>Go page</small>
                      <input
                        type="text"
                        value={goPage}
                        onChange={(e) => updateInput(e)}
                      />
                      <Link
                        onClick={(e) => updateGoPage(goPage)}
                        style={{ color: "#000", fontWeight: 700 }}
                      >
                        Go
                        <i
                          className="fa  fa-caret-right"
                          style={{ verticalAlign: "middle", marginLeft: "5px" }}
                        />
                      </Link>
                    </div>
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
        <Conversation handleClose={togglePopup} userServiceId={serviceIds} />
      )}
    </div>
  );
}
