import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Pagination(props) {
  const [currentpage, setcurrentpage] = useState(1);
  const [perpage, setperpage] = useState(5);
  const [totalrecords, settotalrecords] = useState(0);
  const [noofpages, setnoofpages] = useState(0);
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
            {currentpage} to {noofpages} of {totalrecords}
          </span>
          entries
        </p>
      </div>
    );
  }
  function updateCurrentPage(e) {
    console.log(e.target.innerText);
    setcurrentpage(Number(e.target.innerText));
  }
  function updatePagination() {
    const list = [];
    for (var i = 0; i < noofpages; i++) {
      list.push(
        <li className="page-item active">
          <Link className="page-link" onClick={(e) => updateCurrentPage(e, i)}>
            {Number(i) + 1}
          </Link>
        </li>
      );
    }
    return <ul className="pagination justify-content-end">{list}</ul>;
  }
  return (
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
  );
}
