import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function PaginationTool(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(3);
  const [todos, setTodos] = useState([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
  ]);
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const renderTodos = currentTodos.map((todo, index) => {
    return <li key={index}>{todo}</li>;
  });
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li className="page-item" key={number} id={number} onClick={handleClick}>
          {number}
          <i className="fa fa-caret-left" />
      </li>
    );
  });
  return (
    <div>
      <div className="col-md-6">
        <ul>{renderTodos}</ul>
      </div>
      <div className="col-md-6">
        <div className="list-box-p">
          <div className="pagination-list-box">
            <ul className="pagination justify-content-end">
              {renderPageNumbers}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
