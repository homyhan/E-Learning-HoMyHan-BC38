import React from "react";
import { useSelector } from "react-redux";
import CourseItem from "./CourseItem";
import { Pagination } from "antd";
import { useSearchParams } from "react-router-dom";
import "./CourseList.css";

const CourseList = () => {
  const { courseList, courseListCategory } = useSelector(
    (state) => state.booking
  );
  const [searchParam, setSearchParam] = useSearchParams();
  const url = window.location.href;
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="container mx-auto courseList">
      {url.includes("course-list") && courseListCategory?.length === 0 ? (
        <div className="dsCourse">
          {user?.chiTietKhoaHocGhiDanh?.map((item, index) => {
            return <CourseItem key={index} item={item}></CourseItem>;
          })}
        </div>
      ) : null}
      {courseListCategory?.length === 0 ? (
        <>
          <div className="dsCourse">
            {courseList?.items?.map((item, index) => {
              return <CourseItem key={index} item={item}></CourseItem>;
            })}
          </div>
          <Pagination
            current={
              searchParam.get("page") === null
                ? 1
                : Number(searchParam.get("page"))
            }
            className="p-6 text-center text-white "
            pageSize={8}
            total={courseList.totalCount}
            onChange={(page, pageSize) => {
              setSearchParam({ page });
            }}
          />
        </>
      ) : (
        <>
          <div className="dsCourse">
            {courseListCategory?.map((item, index) => {
              return <CourseItem key={index} item={item}></CourseItem>;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CourseList;
