import React, { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import {handleError } from "../Common/CustomAlerts";
import Header from "../Common/Header";

export default function UServices(props) {
  const [servicesList, setServicesList] = useState([]);
  const applicationAPI = () => {
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    return {
      fetchAll: () =>
        axios.get(config.apiurl + config.userservices, headerconfig),
    };
  };
  function refreshServicesList() {
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
                        servicesList.map((service) => (
                          <tr>
                            <td scope="row" key={service.id}>
                              1
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
    </div>
  );
}
