"use client";

import { useState } from "react";
import styles from "./Calculator.module.css";

export default function Calculator() {
  const [mode, setMode] = useState("road");
  const [cargoType, setCargoType] = useState("general");
  const [weight, setWeight] = useState(150);
  const [distance, setDistance] = useState(650);

  // Pricing Factors
  let basePerKm = 0;
  let basePerKg = 0;
  let speedKmPerDay = 1;
  let fixedDays = 1;
  let co2Factor = 0; // kg CO2 per ton-km

  switch (mode) {
    case "road":
      basePerKm = 8;
      basePerKg = 5;
      speedKmPerDay = 450;
      fixedDays = 1;
      co2Factor = 0.12;
      break;
    case "air":
      basePerKm = 48;
      basePerKg = 85;
      speedKmPerDay = 2500;
      fixedDays = 1;
      co2Factor = 0.85;
      break;
    case "ocean":
      basePerKm = 3.5;
      basePerKg = 15;
      speedKmPerDay = 300;
      fixedDays = 5;
      co2Factor = 0.02;
      break;
    case "express":
      basePerKm = 18;
      basePerKg = 28;
      speedKmPerDay = 800;
      fixedDays = 1;
      co2Factor = 0.18;
      break;
  }

  // Cargo Multipliers
  let cargoMultiplier = 1.0;
  switch (cargoType) {
    case "perishable":
      cargoMultiplier = 1.35; // refrigeration cost
      break;
    case "hazardous":
      cargoMultiplier = 1.65; // safety clearance
      break;
    case "highvalue":
      cargoMultiplier = 1.25; // insurance
      break;
    case "general":
    default:
      cargoMultiplier = 1.0;
  }

  // Calculations
  const price = Math.round(
    (basePerKm * distance + basePerKg * weight) * cargoMultiplier
  );

  // Days estimation
  let days = Math.ceil(distance / speedKmPerDay) + fixedDays;
  if (mode === "air") {
    days = 1; // Air is always next-day or 2-day
  }

  // CO2 footprint: weight in tons * distance in km * co2Factor
  const weightTons = weight / 1000;
  const co2 = parseFloat((weightTons * distance * co2Factor).toFixed(2));


  const handleBookNow = () => {
    // Scroll to booking form
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    // Prefill form using simple global events or localStorage
    const event = new CustomEvent("prefill-booking", {
      detail: { mode, cargoType, weight, distance },
    });
    window.dispatchEvent(event);
  };

  return (
    <section id="calculator" className={`${styles.calculator} section`}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subTitle}>Interactive Estimator</span>
          <h2 className={styles.title}>Freight Rate Calculator</h2>
          <p className={styles.desc}>
            Get an instant estimate for your cargo shipment pricing, transit times,
            and environmental impact in real-time.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.inputPanel} glass`}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Shipping Mode</label>
              <select
                className={styles.select}
                value={mode}
                onChange={(e) => setMode(e.target.value)}
              >
                <option value="road">Overland Road Freight</option>
                <option value="air">Global Air Freight</option>
                <option value="ocean">Ocean Cargo Shipping</option>
                <option value="express">Express Courier B2B</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Cargo Classification</label>
              <select
                className={styles.select}
                value={cargoType}
                onChange={(e) => setCargoType(e.target.value)}
              >
                <option value="general">General Dry Goods</option>
                <option value="perishable">Perishables (Cold Chain)</option>
                <option value="hazardous">Hazardous / Dangerous Goods</option>
                <option value="highvalue">High-Value / Insured Goods</option>
              </select>
            </div>

            <div className={styles.rangeWrapper}>
              <div className={styles.rangeHeader}>
                <label className={styles.label}>Shipment Weight</label>
                <span className={styles.rangeValue}>{weight} kg</span>
              </div>
              <input
                type="range"
                className={styles.slider}
                min="10"
                max="5000"
                step="10"
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
              />
            </div>

            <div className={styles.rangeWrapper}>
              <div className={styles.rangeHeader}>
                <label className={styles.label}>Transit Distance</label>
                <span className={styles.rangeValue}>{distance} km</span>
              </div>
              <input
                type="range"
                className={styles.slider}
                min="50"
                max="10000"
                step="50"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className={`${styles.resultsPanel} glass`}>
            <div className={styles.resultsHeader}>
              <h3 className={styles.resultsTitle}>Calculation Summary</h3>
            </div>

            <div className={styles.priceBlock}>
              <span className={styles.priceLabel}>Estimated Logistics Cost</span>
              <div className={styles.priceValue}>₹ {price.toLocaleString("en-IN")}</div>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailCard}>
                <span className={styles.detailLabel}>Transit Time</span>
                <span className={styles.detailVal}>
                  ~ {days} {days === 1 ? "Day" : "Days"}
                </span>
              </div>
              <div className={styles.detailCard}>
                <span className={styles.detailLabel}>Carbon Footprint</span>
                <span className={`${styles.detailVal} ${styles.detailValGreen}`}>
                  {co2} kg CO₂
                </span>
              </div>
            </div>

            <p className={styles.carbonNote}>
              <svg
                className={styles.leafIcon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.58 1 8a7 7 0 0 1-9 10z" />
                <path d="M9 22v-4" />
                <path d="M8 12h4" />
              </svg>
              Estimated CO₂ is calculated based on transport logistics standards. Sanket Logistics offsets 20% of emissions automatically.
            </p>

            <button
              onClick={handleBookNow}
              className="btn btn-primary styles.bookBtn"
            >
              Book Shipment at This Rate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
