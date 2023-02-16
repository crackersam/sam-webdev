import React, { useEffect } from "react";
import { getMyFilenames, downloadFile } from "../features/assets/AssetsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AssetsList = () => {
  const dispatch = useDispatch();
  const { filenames, rawFilenames } = useSelector((state) => state.assets);

  useEffect(() => {
    dispatch(getMyFilenames());
  }, [dispatch]);

  return (
    <>
      {filenames
        ? filenames.map((filename, i) => (
            <p key={i}>
              <a
                href={`api/assets/${rawFilenames[i]}`}
                target="_blank"
                download
              >
                {filename}
              </a>
            </p>
          ))
        : null}
    </>
  );
};

export default AssetsList;
