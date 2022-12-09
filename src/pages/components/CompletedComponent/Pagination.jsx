import { useState } from "react";
import { Pagination } from "react-bootstrap";
import { CurrentCompletedTasks } from "./CurrentCompletedTasks";

export const PaginatedTasks = ({ completedTasks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCompletedTasks = completedTasks.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(completedTasks.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <CurrentCompletedTasks currentCompletedTasks={currentCompletedTasks} />
      <div className="d-flex justify-content-center ">
        <Pagination>
          <Pagination.First
            disabled={currentPage === 1 ? true : false}
            onClick={() => {
              setCurrentPage(1);
            }}
          />
          <Pagination.Prev
            disabled={currentPage === 1 ? true : false}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
          />

          {/* <Pagination.Ellipsis /> */}
          {pageNumbers.map((number, index) => (
            <Pagination.Item
              key={index}
              active={number === currentPage}
              onClick={() => {
                setCurrentPage(number);
              }}
            >
              {number}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={
              currentPage === Math.ceil(completedTasks.length / postsPerPage)
                ? true
                : false
            }
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
          />
          <Pagination.Last
            onClick={() => {
              setCurrentPage(Math.ceil(completedTasks.length / postsPerPage));
            }}
          />
        </Pagination>
      </div>
    </>
  );
};
