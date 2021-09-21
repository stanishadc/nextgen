import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import { handleSuccess, handleError } from "../Common/CustomAlerts";
import Header from "../Common/Header";
import ConversationModal from "../Common/ConversationModal";
import ExecutiveModal from "../Common/ExecutiveModal";
import ReactTooltip from "react-tooltip";
import PaginationTool from "../Common/Pagination";
const initialServiceValues = {
  userServiceId: 0,
  status: "",
};

export default function AServiceDetails(props) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isEOpen, setIsEOpen] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [serviceIds, setServiceIds] = useState([]);
  const [userName, setUserName] = useState([]);
  const [serviceName, setServiceName] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [createFile, setCreateFile] = useState(null);
  const [serviceStatus, setServiceStatus] = useState(null);
  const [currentpage, setcurrentpage] = useState(0);
  const [perpage, setperpage] = useState(10);
  const [totalrecords, settotalrecords] = useState(0);
  const [noofpages, setnoofpages] = useState(0);

  const applicationAPI = () => {
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    return {
      fetchAll: () =>
        axios.get(
          config.apiurl + config.getuserservice + serviceIds,
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
      downloadDocument: (id) =>
        axios.get(
          config.apiurl + config.filedownload + serviceIds + "/documents/" + id,
          headerconfig
        ),
    };
  };
  const togglePopup = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  const toggleEPopup = () => {
    if (isEOpen) {
      setIsEOpen(false);
    } else {
      setIsEOpen(true);
    }
  };
  function refreshServicesList(cp) {
    var m = window.location.pathname.split("/");
    setServiceIds(m[4]);
    applicationAPI()
      .fetchPerPage(cp, perpage, m[4])
      .then(
        (res) => (
          calculatepagination(res.data.documents),
          setUserName(res.data.userName),
          setServiceName(res.data.serviceName),
          setServiceStatus(res.data.status),
          setServicesList(res.data.documents)
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
  const assignExecutive = () => {
    {
      toggleEPopup();
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
  
  function GetAllServices() {
    applicationAPI()
      .fetchAll()
      .then((res) => calculatepagination(res.data.documents))
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  function calculatepagination(DataList) {
    settotalrecords(DataList.length);
    setnoofpages(Math.round(DataList.length / perpage));
  }
  function updateShowEntries() {
    return (
      <div className="col-md-6">
        <p className="showing-entries">
          Showing
          <span>
            {currentpage} to {noofpages} of {totalrecords}
          </span>
          entries
        </p>
      </div>
    );
  }
  function updateCurrentPage(e) {
    setcurrentpage(Number(e.target.id));
    refreshServicesList(Number(e.target.id));
  }
  function updatePagination() {
    const list = [];
    for (var i = 0; i < noofpages; i++) {
      list.push(
        <li className="page-item active">
          <Link
            className="page-link"
            onClick={(e) => updateCurrentPage(e, i)}
            id={i}
          >
            {Number(i) + 1}
          </Link>
        </li>
      );
    }
    return <ul className="pagination justify-content-end">{list}</ul>;
  }
  useEffect(() => {
    refreshServicesList(currentpage);
  }, []);
  useEffect(() => {
    ReactTooltip.rebuild();
  });
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
                      <Link to={"/admin/services"}>
                        &nbsp;My Customers&nbsp;
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
                <Link className="conversation-btn" onClick={checkConversation}>
                  <img src="/images/comments.png" /> Conversation
                </Link>
                {serviceStatus !== "ASSIGNED" ? (
                  <Link
                    className="conversation-btn active"
                    onClick={assignExecutive}
                  >
                    <img src="/images/admin-assig-icon.png" /> ASSIGN
                  </Link>
                ) : (
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
                                  data-tip
                                  data-for="downloadTip"
                                  to={props.myroute}
                                  onClick={() => {
                                    DownloadDocument(document.documentId);
                                  }}
                                >
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
              {updateShowEntries()}
              <div className="col-md-6">
                <div className="list-box-p">
                  <div className="pagination-list-box">
                    <ul className="pagination justify-content-end">
                      {updatePagination()}
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
      {isOpen && (
        <ConversationModal
          handleClose={togglePopup}
          userServiceId={serviceIds}
        />
      )}
      {isEOpen && (
        <ExecutiveModal
          handleEClose={toggleEPopup}
          userServiceId={serviceIds}
        />
      )}
    </div>
  );
}
