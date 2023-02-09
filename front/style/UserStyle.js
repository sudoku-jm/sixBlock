import styled from "styled-components";
const UserProfileStyle = styled.section`
  & {
    display: flex;
    margin: 3rem auto 0 auto;
    background: var(--color-white);
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1);
    border-radius: 2rem;
    padding: 2rem;
    .photo-wrap {
      position: relative;
      .photo {
        display: block;
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.1);
          width: 100%;
        }
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 30px;
        height: 30px;
        background: var(--color-white);
        border: 1px solid var(--color-c2c2c5);
        border-radius: 50%;
      }
    }
    .profile-info {
      margin-left: 2rem;
      width: calc(100% - 2rem);
      .nickname {
        display: block;
        font-size: 1.6rem;
        font-weight: 600;
      }
      .email {
        display: block;
        margin: 1rem 0;
        color: var(--color-secondary);
        font-size: 1.3rem;
        font-weight: 300;
      }
      .btn-area {
        button {
          margin: 0 0.5rem 0 0;
        }
      }
    }
  }
`;

const UserPlanerDashboardStyle = styled.section`
  & {
    margin-top: 6rem;
    .planer-dashboard {
      padding: 2rem 0;
      font-size: 1.6rem;
      color: var(--color-secondary);
      h4 {
        font-weight: 300;
      }
      p {
        font-weight: 300;
      }
      .list-keyword,
      .status-box {
        margin-bottom: 2rem;
        border-radius: 2rem;
        padding: 3rem 2rem;
        background: var(--color-white);
        box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1);
      }
      .status-cnt {
        & > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          em {
            padding: 0 0.3rem 0 0;
            font-weight: 700;
            letter-spacing: -0.1rem;
            font-size: 2.5rem;
            color: var(--color-primary);
          }
        }
      }
      .list-keyword {
        ol {
          margin-top: 1rem;
          counter-reset: number;
        }
        li {
          padding: 1rem 2rem 1rem 4rem;
          color: var(--color-black333);
          text-indent: -2rem;
          &:first-child {
            background: var(--color-primary-op2);
            border-radius: 1.2rem;
          }
          &:before {
            counter-increment: number 1;
            content: counter(number) ". ";
          }
        }
      }
    }
  }
`;
export { UserProfileStyle, UserPlanerDashboardStyle };
