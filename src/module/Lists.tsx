import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { Flight } from "../types/interfaces";
import { getFlightList } from "../services/auth";

interface ListProps {
  token: string;
}

const List: React.FC<ListProps> = ({ token }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlightList(token, 1, 100);
        setFlights(data);
      } catch (err) {
        console.error(err);
        alert("Failed to load flights");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [token]);

  // تابع برای فرمت کردن تاریخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  // تابع برای فرمت کردن زمان
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (loading) return <p>Loading flights...</p>;
  if (!flights.length) return <p>No flights found.</p>;

  return <div className={styles.listContainer}></div>;
};

export default List;
