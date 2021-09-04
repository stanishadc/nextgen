import React, { useState, useEffect } from "react";
import config from "../config";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { handleError } from "../Common/CustomAlerts";

export default function ExecutiveModal(props) {
  const history = useHistory();
  const [executiveList, setExecutiveList] = useState([]);
  const applicationAPI = () => {
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    return {
      fetchAll: () =>
        axios.get(config.apiurl + config.executives, headerconfig),
    };
  };
  function refreshExecutiveList() {
    applicationAPI()
      .fetchAll()
      .then((res) => setExecutiveList(res.data))
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  useEffect(() => {
    refreshExecutiveList();
  }, []);
  const CloseLogin = () => {
    props.handleEClose();
  };
  return (
    <div className="popup-ebox">
      <div className="ebox">
        <div
          id="Assigned_modal"
          tabIndex={-1}
          aria-labelledby="exampleModalCenterTitle"
        >
          <div>
            <div className="modal-content status-box">
              <div className="modal-body ">
                <Link
                  className="close close-btn-2" onClick={CloseLogin}
                  aria-label="Close">
                  <span aria-hidden="true">×</span>
                </Link>
                <div className="assigned-box">
                  <h5 className="modal-title ">Assign To Your Executive</h5>
                  <div className="row">
                    <div className="col-md-10">
                      <div className="input-group search-assign">
                        <input
                          className="form-control py-2 border-right-0 border"
                          type="search"
                          placeholder="Search by executive/employee name"
                        />
                        <div className="input-group-append">
                          <button className="input-group-text">
                            <i className="fa fa-search" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                  {executiveList &&
                        executiveList.map(executive => (
                    <div className="col-md-4">
                      <div className="radio-btn-assigned-box">
                        <label className="rad">
                          <input type="radio" name="rad1" defaultValue="a" />
                          <i /> <img src="/images/assigned-1.png" /> {executive.name}
                          Ahmed
                        </label>                        
                      </div>
                    </div>
                        ))}                    
                  </div>
                  <div className="col-md-12 mt-4">
                      <div className="text-right">
                        <button
                          type="button"
                          className="btn assign-btn-popup-cancel" onClick={CloseLogin}
                        >
                          Cancel
                        </button>
                        <button type="button" className="btn assign-btn-popup">
                          Assign
                        </button>
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
