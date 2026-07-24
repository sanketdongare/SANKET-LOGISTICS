"use client";

import styles from "./Fleet.module.css";

const FLEET_DATA = [
  {
    name: "Heavy Duty Container Hauler",
    type: "Road Freight",
    description: "Equipped with climate-controlled suspension and GPS tracking for overland container transportation.",
    icon: (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h9" />
        <path d="M20 14h2" />
        <path d="M14 10h10" />
        <path d="M14 14h4" />
        <circle cx="7.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    specs: [
      { label: "Cargo Capacity", value: "42 Metric Tons" },
      { label: "Dimensions (LxWxH)", value: "13.6m x 2.5m x 2.8m" },
      { label: "Max Speed", value: "90 km/h" },
      { label: "Engine Class", value: "Euro VI Clean Diesel" },
      { label: "Eco Rating", value: "★★★★☆" },
    ],
  },
  {
    name: "Refrigerated Cargo Van",
    type: "Cold Chain",
    description: "Precision temperature-controlled vans perfect for transporting pharmaceuticals, groceries, and fresh produce.",
    icon: (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    specs: [
      { label: "Cargo Capacity", value: "8.5 Metric Tons" },
      { label: "Temp. Range", value: "-25°C to +15°C" },
      { label: "Refrigeration Unit", value: "Thermo King Premium" },
      { label: "GPS Telematics", value: "Continuous Monitoring" },
      { label: "Eco Rating", value: "★★★★★" },
    ],
  },
  {
    name: "Agile Express Carrier",
    type: "Last Mile",
    description: "Rapid delivery vans designed for intra-city distribution, courier transfers, and prompt corporate drop-offs.",
    icon: (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    specs: [
      { label: "Cargo Capacity", value: "3.2 Metric Tons" },
      { label: "Dimensions (LxWxH)", value: "4.8m x 1.8m x 1.9m" },
      { label: "Drive System", value: "100% Electric (EV)" },
      { label: "Range per Charge", value: "280 km" },
      { label: "Eco Rating", value: "★★★★★ (Zero Emission)" },
    ],
  },
  {
    name: "Boeing 747-8F Cargo Jet",
    type: "Air Freight",
    description: "Long-haul wide-body airliner configured specifically for massive international cargo and express parcel delivery.",
    icon: (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    specs: [
      { label: "Cargo Capacity", value: "137 Metric Tons" },
      { label: "Cruising Speed", value: "908 km/h" },
      { label: "Maximum Range", value: "8,130 km" },
      { label: "Specialty", value: "Oversized Air Cargo" },
      { label: "Eco Rating", value: "★★★☆☆" },
    ],
  },
  {
    name: "Oceanic Carrier Container Vessel",
    type: "Ocean Freight",
    description: "High-tonnage international vessel transporting bulk containers safely across transpacific and transatlantic lanes.",
    icon: (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M2 22h20" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33-.05l2.27-.57a1 1 0 0 0 .72-1.21L21 8.5" />
        <path d="M19 5.5v3M15 4v6M11 2.5v7.5M7 4v6M3 5.5v3" />
        <path d="M3 13h18c.6 0 1.1-.4 1.2-1l1-5c.1-.6-.3-1.2-1-1.3H1.8c-.7.1-1.1.7-1 1.3l1 5c.1.6.6 1 1.2 1z" />
      </svg>
    ),
    specs: [
      { label: "Cargo Capacity", value: "14,500 TEU Containers" },
      { label: "Deadweight Tonnage", value: "165,000 Tons" },
      { label: "Vessel Length", value: "366 meters" },
      { label: "Propulsion", value: "Eco-Hybrid Marine Engine" },
      { label: "Eco Rating", value: "★★★★☆" },
    ],
  },
  {
    name: "Flatbed Industrial Carrier",
    type: "Heavy Haul",
    description: "Open flatbed design customized for moving construction machinery, industrial equipment, and steel coils.",
    icon: (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    specs: [
      { label: "Cargo Capacity", value: "50 Metric Tons" },
      { label: "Deck Width", value: "2.8 meters" },
      { label: "Chassis", value: "Multi-Axle Expandable" },
      { label: "Securing Gear", value: "Automatic Heavy-Duty Tie-Downs" },
      { label: "Eco Rating", value: "★★★☆☆" },
    ],
  },
];

export default function Fleet() {
  return (
    <section id="fleet" className={`${styles.fleet} section`}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subTitle}>Our Logistics Power</span>
          <h2 className={styles.title}>The Sanket Logistics Fleet</h2>
          <p className={styles.desc}>
            We deploy a modern, highly specialized, and environmentally conscious fleet to ensure
            your products are moved under optimal conditions, every time.
          </p>
        </div>

        <div className={styles.grid}>
          {FLEET_DATA.map((vehicle, index) => (
            <div key={index} className={`${styles.card} glass`}>
              <div className={styles.cardImageBg}>{vehicle.icon}</div>

              <div className={styles.cardContent}>
                <span className={styles.cardBadge}>{vehicle.type}</span>
                <h3 className={styles.cardTitle}>{vehicle.name}</h3>
                <p className={styles.cardDesc}>{vehicle.description}</p>
              </div>

              <div className={styles.specsPanel}>
                <h4 className={styles.specsTitle}>Technical Specs</h4>
                <div className={styles.specsGrid}>
                  {vehicle.specs.map((spec, sIdx) => (
                    <div key={sIdx} className={styles.specRow}>
                      <span className={styles.specLabel}>{spec.label}</span>
                      <span className={styles.specVal}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
