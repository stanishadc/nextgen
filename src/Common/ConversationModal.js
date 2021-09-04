import React, { useState, useEffect } from "react";
import config from "../config";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { handleError } from "../Common/CustomAlerts";
const initialFieldValues = {
  serviceId: 0,
  message: "",
};
export default function ConversationModal(props) {
  const history = useHistory();
  const [values, setValues] = useState(initialFieldValues)
  const [errors, setErrors] = useState({})
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
        create: newRecord => axios.post(config.apiurl +
            config.getconversation +
            props.userServiceId +
            "/conversations",
          newRecord, headerconfig)
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
        console.log(res);
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
                <button
                  type="button"
                  className="close close-btn-2"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body ">
                <div className="popup-body-box">
                  {conversationList &&
                    conversationList.map((conversions) => (
                      <div
                        className={
                          conversions.senderName === "Vivek Aditya"
                            ? "recvied-box"
                            : "recvied-box sent-box"
                        }
                      >
                        <div className="user-img">
                          <img src="/images/send-user.png" />
                        </div>
                        <div className="user-msg">
                          <div className="msg-box">
                            <p>{conversions.message}</p>
                          </div>
                          <p className="sent-time">
                            Sent {moment(conversions.createdAt).format("LT")}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="modal-footer">
                <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                  <div className="write-message-box">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={values.message}
                      onChange={handleInputChange}
                      name="message" id="message"
                    />
                    <button className="submit-btn-msg">
                      <img src="/images/send-button.png" />
                    </button>
                  </div>
                </form>
              </div>
              {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
