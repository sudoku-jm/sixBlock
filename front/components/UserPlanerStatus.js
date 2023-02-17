import React from "react";
import { PageTitle2 } from "../style/AppCommonStyle";
import { UserPlanerDashboardStyle } from "../style/UserStyle";
import PropTypes from "prop-types";
const UserPlanerStatus = ({ plans }) => {
  const { totalPlans, successRate, topKeywords } = plans || {};
  return (
    <UserPlanerDashboardStyle>
      <PageTitle2>나의 플래너</PageTitle2>
      <div className="planer-dashboard">
        <div className="status-cnt">
          <div className="status-box">
            <h4>총 플래너 개수</h4>
            <p>
              <em>{totalPlans}</em>건
            </p>
          </div>
          <div className="status-box">
            <h4>성공률</h4>
            <p>
              <em>{successRate}</em>%
            </p>
          </div>
        </div>
        <div className="list-keyword">
          <h4>TOP 키워드</h4>
          <ol>
            {topKeywords?.map((keyword) => {
              return (
                <li key={keyword}>
                  <span>{keyword}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </UserPlanerDashboardStyle>
  );
};

UserPlanerStatus.propTypes = {
  plans: PropTypes.object,
};

export default UserPlanerStatus;
