import React, { useCallback, useMemo, useRef, useState } from "react";
import { TiImage } from "react-icons/ti";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

const PhotoProfile = ({ page }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { photoProfile } = user;
  const inputFile = useRef(null);
  const onUploadFile = useCallback(() => {
    inputFile.current.click();
  }, [inputFile.current]);
  const onChangeFile = useCallback((e) => {
    const imageFormData = new FormData();
    imageFormData.append("image", e.target.files[0]);
    // dispatch({});
  }, []);
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
        <input
          type="file"
          id="file"
          ref={inputFile}
          onChange={onChangeFile}
          className="hdtxt"
        />
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
