import React, { useEffect } from "react";
import { getMyFilenames } from "../features/assets/AssetsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AssetsList = () => {
  const dispatch = useDispatch();
  const { filenames } = useSelector((state) => state.assets);

  useEffect(() => {
    dispatch(getMyFilenames());
  }, [dispatch]);

  return (
    <>
      {filenames
        ? filenames.map((filename) => <p key={filename}>{filename}</p>)
        : null}
    </>
  );
};

export default AssetsList;
