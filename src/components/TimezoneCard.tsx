import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import React, { useState, useEffect } from "react";


// This component receives UTC time
// But it is converting the UTC time to local time
// Need to figure out how to convert the UTC time to specified timezones
const TimezoneCard = ({
  time,
  timezone,
  city,
}: {
  time: string;
  timezone: string;
  city: string;
}) => {  
  const [currentTime, setCurrentTime] = useState(new Date(time)); // this is converting to local time
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    setCurrentTime(new Date(time)); // this is converting to local time
    setLastUpdate(new Date());
  }, [time]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prevTime) => {
        const now = new Date();
        const diff = now.getTime() - lastUpdate.getTime();
        setLastUpdate(now);
        return new Date(prevTime.getTime() + diff);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lastUpdate]);

  const zonedTime = toZonedTime(currentTime, timezone, { timeZone: timezone });

  return (
    <div className="timezone-card card">
      <h3>{city}</h3>
      <p className="time">{format(zonedTime, "HH:mm:ss")}</p>
      <p className="date">{format(zonedTime, "EEEE, MMMM d, yyyy")}</p>
    </div>
  );
};

export default TimezoneCard;
