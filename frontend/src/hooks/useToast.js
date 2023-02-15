import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { reset as resetAuth } from "../features/auth/AuthSlice";
import { reset as resetAssets } from "../features/assets/AssetsSlice";

export const useToast = () => {
  const dispatch = useDispatch();
  const {
    errorMessage: errorMessageAssets,
    successMessage: successMessageAssets,
  } = useSelector((state) => state.assets);

  const { errorMessage: errorMessageAuth, successMessage: successMessageAuth } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (errorMessageAssets) {
      toast.error(errorMessageAssets);
      dispatch(resetAssets());
    }
    if (successMessageAssets) {
      toast.success(successMessageAssets);
      dispatch(resetAssets());
    }
    if (errorMessageAuth) {
      toast.error(errorMessageAuth);
      dispatch(resetAuth());
    }
    if (successMessageAuth) {
      toast.success(successMessageAuth);
      dispatch(resetAuth());
    }
  }, [
    errorMessageAssets,
    successMessageAssets,
    errorMessageAuth,
    successMessageAuth,
  ]);
  return null;
};
