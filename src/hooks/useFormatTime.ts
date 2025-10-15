import { useCallback } from "react";

export const useFormatTime = () => {
  const formatTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }, []);

  return { formatTime };
};
