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
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const { formatTime } = useFormatTime();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const data = await getFlightList(token, 1, 100);
        console.log(data);
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

  const handleCardClick = (index: number) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  const getFlightDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    let diffMs = end.getTime() - start.getTime();

    if (diffMs < 0) {
      diffMs += 24 * 60 * 60 * 1000;
    }

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  if (loading) return <p>Loading flights...</p>;
  if (!flights.length) return <p>No flights found.</p>;

  return (
    <div className={styles.listContainer}>
      {flights.map((items, index) => (
        <div key={index} className={styles.cardPair}>
          {/* کارت اصلی که وقتی باز می‌شود تبدیل به محتوای جدید می‌شود */}
          <div
            className={`${styles.mainCard} ${
              expandedCard === index ? styles.mainCardExpanded : ""
            }`}
            onClick={() => handleCardClick(index)}
          >
            {/* محتوای حالت بسته */}
            <div
              className={`${styles.cardContent} ${styles.frontContent} ${
                expandedCard === index ? styles.hidden : ""
              }`}
            >
              <p className={styles.prices}>$ {items.price}</p>

              <div>
                <img
                  className={styles.image2}
                  src={items.logoSrc}
                  alt="airline"
                />
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

            {/* محتوای جدید وقتی کارت باز می‌شود */}
            <div
              className={`${styles.cardContent} ${styles.expandedContent} ${
                expandedCard === index ? styles.visible : ""
              }`}
            >
              <div className={styles.flightSummary}>
                <p className={styles.ribbon}>{items.class}</p>

                <div className={styles.cart2}>
                  <div className={styles.cart3detailse1}>
                    <div className={styles.cart3details2}>
                      <p>To</p>
                      <p
                        style={{
                          fontSize: "24px",
                          fontWeight: "700",
                          color: "#333",
                        }}
                      >
                        {items.src.iso3}
                      </p>
                    </div>

                    <div
                      style={{
                        width: "100px",
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      {items.src.airline}
                    </div>
                  </div>

                  <div className={styles.allanimate}>
                    <div className={styles.animate}>
                      <img
                        className={styles.image}
                        src={image}
                        alt={items.src.airline}
                      />
                    </div>
                    <div className={styles.prices2}>
                      <p> $ {items.price}</p>
                    </div>
                  </div>

                  <div className={styles.cart3detailse1}>
                    <div className={styles.cart3details2}>
                      <p>To</p>
                      <p
                        style={{
                          fontSize: "24px",
                          fontWeight: "700",
                          color: "#333",
                          textAlign: "center",
                        }}
                      >
                        {items.dst.iso3}
                      </p>
                    </div>
                    <div style={{ width: "100px", color: "#666" }}>
                      {items.dst.airline}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.bottomCard} ${
              expandedCard === index ? styles.bottomCardExpanded : ""
            }`}
          >
            <div className={styles.bottomCardContent}>
              <div className={styles.cart2}>
                <div className={styles.cart3detailse1}>
                  <div className={styles.cart3details2}>
                    <p
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#746969ff",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      {formatTime(items.src.time)} -{" "}
                      {formatTime(items.dst.time)}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "300",
                        color: "#746969ff",
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      Fligh Time
                    </p>
                  </div>

                  <div className={styles.cart3details2}>
                    <p>{!items.transfer ? "No" : "Yes"}</p>
                    <p>Transfer</p>
                  </div>
                </div>

                <div className={styles.cart3details2}>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#666",
                      textAlign: "center",
                      marginTop: "4px",
                    }}
                  >
                    {getFlightDuration(items.src.time, items.dst.time)}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "300",
                      color: "#746969ff",
                      textAlign: "center",
                    }}
                  >
                    Duration
                  </p>

                  <div className={styles.gapgate}>
                    <p
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#746969ff",
                        textAlign: "center",
                      }}
                    >
                      {items.gates}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "300",
                        color: "#746969ff",
                        textAlign: "center",
                      }}
                    >
                      Gate
                    </p>
                  </div>
                </div>

                <div className={styles.cart4details}>
                  <div>
                    <div className={styles.cart3details2}>
                      <p
                        style={{
                          fontSize: "24px",
                          fontWeight: "700",
                          color: "#746969ff",
                          textAlign: "center",
                        }}
                      >
                        {formatTime(items.dst.time)}
                      </p>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "300",
                          color: "#746969ff",
                          textAlign: "center",
                        }}
                      >
                        boarding
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className={styles.cart3details2}>
                      <p
                        style={{
                          fontSize: "24px",
                          fontWeight: "700",
                          color: "#746969ff",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        {items.seat}
                      </p>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "300",
                          color: "#746969ff",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        Set
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
