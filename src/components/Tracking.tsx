"use client";

import { useState } from "react";
import styles from "./Tracking.module.css";

interface TrackingStep {
  title: string;
  description: string;
  time: string;
  status: "done" | "active" | "pending";
}

interface ShipmentData {
  id: string;
  status: string;
  origin: string;
  destination: string;
  eta: string;
  service: string;
  steps: TrackingStep[];
  progressHeight: string; // CSS height percentage to style the line fill
}

const MOCK_DATA: Record<string, ShipmentData> = {
  "SK-1001": {
    id: "SK-1001",
    status: "Out for Delivery",
    origin: "Mumbai Hub",
    destination: "Bangalore City",
    eta: "Jul 24, 06:00 PM (Today)",
    service: "Overland Road Freight",
    progressHeight: "85%",
    steps: [
      {
        title: "Out for Delivery",
        description: "Courier #SK-B2 dispatched from Bangalore City hub",
        time: "Jul 24, 11:20 AM",
        status: "active",
      },
      {
        title: "Arrived at Bangalore Hub",
        description: "Shipment sorted and scanned at local distribution center",
        time: "Jul 23, 09:40 PM",
        status: "done",
      },
      {
        title: "Dispatched from Mumbai",
        description: "In transit via container cargo carrier SK-Road 12",
        time: "Jul 22, 02:15 PM",
        status: "done",
      },
      {
        title: "Shipment Registered & Booked",
        description: "Invoice generated and goods stored for transport",
        time: "Jul 22, 09:00 AM",
        status: "done",
      },
    ],
  },
  "SK-2002": {
    id: "SK-2002",
    status: "Delivered",
    origin: "Delhi Depot",
    destination: "Kolkata HQ",
    eta: "Delivered (Jul 21)",
    service: "Global Air Freight",
    progressHeight: "100%",
    steps: [
      {
        title: "Delivered Successfully",
        description: "Received by security desk with signed confirmation POD",
        time: "Jul 21, 04:30 PM",
        status: "done",
      },
      {
        title: "Out for Delivery",
        description: "Local delivery van departed Kolkata center",
        time: "Jul 21, 10:15 AM",
        status: "done",
      },
      {
        title: "Arrived Kolkata Airport",
        description: "Flight SK-Cargo 9 landed and cargo unloaded",
        time: "Jul 20, 08:00 AM",
        status: "done",
      },
      {
        title: "Dispatched from Delhi Depot",
        description: "Departed for Indira Gandhi International Airport",
        time: "Jul 19, 05:45 PM",
        status: "done",
      },
      {
        title: "Shipment Registered & Booked",
        description: "Cargo packaged and customs paperwork prepared",
        time: "Jul 18, 11:00 AM",
        status: "done",
      },
    ],
  },
  "SK-3003": {
    id: "SK-3003",
    status: "Customs Hold",
    origin: "London Heathrow (LHR)",
    destination: "Mumbai Airport",
    eta: "Jul 26, 04:00 PM (Delayed)",
    service: "Global Air Freight",
    progressHeight: "50%",
    steps: [
      {
        title: "Customs Inspection In-Progress",
        description: "Customs duty verification and package clearance inspection",
        time: "Jul 24, 08:30 AM",
        status: "active",
      },
      {
        title: "Arrived at Mumbai Import Hub",
        description: "Air freight unloaded and sent to custom warehousing",
        time: "Jul 23, 11:00 PM",
        status: "done",
      },
      {
        title: "Departed London",
        description: "Departed via air freight flight LH-204",
        time: "Jul 22, 09:15 AM",
        status: "done",
      },
      {
        title: "Cargo Received at Heathrow Hub",
        description: "Package measured, scanned, and placed on sorting queue",
        time: "Jul 21, 03:00 PM",
        status: "done",
      },
    ],
  },
};

export default function Tracking() {
  const [searchId, setSearchId] = useState("");
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (id: string) => {
    const formattedId = id.trim().toUpperCase();
    if (!formattedId) return;

    setSearched(true);
    if (MOCK_DATA[formattedId]) {
      setShipment(MOCK_DATA[formattedId]);
      setErrorMsg("");
    } else {
      setShipment(null);
      setErrorMsg(`No consignment found with tracking ID "${formattedId}". Try SK-1001, SK-2002, or SK-3003.`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchId);
  };

  const handleSuggestionClick = (id: string) => {
    setSearchId(id);
    handleSearch(id);
  };

  return (
    <section id="tracking" className={`${styles.tracking} section`}>
      <div className={styles.glow}></div>

      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className={styles.subTitle}>Shipment Tracking</span>
          <h2 className={styles.title}>Track Your Consignment</h2>
        </div>

        <form onSubmit={handleFormSubmit} className={styles.searchBox}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter Tracking Number (e.g. SK-1001)"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <button type="submit" className="btn btn-primary styles.searchBtn">
            Track Cargo
          </button>
        </form>

        <div className={styles.suggestions}>
          <span>Try: </span>
          <span className={styles.suggestionTag} onClick={() => handleSuggestionClick("SK-1001")}>SK-1001 (Road)</span>
          <span className={styles.suggestionTag} onClick={() => handleSuggestionClick("SK-2002")}>SK-2002 (Delivered)</span>
          <span className={styles.suggestionTag} onClick={() => handleSuggestionClick("SK-3003")}>SK-3003 (Customs)</span>
        </div>

        {errorMsg && (
          <div className={styles.errorBox}>
            <svg
              className={styles.errorIcon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {shipment && (
          <div className={`${styles.resultCard} glass`}>
            <div className={styles.metaHeader}>
              <div>
                <span className={styles.metaLabel}>Tracking ID</span>
                <div className={`${styles.metaValue} ${styles.metaAccent}`}>{shipment.id}</div>
              </div>
              <div>
                <span className={styles.metaLabel}>Current Status</span>
                <div className={styles.metaValue}>{shipment.status}</div>
              </div>
              <div>
                <span className={styles.metaLabel}>Estimated ETA</span>
                <div className={styles.metaValue}>{shipment.eta}</div>
              </div>
            </div>

            <div>
              <span className={styles.metaLabel}>Transit Details</span>
              <div className={styles.metaValue} style={{ fontSize: "0.95rem", fontWeight: "normal", color: "var(--text-med)" }}>
                Service Type: {shipment.service} • From {shipment.origin} to {shipment.destination}
              </div>
            </div>

            <div className={styles.timeline}>
              <div
                className={styles.timelineProgress}
                style={{ height: shipment.progressHeight }}
              ></div>
              {shipment.steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`${styles.timelineItem} ${
                    step.status === "done" ? styles.itemDone : step.status === "active" ? styles.itemActive : ""
                  }`}
                >
                  <span className={styles.marker}></span>
                  <div className={styles.itemContent}>
                    <div className={styles.itemHeader}>
                      <h4 className={styles.itemTitle}>{step.title}</h4>
                      <p className={styles.itemDesc}>{step.description}</p>
                    </div>
                    <span className={styles.itemTime}>{step.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!searched && (
          <div className="glass" style={{ padding: "2rem", borderRadius: "var(--radius-lg)", textAlign: "center", color: "var(--text-med)" }}>
            <p>Enter a tracking number above to see real-time updates of your shipment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
