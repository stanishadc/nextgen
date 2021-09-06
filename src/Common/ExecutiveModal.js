import React, { useState, useEffect } from "react";
import config from "../config";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { handleError } from "../Common/CustomAlerts";
const initialFieldValues = {
  serviceId: 0,
  executiveId: 0,
  status: "",
};

export default function ExecutiveModal(props) {
  const history = useHistory();
  const [executiveList, setExecutiveList] = useState([]);
  const [assignedExecutive, setAssignedExecutive] = useState(0);
  const applicationAPI = () => {
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    return {
      fetchAll: () =>
        axios.get(config.apiurl + config.executives, headerconfig),
      assignExecutive: (newRecord) =>
        axios.put(
          config.apiurl + config.updateservice + props.userServiceId,
          newRecord,
          headerconfig
        ),
    };
  };
  const onChangeValue = (event) => {
    console.log(event.target.value)
    setAssignedExecutive(event.target.value)
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
    console.log("1")
  };
  const AssignTasks = (e) => {
    e.preventDefault();
      initialFieldValues.status = "Assigned";
      initialFieldValues.serviceId = props.userServiceId;
      initialFieldValues.executiveId = assignedExecutive;
      updateService(initialFieldValues);
  };
  const updateService = (formData) => {
    applicationAPI()
      .assignExecutive(formData)
      .then((res) => {
        console.log(res.data);
        props.handleEClose();
      });
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
                  className="close close-btn-2"
                  onClick={CloseLogin}
                  aria-label="Close"
                >
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
                      executiveList.map((executive) => (
                        <div className="col-md-4">
                          <div className="radio-btn-assigned-box">
                            <label className="rad">
                              <input
                                type="radio"
                                name="rad1"
                                value={executive.id}
                                onChange={onChangeValue}
                              />
                              <i /> <img src="/images/assigned-1.png" />
                              {executive.name}
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
                        className="btn assign-btn-popup-cancel"
                        onClick={CloseLogin}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn assign-btn-popup"
                        onClick={AssignTasks}
                      >
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
