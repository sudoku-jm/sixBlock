import React from "react";
import { PageTitle2 } from "../style/AppCommonStyle";
import { UserPlanerDashboardStyle } from "../style/UserStyle";
import PropTypes from "prop-types";
const UserPlanerStatus = ({ plans }) => {
  const { totalPlans,finishedPlans, successRate, top5 } = plans || {};
  return (
    <UserPlanerDashboardStyle>
      <PageTitle2>나의 플래너</PageTitle2>
      <div className="planer-dashboard">
        <div className="status-cnt">
          <div className="status-box">
            <h4>총 플래너 성공 개수</h4>
            <p>
              <em>{finishedPlans}</em> / 
              <span>{totalPlans}</span> 건
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
            {top5?.map((t) => {
              return (
                <li key={t.keyword}>
                  <span>{t.keyword}</span>
                  <i>({t.cnt}회)</i>
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
