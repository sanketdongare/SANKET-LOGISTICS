"use client";

import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import styles from "./Calculator.module.css";

const LOCAL_CLUSTERS = [
  { id: "chakan", name: "Chakan Industrial Zone", distance: "Local", rates: { pickup: 1200, tata407: 1450, tata709: 1700, tata909: 1950 } },
  { id: "bhosari", name: "Bhosari Cluster", distance: "approx. 22.0 km", rates: { pickup: 1550, tata407: 1800, tata709: 2050, tata909: 2300 } },
  { id: "talawade", name: "Talawade IT Park / Cluster", distance: "approx. 12.5 km", rates: { pickup: 1250, tata407: 1500, tata709: 1750, tata909: 2000 } },
  { id: "ambethan", name: "Ambethan Cluster", distance: "approx. 5.5 km", rates: { pickup: 850, tata407: 1100, tata709: 1350, tata909: 1600 } },
  { id: "local", name: "Local Chakan Area", distance: "approx. 3.5 km", rates: { pickup: 650, tata407: 900, tata709: 1150, tata909: 1400 } },
];

export default function Calculator() {
  const [activeTab, setActiveTab] = useState("adhoc"); // "adhoc", "local", "monthly"

  // Ad-hoc State
  const [mode, setMode] = useState("road");
  const [cargoType, setCargoType] = useState("general");
  const [weight, setWeight] = useState(150);
  const [distance, setDistance] = useState(650);

  // Local Cluster State
  const [localCluster, setLocalCluster] = useState("chakan");
  const [localTruckType, setLocalTruckType] = useState("pickup");

  // Dedicated Monthly State
  const [monthlyTruckType, setMonthlyTruckType] = useState("pickup");
  const [monthlyDuration, setMonthlyDuration] = useState(1);
  const [monthlyExtraKms, setMonthlyExtraKms] = useState(0);
  const [monthlyDutyHours, setMonthlyDutyHours] = useState("standard");

  // --- Ad-Hoc Freight Pricing Factors ---
  let basePerKm = 0;
  let basePerKg = 0;
  let speedKmPerDay = 1;
  let fixedDays = 1;
  let co2Factor = 0;

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

  let cargoMultiplier = 1.0;
  switch (cargoType) {
    case "perishable":
      cargoMultiplier = 1.35;
      break;
    case "hazardous":
      cargoMultiplier = 1.65;
      break;
    case "highvalue":
      cargoMultiplier = 1.25;
      break;
    case "general":
    default:
      cargoMultiplier = 1.0;
  }

  const adhocPrice = Math.round(
    (basePerKm * distance + basePerKg * weight) * cargoMultiplier
  );

  let adhocDays = Math.ceil(distance / speedKmPerDay) + fixedDays;
  if (mode === "air") {
    adhocDays = 1;
  }

  const weightTons = weight / 1000;
  const adhocCo2 = parseFloat((weightTons * distance * co2Factor).toFixed(2));

  // --- Local Cluster Calculations ---
  const getLocalCalculations = () => {
    const selected = LOCAL_CLUSTERS.find((c) => c.id === localCluster) || LOCAL_CLUSTERS[0];
    const rate = selected.rates[localTruckType as keyof typeof selected.rates];
    let truckName = "";
    switch (localTruckType) {
      case "pickup":
        truckName = "Pickup (1 - 1.3 Ton)";
        break;
      case "tata407":
        truckName = "Tata 407 (2.2 - 2.5 Ton)";
        break;
      case "tata709":
        truckName = "Tata 709 (3.5 - 4 Ton)";
        break;
      case "tata909":
        truckName = "Tata 909 (5.5 - 6.5 Ton)";
        break;
    }
    return {
      rate,
      distance: selected.distance,
      clusterName: selected.name,
      truckName,
    };
  };

  const localCalcs = getLocalCalculations();

  // --- Dedicated Monthly Fleet Calculations ---
  const getMonthlyCalculations = () => {
    let baseRate = 0;
    let extraKmRate = 0;
    let truckName = "";

    switch (monthlyTruckType) {
      case "pickup":
        baseRate = 60000;
        extraKmRate = 30;
        truckName = "Pickup (1 - 1.3 Ton)";
        break;
      case "tata407":
        baseRate = 80000;
        extraKmRate = 40;
        truckName = "Tata 407 (2.2 - 2.5 Ton)";
        break;
      case "tata709":
        baseRate = 100000;
        extraKmRate = 50;
        truckName = "Tata 709 (3.5 - 4 Ton)";
        break;
      case "tata909":
        baseRate = 120000;
        extraKmRate = 60;
        truckName = "Tata 909 (5.5 - 6.5 Ton)";
        break;
    }

    // Contract discount
    let discountPercent = 0;
    if (monthlyDuration === 3) discountPercent = 0.05;
    else if (monthlyDuration === 6) discountPercent = 0.10;
    else if (monthlyDuration === 12) discountPercent = 0.15;

    const discountAmount = Math.round(baseRate * discountPercent);
    const extraKmCost = monthlyExtraKms * extraKmRate;

    // Shift Hours surcharge
    let extraHoursCost = 0;
    if (monthlyDutyHours === "extended") extraHoursCost = 15000;
    else if (monthlyDutyHours === "full") extraHoursCost = 35000;

    const ratePerMonth = baseRate - discountAmount + extraKmCost + extraHoursCost;
    const grandTotal = ratePerMonth * monthlyDuration;

    return {
      baseRate,
      discountAmount,
      discountPercent: Math.round(discountPercent * 100),
      extraKmCost,
      extraHoursCost,
      ratePerMonth,
      grandTotal,
      truckName,
      extraKmRate
    };
  };

  const monthlyCalcs = getMonthlyCalculations();

  // --- Handlers ---
  const handleBookAdhoc = () => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    const event = new CustomEvent("prefill-booking", {
      detail: { mode, cargoType, weight, distance },
    });
    window.dispatchEvent(event);
  };

  const handleBookLocal = () => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    const event = new CustomEvent("prefill-booking", {
      detail: {
        mode: "road",
        cargoType: `${localCalcs.truckName} (Local)`,
        weight: 1500,
        distance: localCalcs.rate,
        specialNotes: `Point-to-Point Local Delivery request. Route: Nanekarwadi (Chakan) to ${localCalcs.clusterName} (${localCalcs.distance}). Vehicle: ${localCalcs.truckName}. Flat Rate: ₹${localCalcs.rate.toLocaleString("en-IN")} (driver & fuel inclusive).`,
      },
    });
    window.dispatchEvent(event);
  };

  const handleBookMonthly = () => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }

    const event = new CustomEvent("prefill-booking", {
      detail: {
        mode: "monthly",
        cargoType: `${monthlyCalcs.truckName} (Dedicated)`,
        weight: monthlyExtraKms + 2000,
        distance: monthlyCalcs.grandTotal,
        specialNotes: `Dedicated monthly package contract. Vehicle: ${monthlyCalcs.truckName}. Duration: ${monthlyDuration} Month(s). Daily Shift: ${monthlyDutyHours === "standard" ? "12 Hours Dedicated Shift" : monthlyDutyHours === "extended" ? "16 Hours Extended Shift" : "24 Hours Full Double-Shift"}. Included monthly rate: ₹${monthlyCalcs.ratePerMonth.toLocaleString("en-IN")}.`,
      },
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
            Get an instant estimate for your ad-hoc shipping, flat local point-to-point transfers,
            or compute monthly dedicated contract packages.
          </p>
        </div>

        <div className={styles.tabWrapper} style={{ marginBottom: "2.5rem" }}>
          <Tabs
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
            centered
            sx={{
              borderBottom: 1,
              borderColor: "var(--border-input)",
              "& .MuiTabs-indicator": { backgroundColor: "var(--accent-cyan)", height: "3px" },
              "& .MuiTab-root": {
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-med)",
                textTransform: "none",
                px: 3,
                "&.Mui-selected": { color: "var(--text-high)" },
              },
            }}
          >
            <Tab label="Ad-Hoc Rates" value="adhoc" />
            <Tab label="Local Chakan Cluster Rates" value="local" />
            <Tab label="Monthly Fleet Packages" value="monthly" />
          </Tabs>
        </div>

        <div className={styles.grid}>
          {activeTab === "adhoc" && (
            /* --- Ad-Hoc Calculator Inputs --- */
            <div className={`${styles.inputPanel} glass`}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ fontFamily: "var(--font-sans)", color: "var(--text-med)", fontWeight: 500 }}>
                  Shipping Mode
                </InputLabel>
                <Select
                  value={mode}
                  label="Shipping Mode"
                  onChange={(e) => setMode(e.target.value)}
                  sx={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--text-high)",
                    backgroundColor: "var(--bg-input)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-input)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--accent-cyan)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--primary)" },
                  }}
                >
                  <MenuItem value="road">Overland Road Freight</MenuItem>
                  <MenuItem value="air">Global Air Freight</MenuItem>
                  <MenuItem value="ocean">Ocean Cargo Shipping</MenuItem>
                  <MenuItem value="express">Express Courier B2B</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel sx={{ fontFamily: "var(--font-sans)", color: "var(--text-med)", fontWeight: 500 }}>
                  Cargo Classification
                </InputLabel>
                <Select
                  value={cargoType}
                  label="Cargo Classification"
                  onChange={(e) => setCargoType(e.target.value)}
                  sx={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--text-high)",
                    backgroundColor: "var(--bg-input)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-input)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--accent-cyan)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--primary)" },
                  }}
                >
                  <MenuItem value="general">General Dry Goods</MenuItem>
                  <MenuItem value="perishable">Perishables (Cold Chain)</MenuItem>
                  <MenuItem value="hazardous">Hazardous / Dangerous Goods</MenuItem>
                  <MenuItem value="highvalue">High-Value / Insured Goods</MenuItem>
                </Select>
              </FormControl>

              <div className={styles.rangeWrapper} style={{ marginBottom: "2rem" }}>
                <div className={styles.rangeHeader}>
                  <label className={styles.label}>Shipment Weight</label>
                  <span className={styles.rangeValue}>{weight} kg</span>
                </div>
                <Slider
                  value={weight}
                  onChange={(e, val) => setWeight(val as number)}
                  min={10}
                  max={5000}
                  step={10}
                  sx={{
                    color: "var(--accent-cyan)",
                    height: 6,
                    "& .MuiSlider-thumb": {
                      width: 18,
                      height: 18,
                      boxShadow: "0 0 10px rgba(255, 107, 0, 0.3)",
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: "0 0 0 8px rgba(255, 107, 0, 0.16)",
                      },
                    },
                    "& .MuiSlider-track": { height: 6 },
                    "& .MuiSlider-rail": { height: 6, color: "var(--timeline-line)", opacity: 1 },
                  }}
                />
              </div>

              <div className={styles.rangeWrapper}>
                <div className={styles.rangeHeader}>
                  <label className={styles.label}>Transit Distance</label>
                  <span className={styles.rangeValue}>{distance} km</span>
                </div>
                <Slider
                  value={distance}
                  onChange={(e, val) => setDistance(val as number)}
                  min={50}
                  max={10000}
                  step={50}
                  sx={{
                    color: "var(--accent-cyan)",
                    height: 6,
                    "& .MuiSlider-thumb": {
                      width: 18,
                      height: 18,
                      boxShadow: "0 0 10px rgba(255, 107, 0, 0.3)",
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: "0 0 0 8px rgba(255, 107, 0, 0.16)",
                      },
                    },
                    "& .MuiSlider-track": { height: 6 },
                    "& .MuiSlider-rail": { height: 6, color: "var(--timeline-line)", opacity: 1 },
                  }}
                />
              </div>
            </div>
          )}

          {activeTab === "local" && (
            /* --- Local Cluster Calculator Inputs --- */
            <div className={`${styles.inputPanel} glass`}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ fontFamily: "var(--font-sans)", color: "var(--text-med)", fontWeight: 500 }}>
                  Destination (From Chakan Base)
                </InputLabel>
                <Select
                  value={localCluster}
                  label="Destination (From Chakan Base)"
                  onChange={(e) => setLocalCluster(e.target.value)}
                  sx={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--text-high)",
                    backgroundColor: "var(--bg-input)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-input)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--accent-cyan)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--primary)" },
                  }}
                >
                  <MenuItem value="chakan">Chakan Industrial Zone (Base)</MenuItem>
                  <MenuItem value="bhosari">Bhosari (approx. 22.0 km)</MenuItem>
                  <MenuItem value="talawade">Talawade (approx. 12.5 km)</MenuItem>
                  <MenuItem value="ambethan">Ambethan (approx. 5.5 km)</MenuItem>
                  <MenuItem value="local">Local Area (approx. 3.5 km)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel sx={{ fontFamily: "var(--font-sans)", color: "var(--text-med)", fontWeight: 500 }}>
                  Vehicle Type
                </InputLabel>
                <Select
                  value={localTruckType}
                  label="Vehicle Type"
                  onChange={(e) => setLocalTruckType(e.target.value)}
                  sx={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--text-high)",
                    backgroundColor: "var(--bg-input)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-input)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--accent-cyan)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--primary)" },
                  }}
                >
                  <MenuItem value="pickup">Pickup (1 - 1.3 Ton)</MenuItem>
                  <MenuItem value="tata407">Tata 407 (2.2 - 2.5 Ton)</MenuItem>
                  <MenuItem value="tata709">Tata 709 (3.5 - 4 Ton)</MenuItem>
                  <MenuItem value="tata909">Tata 909 (5.5 - 6.5 Ton)</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}

          {activeTab === "monthly" && (
            /* --- Dedicated Monthly Fleet Calculator Inputs --- */
            <div className={`${styles.inputPanel} glass`}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ fontFamily: "var(--font-sans)", color: "var(--text-med)", fontWeight: 500 }}>
                  Dedicated Vehicle Class
                </InputLabel>
                <Select
                  value={monthlyTruckType}
                  label="Dedicated Vehicle Class"
                  onChange={(e) => {
                    setMonthlyTruckType(e.target.value);
                    setMonthlyExtraKms(0);
                  }}
                  sx={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--text-high)",
                    backgroundColor: "var(--bg-input)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-input)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--accent-cyan)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--primary)" },
                  }}
                >
                  <MenuItem value="pickup">Pickup (1 - 1.3 Ton) - ₹60,000/mo</MenuItem>
                  <MenuItem value="tata407">Tata 407 (2.2 - 2.5 Ton) - ₹80,000/mo</MenuItem>
                  <MenuItem value="tata709">Tata 709 (3.5 - 4 Ton) - ₹1,00,000/mo</MenuItem>
                  <MenuItem value="tata909">Tata 909 (5.5 - 6.5 Ton) - ₹1,20,000/mo</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel sx={{ fontFamily: "var(--font-sans)", color: "var(--text-med)", fontWeight: 500 }}>
                  Contract Commitment
                </InputLabel>
                <Select
                  value={monthlyDuration}
                  label="Contract Commitment"
                  onChange={(e) => setMonthlyDuration(Number(e.target.value))}
                  sx={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--text-high)",
                    backgroundColor: "var(--bg-input)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-input)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--accent-cyan)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--primary)" },
                  }}
                >
                  <MenuItem value={1}>1 Month (Standard)</MenuItem>
                  <MenuItem value={3}>3 Months (5% Loyalty Discount)</MenuItem>
                  <MenuItem value={6}>6 Months (10% Loyalty Discount)</MenuItem>
                  <MenuItem value={12}>12 Months (15% Loyalty Discount)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel sx={{ fontFamily: "var(--font-sans)", color: "var(--text-med)", fontWeight: 500 }}>
                  Daily Shift Duration
                </InputLabel>
                <Select
                  value={monthlyDutyHours}
                  label="Daily Shift Duration"
                  onChange={(e) => setMonthlyDutyHours(e.target.value)}
                  sx={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--text-high)",
                    backgroundColor: "var(--bg-input)",
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border-input)" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--accent-cyan)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--primary)" },
                  }}
                >
                  <MenuItem value="standard">12 Hours Dedicated Shift (Included)</MenuItem>
                  <MenuItem value="extended">16 Hours Shift (+₹15,000 / month)</MenuItem>
                  <MenuItem value="full">24 Hours Double-Driver (+₹35,000 / month)</MenuItem>
                </Select>
              </FormControl>

              <div className={styles.rangeWrapper}>
                <div className={styles.rangeHeader}>
                  <label className={styles.label}>Extra Running Kms (Over 2,000 Km Base)</label>
                  <span className={styles.rangeValue}>+{monthlyExtraKms} km / month</span>
                </div>
                <Slider
                  value={monthlyExtraKms}
                  onChange={(e, val) => setMonthlyExtraKms(val as number)}
                  min={0}
                  max={5000}
                  step={100}
                  sx={{
                    color: "var(--accent-cyan)",
                    height: 6,
                    "& .MuiSlider-thumb": {
                      width: 18,
                      height: 18,
                      boxShadow: "0 0 10px rgba(255, 107, 0, 0.3)",
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: "0 0 0 8px rgba(255, 107, 0, 0.16)",
                      },
                    },
                    "& .MuiSlider-track": { height: 6 },
                    "& .MuiSlider-rail": { height: 6, color: "var(--timeline-line)", opacity: 1 },
                  }}
                />
                <span style={{ fontSize: "0.8rem", color: "var(--text-low)", marginTop: "0.25rem", display: "block" }}>
                  Extra Kms calculated at ₹{monthlyCalcs.extraKmRate} / km.
                </span>
              </div>
            </div>
          )}

          {activeTab === "adhoc" && (
            /* --- Ad-Hoc Calculator Results --- */
            <div className={`${styles.resultsPanel} glass`}>
              <div className={styles.resultsHeader}>
                <h3 className={styles.resultsTitle}>Calculation Summary</h3>
              </div>

              <div className={styles.priceBlock}>
                <span className={styles.priceLabel}>Estimated Logistics Cost</span>
                <div className={styles.priceValue}>₹ {adhocPrice.toLocaleString("en-IN")}</div>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>Transit Time</span>
                  <span className={styles.detailVal}>
                    ~ {adhocDays} {adhocDays === 1 ? "Day" : "Days"}
                  </span>
                </div>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>Carbon Footprint</span>
                  <span className={`${styles.detailVal} ${styles.detailValGreen}`}>
                    {adhocCo2} kg CO₂
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

              <Button
                variant="contained"
                onClick={handleBookAdhoc}
                sx={{
                  width: "100%",
                  py: 1.5,
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-heading)",
                  backgroundColor: "var(--accent-cyan)",
                  color: "#fff",
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(255, 107, 0, 0.2)",
                  borderRadius: "var(--radius-sm)",
                  "&:hover": {
                    backgroundColor: "#e05e00",
                    boxShadow: "0 6px 20px rgba(255, 107, 0, 0.35)",
                    transform: "translateY(-2px)",
                  },
                  transition: "var(--transition-smooth)",
                }}
              >
                Book Shipment at This Rate
              </Button>
            </div>
          )}

          {activeTab === "local" && (
            /* --- Local Cluster Calculator Results --- */
            <div className={`${styles.resultsPanel} glass`}>
              <div className={styles.resultsHeader}>
                <h3 className={styles.resultsTitle}>Point-to-Point Summary</h3>
              </div>

              <div className={styles.priceBlock}>
                <span className={styles.priceLabel}>Flat Local Transfer Rate</span>
                <div className={styles.priceValue}>₹ {localCalcs.rate.toLocaleString("en-IN")}</div>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>Cluster Route</span>
                  <span className={styles.detailVal} style={{ fontSize: "0.95rem" }}>
                    {localCalcs.clusterName}
                  </span>
                </div>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>Distance Bracket</span>
                  <span className={`${styles.detailVal} ${styles.detailValGreen}`} style={{ fontSize: "0.95rem" }}>
                    {localCalcs.distance}
                  </span>
                </div>
              </div>

              <ul className={styles.monthlyInfoList}>
                <li className={styles.monthlyInfoItem}>
                  <svg
                    className={styles.monthlyCheck}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Flat-rate Point-to-Point Delivery</span>
                </li>
                <li className={styles.monthlyInfoItem}>
                  <svg
                    className={styles.monthlyCheck}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Driver & Fuel Charges Inclusive</span>
                </li>
                <li className={styles.monthlyInfoItem}>
                  <svg
                    className={styles.monthlyCheck}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Tolls & local taxes extra at actuals</span>
                </li>
              </ul>

              <Button
                variant="contained"
                onClick={handleBookLocal}
                sx={{
                  width: "100%",
                  py: 1.5,
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-heading)",
                  backgroundColor: "var(--accent-cyan)",
                  color: "#fff",
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(255, 107, 0, 0.2)",
                  borderRadius: "var(--radius-sm)",
                  "&:hover": {
                    backgroundColor: "#e05e00",
                    boxShadow: "0 6px 20px rgba(255, 107, 0, 0.35)",
                    transform: "translateY(-2px)",
                  },
                  transition: "var(--transition-smooth)",
                }}
              >
                Book Point-to-Point Delivery
              </Button>
            </div>
          )}

          {activeTab === "monthly" && (
            /* --- Dedicated Monthly Fleet Calculator Results --- */
            <div className={`${styles.resultsPanel} glass`}>
              <div className={styles.resultsHeader}>
                <h3 className={styles.resultsTitle}>Dedicated Fleet Package</h3>
              </div>

              <div className={styles.priceBlock}>
                <span className={styles.priceLabel}>Package Cost Per Month</span>
                <div className={styles.priceValue}>
                  ₹ {monthlyCalcs.ratePerMonth.toLocaleString("en-IN")}
                </div>
                {monthlyDuration > 1 && (
                  <span style={{ fontSize: "0.85rem", color: "var(--accent-green)", fontWeight: 600 }}>
                    Contract Total: ₹ {monthlyCalcs.grandTotal.toLocaleString("en-IN")} ({monthlyDuration} Mos)
                  </span>
                )}
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>Included distance</span>
                  <span className={styles.detailVal}>
                    {monthlyExtraKms + 2000} km / mo
                  </span>
                </div>
                <div className={styles.detailCard}>
                  <span className={styles.detailLabel}>Contract Loyalty</span>
                  <span className={`${styles.detailVal} ${styles.detailValGreen}`}>
                    {monthlyCalcs.discountPercent}% Discount
                  </span>
                </div>
              </div>

              <ul className={styles.monthlyInfoList}>
                <li className={styles.monthlyInfoItem}>
                  <svg
                    className={styles.monthlyCheck}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{monthlyDutyHours === "standard" ? "12 Hours" : monthlyDutyHours === "extended" ? "16 Hours" : "24 Hours"} Dedicated Shift Daily</span>
                </li>
                <li className={styles.monthlyInfoItem}>
                  <svg
                    className={styles.monthlyCheck}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Professional & Verified Driver Included</span>
                </li>
                <li className={styles.monthlyInfoItem}>
                  <svg
                    className={styles.monthlyCheck}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Zero Maintenance & Repair Hassles</span>
                </li>
              </ul>

              <Button
                variant="contained"
                onClick={handleBookMonthly}
                sx={{
                  width: "100%",
                  py: 1.5,
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-heading)",
                  backgroundColor: "var(--accent-cyan)",
                  color: "#fff",
                  textTransform: "none",
                  boxShadow: "0 4px 15px rgba(255, 107, 0, 0.2)",
                  borderRadius: "var(--radius-sm)",
                  "&:hover": {
                    backgroundColor: "#e05e00",
                    boxShadow: "0 6px 20px rgba(255, 107, 0, 0.35)",
                    transform: "translateY(-2px)",
                  },
                  transition: "var(--transition-smooth)",
                }}
              >
                Book Dedicated Monthly Package
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
