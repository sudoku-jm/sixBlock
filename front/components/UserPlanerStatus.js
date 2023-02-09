import React from "react";
import { PageTitle2 } from "../style/AppCommonStyle";
import { UserPlanerDashboardStyle } from "../style/UserStyle";

const UserPlanerStatus = () => {
  return (
    <UserPlanerDashboardStyle>
      <PageTitle2>나의 플래너</PageTitle2>
      <div className="planer-dashboard">
        <div className="status-cnt">
          <div className="status-box">
            <h4>총 플래너 개수</h4>
            <p>
              <em>300</em>건
            </p>
          </div>
          <div className="status-box">
            <h4>성공률</h4>
            <p>
              <em>100</em>%
            </p>
          </div>
        </div>
        <div className="list-keyword">
          <h4>TOP 키워드</h4>
          <ol>
            <li>
              <span>운동</span>
            </li>
            <li>
              <span>운동</span>
            </li>
            <li>
              <span>운동</span>
            </li>
            <li>
              <span>운동</span>
            </li>
            <li>
              <span>운동</span>
            </li>
          </ol>
        </div>
      </div>
    </UserPlanerDashboardStyle>
  );
};

export default UserPlanerStatus;
