import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import { handleSuccess, handleError } from "../Common/CustomAlerts";
import Header from "../Common/Header";
export default function EServices(props) {
  const [servicesList, setServicesList] = useState([]);
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
        axios.get(config.apiurl + config.userservices, headerconfig),
        fetchPerPage: (cp, pp) =>
        axios.get(
          config.apiurl + config.userservices + `?pageNo=${cp}&pageSize=${pp}`,
          headerconfig
        )
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
            &nbsp;
            {currentpage} to {noofpages} of {totalrecords}
          </span>
          &nbsp; entries
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
                      <Link to={"/executive/services"}> Home </Link> &gt;
                    </li>
                    <li>
                      &nbsp;Services Applied
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
                          Services Applied
                        </th>
                        <th scope="col">Date Assigned</th>
                        <th scope="col"> Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicesList &&
                        servicesList.filter((servicesList) => servicesList.executiveId == localStorage.getItem('userId')).map((service) => (
                          <tr>
                            <td scope="row" key={service.id}>
                              1
                            </td>
                            <td>{service.serviceCode}</td>
                            <td>{service.serviceName}</td>
                            <td>
                              {service.createdAt}
                            </td>
                            <td>
                              <Link
                                to={"/executive/service/details/" + service.id}
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