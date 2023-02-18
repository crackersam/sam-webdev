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
  const { availability } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAvailability());
    if (availability) {
      setSelectedTimeRangeDate(availability);
      setSelectedTimeRange([dayjs(availability[0]), dayjs(availability[1])]);
    }
  }, [availability]);
  const dispatch = useDispatch();
  const [selectedTimeRange, setSelectedTimeRange] = useState([
    dayjs().hour(9).minute(0),
    dayjs().hour(18).minute(0),
  ]);
  const [selectedTimeRangeDate, setSelectedTimeRangeDate] = useState([]);

  const handleChange = ([start, end]) => {
    setSelectedTimeRange([start, end]);
    setSelectedTimeRangeDate([dayjs(start).toDate(), dayjs(end).toDate()]);
    dispatch(updateAvailability(selectedTimeRangeDate));
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
