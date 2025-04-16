import { timezones } from "../constants/timezones";
import TimezoneCard from "./TimezoneCard";

interface ITimezoneDisplayProps {
  baseTime: string;
}

const TimezoneDisplay = (props: ITimezoneDisplayProps) => {
  return (
    <div className="timezone-container card-grid">
      {timezones.map(({ timezone, city }) => (
        <TimezoneCard
          key={timezone}
          timezone={timezone}
          city={city}
          time={props.baseTime}
        />
      ))}
    </div>
  );
};

export default TimezoneDisplay;
