import React, { useMemo, useRef } from "react";
import { TiImage } from "react-icons/ti";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const PhotoProfile = ({ page }) => {
  const { user } = useSelector((state) => state.user);
  const { photoProfile } = user;
  const inputFile = useRef(null);
  const onUploadFile = () => {
    inputFile.current.click();
  };
  const styleIconImage = useMemo(
    () => ({
      fontSize: "1.8rem",
      lineHeight: "1.8rem",
      color: "var(--color-secondary)",
    }),
    []
  );
  return (
    <>
      <figure className="photo-wrap">
        <input type="file" id="file" ref={inputFile} className="hdtxt" />
        <a title="" className="photo">
          <img src={photoProfile || ""} alt="" />
        </a>

        {page !== "mypage" && (
          <button title="이미지교체" onClick={onUploadFile}>
            <TiImage style={styleIconImage} />
          </button>
        )}
      </figure>
    </>
  );
};

PhotoProfile.propTypes = {
  page: PropTypes.string.isRequired,
};

export default PhotoProfile;
