import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { Flight } from "../types/interfaces";
import { getFlightList } from "../services/auth";
import { useFormatTime } from "../hooks/useFormatTime";
import { formatDate } from "../hooks/useFormattedDate";

import image from "../assets/images/airplane.png";

interface ListProps {
  token: string;
}

const List: React.FC<ListProps> = ({ token }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { formatTime } = useFormatTime();

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

  if (loading) return <p>Loading flights...</p>;
  if (!flights.length) return <p>No flights found.</p>;

  return (
    <div className={styles.listContainer}>
      {flights.map((items, index) => (
        <div key={index} className={styles.cardPair}>
          {/* کارت اصلی */}
          <div className={styles.card1}>
            <p className={styles.prices}>$ {items.price}</p>

            <div>
              <img className={styles.image2} src={items.logoSrc} alt={image} />
            </div>
            <div className={styles.name}>{items.src.country}</div>

            <div className={styles.dates}>
              <div>{items.src.country}</div>
              <p>{formatTime(items.src.time)}</p>
              <div>{formatDate(items.src.time)}</div>
            </div>

            <div>
              <img
                className={styles.image}
                src={image}
                alt={items.src.airline}
              />
            </div>

            <div className={styles.dates}>
              <div>{items.dst.country}</div>
              <p>{formatTime(items.dst.time)}</p>
              <div>{formatDate(items.dst.time)}</div>
            </div>

            <p className={styles.ribbon}>{items.class}</p>
          </div>

          {/* کارت خالی زیر کارت اصلی */}
          <div className={styles.card2}></div>
        </div>
      ))}
    </div>
  );
};

export default List;
