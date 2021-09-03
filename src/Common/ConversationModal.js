import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
export default function ConversationModal(props) {
  const history = useHistory();
  const CloseLogin = () => {
    props.handleClose();
  };
  return
<div className="modal fade" id="Conversation_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div className="modal-content status-box">
      <div className="modal-header title-box-popup">
        <h5 className="modal-title ">Start discussion with Admin</h5>
        <small>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in
          place of English to.</small>
        <button type="button" className="close close-btn-2" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body ">
        <div className="popup-body-box">
          <div className="recvied-box">
            <div className="user-img">
              <img src="images/send-user.png" />
            </div>
            <div className="user-msg">
              <div className="msg-box">
                <p>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and
                  printing in place of English to.</p>
              </div>
              <p className="sent-time">Sent 4:50 pm</p>
            </div>
          </div>
          <div className="recvied-box">
            <div className="user-img">
              <img src="images/send-user.png" />
            </div>
            <div className="user-msg">
              <div className="msg-box">
                <p>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and
                  printing in place of English to.</p>
              </div>
              <p className="sent-time">Sent 4:50 pm</p>
            </div>
          </div>
          <div className="recvied-box sent-box">
            <div className="user-msg">
              <div className="msg-box">
                <p>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and
                  printing in place of English to.</p>
              </div>
              <p className="sent-time">Sent 4:50 pm <span><img src="images/check-2.png" /> </span></p>
            </div>
          </div>
          <div className="recvied-box">
            <div className="user-img">
              <img src="images/send-user.png" />
            </div>
            <div className="user-msg">
              <div className="msg-box">
                <p>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and
                  printing in place of English to.</p>
              </div>
              <p className="sent-time">Sent 4:50 pm</p>
            </div>
          </div>
          <div className="recvied-box sent-box">
            <div className="user-msg">
              <div className="msg-box">
                <p>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and
                  printing in place of English to.</p>
              </div>
              <p className="sent-time">Sent 4:50 pm <span><img src="images/check-2.png" /> </span></p>
            </div>
          </div>
          <div className="recvied-box">
            <div className="user-img">
              <img src="images/send-user.png" />
            </div>
            <div className="user-msg">
              <div className="msg-box">
                <p>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and
                  printing in place of English to.</p>
              </div>
              <p className="sent-time">Sent 4:50 pm</p>
            </div>
          </div>
          <div className="recvied-box sent-box">
            <div className="user-msg">
              <div className="msg-box">
                <p>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and
                  printing in place of English to.</p>
              </div>
              <p className="sent-time">Sent 4:50 pm <span><img src="images/check-2.png" /> </span></p>
            </div>
          </div>
          <div className="recvied-box">
            <div className="user-img">
              <img src="images/send-user.png" />
            </div>
            <div className="user-msg">
              <div className="msg-box">
                <p>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and
                  printing in place of English to.</p>
              </div>
              <p className="sent-time">Sent 4:50 pm</p>
            </div>
          </div>
          <div className="recvied-box sent-box">
            <div className="user-msg">
              <div className="msg-box">
                <p>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and
                  printing in place of English to.</p>
              </div>
              <p className="sent-time">Sent 4:50 pm <span><img src="images/check-2.png" /> </span></p>
            </div>
          </div>
          <div className="recvied-box">
            <div className="user-img">
              <img src="images/send-user.png" />
            </div>
            <div className="user-msg">
              <div className="msg-box">
                <p>Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and
                  printing in place of English to.</p>
              </div>
              <p className="sent-time">Sent 4:50 pm</p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <div className="write-message-box">
          <input type="text" placeholder="Type a message..." />
          <button className="submit-btn-msg">
            <img src="images/send-button.png" />
          </button>
        </div>
      </div>
      {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
    </div>
  </div>
</div>

    }
