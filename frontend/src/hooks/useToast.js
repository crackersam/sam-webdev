import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { reset as resetAuth } from "../features/auth/AuthSlice";
import { reset as resetAssets } from "../features/assets/AssetsSlice";
import { resetAdmin } from "../features/admin/AdminSlice";

export const useToast = () => {
  const dispatch = useDispatch();
  const {
    errorMessage: errorMessageAssets,
    successMessage: successMessageAssets,
  } = useSelector((state) => state.assets);

  const {
    errorMessage: errorMessageAuth,
    successMessage: successMessageAuth,
  } = useSelector((state) => state.auth);

  const {
    errorMessage: errorMessageAdmin,
    successMessage: successMessageAdmin,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    if (errorMessageAssets) {
      toast.error(errorMessageAssets);
      dispatch(resetAssets());
    }
    if (successMessageAssets) {
      toast.success(successMessageAssets);
      dispatch(resetAssets());
    }
    if (errorMessageAdmin) {
      toast.error(errorMessageAdmin);
      dispatch(resetAdmin());
    }
    if (successMessageAdmin) {
      toast.success(successMessageAdmin);
      dispatch(resetAdmin());
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
    errorMessageAdmin,
    successMessageAdmin,
  ]);
  return null;
};
