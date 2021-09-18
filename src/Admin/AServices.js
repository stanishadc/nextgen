import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import { handleSuccess, handleError } from "../Common/CustomAlerts";
import Header from "../Common/Header";

export default function AServices(props) {
  const [servicesList, setServicesList] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [perpage, setperpage] = useState(5);  
  const [totalrecords, settotalrecords] = useState(0);
  const [noofpages, setnoofpages] = useState(0);

  const applicationAPI = () => {
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    return {
      fetchAll: () =>
        axios.get(config.apiurl + config.userservices, headerconfig),
      fetchPerPage: (cp, pp) =>
        axios.get(
          config.apiurl + config.userservices + `?pageNo=${cp}&pageSize=${pp}`,
          headerconfig
        ),
    };
  };
  function GetAllServices() {
    applicationAPI()
      .fetchAll()
      .then((res) => calculatepagination(res.data))
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  function refreshServicesList(cp) {
    applicationAPI()
      .fetchPerPage(cp, perpage)
      .then((res) => setServicesList(res.data))
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
    console.log(e.target.innerText);
    setcurrentpage(Number(e.target.innerText));
    refreshServicesList(Number(e.target.innerText));
  }
  function updatePagination() {
    const list = [];
    for (var i = 0; i < noofpages; i++) {
      list.push(
        <li className="page-item active">
          <Link className="page-link" onClick={(e) => updateCurrentPage(e, i)}>
            {Number(i) + 1}
          </Link>
        </li>
      );
    }
    return <ul className="pagination justify-content-end">{list}</ul>;
  }
  useEffect(() => {    
    refreshServicesList(currentpage);
    GetAllServices();
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
                      <Link to={"/admin/services"}> Home </Link> &gt;
                    </li>
                    <li>&nbsp;Limited Liability Partnership</li>
                    <li>
                      <a href="#">&nbsp;</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="clearfix pad30" />
              <div className="col-md-8">
                <div className="page-title-d">
                  <h2 className="font-avenir-bold">
                    <img src="/images/file-icon.png" />
                    <span>Limited Liability Partnership</span>
                  </h2>
                </div>
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
                          Customer Name
                        </th>
                        <th scope="col">Date Applied</th>
                        <th scope="col">Status</th>
                        <th scope="col"> Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicesList &&
                        servicesList.map((service, index) => (
                          <tr>
                            <td scope="row" key={service.id}>
                              {index + 1}
                            </td>
                            <td>{service.serviceCode}</td>
                            <td>{service.userName}</td>
                            <td>{service.createdAt}</td>
                            <td>
                              {service.status === "NEW" ? (
                                <span className="status-primary">
                                  {service.status}
                                </span>
                              ) : service.status === "WIP" ? (
                                <span className="status-info">
                                  {service.status}
                                </span>
                              ) : service.status === "SUBMITTED" ? (
                                <span className="status-success">
                                  {service.status}
                                </span>
                              ) : service.status === "ASSIGNED" ? (
                                <span className="status-warning">
                                  {service.status}
                                </span>
                              ) : (
                                <span className="status-success">
                                  {service.status}
                                </span>
                              )}
                            </td>
                            <td>
                              <Link
                                to={"/admin/service/details/" + service.id}
                                type="button"
                                className="view-btn"
                              >
                                View Details
                              </Link>
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
    </div>
  );
}
