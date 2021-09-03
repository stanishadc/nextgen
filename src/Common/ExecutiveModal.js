import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
export default function ExecutiveModal(props) {
    const history = useHistory();
    const CloseLogin = () => {
        props.handleClose();
    };
    return <div>
        <div className="modal fade" id="Assigned_modal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content status-box">
                <div className="modal-body ">
                    <button type="button" className="close close-btn-2" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                    <div className="assigned-box">
                        <h5 className="modal-title ">Assign To Your Executive</h5>
                        <div className="row">
                            <div className="col-md-10">
                                <div className="input-group search-assign">
                                    <input className="form-control py-2 border-right-0 border" type="search" placeholder="Search by executive/employee name" />
                                    <div className="input-group-append">
                                        <button className="input-group-text"><i className="fa fa-search" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ">
                            <div className="col-md-4">
                                <div className="radio-btn-assigned-box">
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="a" />
                                        <i /> <img src="images/assigned-1.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="b" />
                                        <i />  <img src="images/assigned-2.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="c" />
                                        <i />  <img src="images/assigned-3.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="d" />
                                        <i />  <img src="images/assigned-4.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="e" defaultChecked />
                                        <i />  <img src="images/assigned-5.png" /> Khalida Ahmed
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="radio-btn-assigned-box">
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="2-a" />
                                        <i /> <img src="images/assigned-1.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="2-b" defaultChecked />
                                        <i />  <img src="images/assigned-2.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="2-c" />
                                        <i />  <img src="images/assigned-3.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="2-d" />
                                        <i />  <img src="images/assigned-4.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="2-e" />
                                        <i />  <img src="images/assigned-5.png" /> Khalida Ahmed
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="radio-btn-assigned-box">
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="a" />
                                        <i /> <img src="images/assigned-1.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="b" />
                                        <i />  <img src="images/assigned-2.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="b" />
                                        <i />  <img src="images/assigned-3.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="b" />
                                        <i />  <img src="images/assigned-4.png" /> Khalida Ahmed
                                    </label>
                                    <label className="rad">
                                        <input type="radio" name="rad1" defaultValue="b" defaultChecked />
                                        <i />  <img src="images/assigned-5.png" /> Khalida Ahmed
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-12 mt-4">
                                <div className="text-right">
                                    <button type="button" className="btn assign-btn-popup-cancel" data-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn assign-btn-popup">Assign</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div></div>
    </div>;
}
