import React, { useState, useEffect } from "react";
import config from "../config";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { handleError } from "../Common/CustomAlerts";
const initialFieldValues = {
  serviceId: 0,
  message: "",
};
export default function ConversationModal(props) {
  const history = useHistory();
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const [conversationList, setConversationList] = useState([]);
  const applicationAPI = () => {
    const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    return {
      fetchAll: () =>
        axios.get(
          config.apiurl +
            config.getconversation +
            props.userServiceId +
            "/conversations",
          headerconfig
        ),
      create: (newRecord) =>
        axios.post(
          config.apiurl +
            config.getconversation +
            props.userServiceId +
            "/conversations",
          newRecord,
          headerconfig
        ),
    };
  };
  const CloseLogin = () => {
    props.handleClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      initialFieldValues.message = values.message;
      initialFieldValues.serviceId = props.userServiceId;
      addOrEdit(initialFieldValues);
    }
  };
  const validate = () => {
    let temp = {};
    temp.message = values.message == "" ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x == true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const addOrEdit = (formData) => {
    applicationAPI()
      .create(formData)
      .then((res) => {
        refreshConversationList();
        values.message = "";
      });
  };
  function refreshConversationList() {
    applicationAPI()
      .fetchAll()
      .then((res) => setConversationList(res.data.messages))
      .catch(function (error) {
        if (error.response) {
          handleError(error.response.data.message);
        }
      });
  }
  const applyErrorClass = (field) =>
    field in errors && errors[field] == false ? " form-control-danger" : "";
  useEffect(() => {
    refreshConversationList();
  }, []);
  return (
    <div className="popup-box">
      <div className="box">
        <div
          id="Conversation_modal"
          tabIndex={-1}
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-lg modal-dialog-centered">
            <div className="modal-content status-box">
              <div className="modal-header title-box-popup">
                <h5 className="modal-title ">Start discussion with Admin</h5>
                <small>
                  Lorem ipsum is a pseudo-Latin text used in web design,
                  typography, layout, and printing in place of English to.
                </small>
                <Link
                  className="close close-btn-2"
                  onClick={CloseLogin}
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </Link>
              </div>
              <div className="modal-body ">
                <div className="popup-body-box">
                  {conversationList &&
                    conversationList.map((conversions) =>
                      conversions.senderName ===
                      localStorage.getItem("userName") ? (
                        <div className="recvied-box">
                          <div className="user-img">
                            <img src="/images/send-user.png" />
                          </div>
                          <div className="user-msg">
                            <div className="msg-box">
                              <p>{conversions.message}</p>
                            </div>
                            <p className="sent-time">
                              Sent {conversions.createdAt}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="recvied-box sent-box">
                          <div className="user-msg">
                            <div className="msg-box">
                              <p>{conversions.message}</p>
                            </div>
                            <div className="sender-user-img">
                              <img src="/images/send-user.png" />
                            </div>
                            <p className="sent-time">
                              Sent {conversions.createdAt}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
              <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                <div className="modal-footer">
                  <div className="write-message-box">
                    <input
                      type="text"
                      className={applyErrorClass("message")}
                      placeholder="Type a message..."
                      value={values.message}
                      onChange={handleInputChange}
                      name="message"
                      id="message"
                    />
                    <button className="submit-btn-msg">
                      <img src="/images/send-button.png" />
                    </button>
                  </div>
                </div>
              </form>
              {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
