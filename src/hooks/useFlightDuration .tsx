import { useMemo } from "react";

interface FlightTime {
  srcTime: string;
  dstTime: string;
}

export const useFlightDuration = ({ srcTime, dstTime }: FlightTime) => {
  return useMemo(() => {
    const start = new Date(srcTime);
    const end = new Date(dstTime);

    const diffMs = end.getTime() - start.getTime();
    if (diffMs < 0) return "Invalid Time";

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}h ${diffMinutes}m`;
  }, [srcTime, dstTime]);
};
