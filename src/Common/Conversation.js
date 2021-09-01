import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
export default function Login(props) {
  const history = useHistory();
  const CloseLogin = () => {
    props.handleClose();
  };
  return <div>Popup</div>;
}
