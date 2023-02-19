import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { reset as resetAuth } from "../features/auth/AuthSlice";
import { reset as resetAssets } from "../features/assets/AssetsSlice";
import { resetAdmin } from "../features/admin/AdminSlice";
import { reset as resetAppointments } from "../features/appointments/AppointmentSlice";

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

  const {
    errorMessage: errorMessageAppointments,
    successMessage: successMessageAppointments,
  } = useSelector((state) => state.appt);

  useEffect(() => {
    if (successMessageAppointments) {
      toast.success(successMessageAppointments);
      dispatch(resetAppointments());
    }
    if (errorMessageAppointments) {
      toast.error(errorMessageAppointments);
      dispatch(resetAppointments());
    }
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
    errorMessageAppointments,
    successMessageAppointments,
  ]);
  return null;
};
