import { TimePicker } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  getAvailability,
  updateAvailability,
} from "../../features/admin/AdminSlice";
import { useSelector, useDispatch } from "react-redux";
const { RangePicker } = TimePicker;

function Availability() {
  const { availability } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();
  const [selectedTimeRange, setSelectedTimeRange] =
    useState([
      dayjs().hour(9).minute(0),
      dayjs().hour(18).minute(0),
    ]);
  const [selectedTimeRangeDate, setSelectedTimeRangeDate] =
    useState([]);

  useEffect(() => {
    if (selectedTimeRangeDate.length > 0) {
      dispatch(updateAvailability(selectedTimeRangeDate));
    }
  }, [selectedTimeRangeDate]);

  const handleChange = ([start, end]) => {
    setSelectedTimeRange([start, end]);
    setSelectedTimeRangeDate([
      dayjs(start).toDate().toISOString(),
      dayjs(end).toDate().toISOString(),
    ]);
  };

  return (
    <div>
      <RangePicker
        value={[selectedTimeRange[0], selectedTimeRange[1]]}
        format="HH:mm"
        minuteStep={60} // only allow selection of hours
        onChange={handleChange}
      />
    </div>
  );
}

export default Availability;
