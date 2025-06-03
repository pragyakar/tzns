import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { timezones } from "../constants/timezones";
import { fromZonedTime } from "date-fns-tz";

interface ISchedulingAssistantProps {
  onClose: () => void;
  setBaseTime: React.Dispatch<React.SetStateAction<string>>;
}

const SchedulingAssistant = (props: ISchedulingAssistantProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimezone, setSelectedTimezone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleTimezoneChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTimezone(event.target.value);
  };

  const handleSave = () => {
    if (selectedDate) {
      // Convert the selected date/time from the selected timezone to UTC
      const utcDate = fromZonedTime(selectedDate, selectedTimezone);
      const utcDateString = utcDate.toUTCString();
      props.setBaseTime(utcDateString);
    }
    props.onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Scheduling Assistant</h2>
        <div className="date-picker-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="calendar-picker"
            placeholderText="Pick a date and time"
            timeFormat="HH:mm"
          />
        </div>
        <div className="timezone-picker-container">
          <select
            value={selectedTimezone}
            onChange={handleTimezoneChange}
            className="timezone-picker"
          >
            <option value="UTC">UTC</option>
            {timezones.map((tz) => (
              <option key={tz.timezone} value={tz.timezone}>
                {tz.city} ({tz.timezone})
              </option>
            ))}
          </select>
        </div>
        <br />
        <button onClick={handleSave} className="save-button">
          Check
        </button>
        <button onClick={props.onClose} className="close-button" />
      </div>
    </div>
  );
};

export default SchedulingAssistant;
