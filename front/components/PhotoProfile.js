import React, { useMemo, useRef } from "react";
import { TiImage } from "react-icons/ti";

const PhotoProfile = () => {
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
          <img
            src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
            alt=""
          />
        </a>
        <button title="이미지교체" onClick={onUploadFile}>
          <TiImage style={styleIconImage} />
        </button>
      </figure>
    </>
  );
};

export default PhotoProfile;
