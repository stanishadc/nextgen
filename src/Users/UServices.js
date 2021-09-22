import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import {handleError } from "../Common/CustomAlerts";
import Header from "../Common/Header";

export default function UServices(props) {
  const [servicesList, setServicesList] = useState([]);
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
    return {
      fetchAll: () =>
        axios.get(config.apiurl + config.userservices, headerconfig),
      fetchPerPage: (cp, pp) =>
        axios.get(
          config.apiurl + config.userservices + `?pageNo=${cp}&pageSize=${pp}`,
          headerconfig
        )
    };
  };
  function refreshServicesList(cp) {
    applicationAPI()
      .fetchPerPage(cp, perpage)
      .then(
        (res) => (
          settotalrecords(res.data.totalItems),
          setnoofpages(res.data.totalPages),
          setServicesList(res.data.services),
          setFirstPage(res.data.isFirst),
          setLastPage(res.data.isLast)
        )
      )
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  function updateCurrentPage(e) {
    setIndexPage(perpage * Number(e.target.id));
    setcurrentpage(Number(e.target.id));
    refreshServicesList(Number(e.target.id));
  }
  function updatePreviousPage(e) {
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
            onClick={(e) => updateCurrentPage(e, i)}
            id={i}
          >
            {Number(i) + 1}
          </Link>
        </li>
      );
    }
    return (
      <ul className="pagination justify-content-end">
        {firstPage == false ? (
          <li className="page-item">
            <Link
              className="page-link"
              onClick={(e) => updatePreviousPage(e, i)}
            >
              <i className="fa  fa-caret-left" />
            </Link>
          </li>
        ) : null}
        {list}
        {lastPage == false ? (
          <li className="page-item">
            <Link className="page-link" onClick={(e) => updateNextPage(e, i)}>
              <i className="fa  fa-caret-right" />
            </Link>
          </li>
        ) : null}
      </ul>
    );
  }
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
                      &nbsp;Applied Services
                    </li>
                  </ul>
                </div>
              </div>
              <div className="clearfix pad30" />
              <div className="col-md-8">
                <div className="page-title-d">
                  <h2 className="font-avenir-bold">
                    <img src="/images/file-icon.png" />
                    <span>APPLIED SERVICES</span>
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
                          Applied Services
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
                              {index+1}
                            </td>
                            <td>{service.serviceCode}</td>
                            <td>{service.serviceName}</td>
                            <td>
                              {service.createdAt}
                            </td>
                            <td>{service.status==="NEW" ?
                            <span className="status-primary">{service.status}</span>
                            :
                            service.status==="WIP" ?
                            <span className="status-warning">{service.status}</span>
                            :
                            service.status==="SUBMITTED" ?
                            <span className="status-success">{service.status}</span>
                            :
                            service.status==="ASSIGNED" ?
                            <span className="status-info">{service.status}</span>
                            :
                            <span className="status-success">{service.status}</span>
                            }</td>
                            <td>
                              <Link
                                to={"/users/service/details/" + service.id}
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
    </div>
  );
}
