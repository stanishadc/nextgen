import React, { useState, useEffect } from "react";
export default function SearchBox(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <button id="Search-hide" className="search-hide-btn">
            X
          </button>
          <div className="search-iput">
            <input type="text" className placeholder="Type here to search..." />
            <button type="button" className="btn search-iput-btn">
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
