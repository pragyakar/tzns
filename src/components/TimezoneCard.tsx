import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import React, { useState, useEffect } from "react";

// This component receives UTC time and converts it to the specified timezone
const TimezoneCard = ({
  time,
  timezone,
  city,
}: {
  time: string;
  timezone: string;
  city: string;
}) => {  
  const [currentTime, setCurrentTime] = useState(new Date(time)); // Parse the UTC time
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    setCurrentTime(new Date(time)); // Parse the UTC time string
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

  // Convert the UTC time to the target timezone
  const zonedTime = toZonedTime(currentTime, timezone);

  return (
    <div className="timezone-card card">
      <h3>{city}</h3>
      <p className="time">{format(zonedTime, "HH:mm:ss")}</p>
      <p className="date">{format(zonedTime, "EEEE, MMMM d, yyyy")}</p>
    </div>
  );
};

export default TimezoneCard;
