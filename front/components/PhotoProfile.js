import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TiImage,TiImageOutline } from "react-icons/ti";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_PROFILE_IMG_REQUEST } from "../reducers/user";

const PhotoProfile = ({ page }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { photoProfile , srcYn, profileUploadDone } = user;
  const inputFile = useRef(null);

  useEffect(() => {
    if(profileUploadDone){
      dispatch({
        
      });
      console.log("업로드 이미지 조회");
    }
  },[profileUploadDone]);

  const onUploadFile = useCallback(() => {
    inputFile.current.click();
  }, [inputFile.current]);
  const onChangeFile = useCallback(async(e) => {
    const imageFormData = new FormData();
    imageFormData.append("image", e.target.files[0]);
    const imgupload = await dispatch({
      type : UPLOAD_PROFILE_IMG_REQUEST,
      data : imageFormData
    });

    console.log('imgupload',imgupload)
  }, []);
  const styleIconNoImage = useMemo(
    () => ({
      position:"absolute",
      left: "50%",
      top:"50%",
      transform:"translate(-50%,-50%)",
      color: "var(--color-f0f0f0)",
      width: "70%",
      height:"70%"
    }),
    []
  );
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
        {srcYn == "Y" ?  
          <img src={photoProfile} alt="" /> 
        : 
          <TiImageOutline style={styleIconNoImage}/>
        }
         
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


export default PhotoProfile;
