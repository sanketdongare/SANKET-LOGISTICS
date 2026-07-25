"use client";

import Image from "next/image";
import styles from "./Fleet.module.css";

const FLEET_DATA = [
  {
    name: "Mahindra Bolero Pickup",
    type: "Pickup (1 - 1.3 Ton)",
    description: "Robust and agile commercial vehicle, ideal for fast local cluster deliveries and agricultural/light goods distribution.",
    image: "/images/bolero_pickup.jpg",
    icon: (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h9" />
        <circle cx="7.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    specs: [
      { label: "Cargo Capacity", value: "1.0 - 1.3 Tons" },
      { label: "Dimensions (LxWxH)", value: "2.4m x 1.7m x 1.6m" },
      { label: "Max Speed", value: "85 km/h" },
      { label: "Engine Class", value: "m2DiCR Turbocharged Diesel" },
      { label: "Eco Rating", value: "★★★★☆" },
    ],
  },
  {
    name: "Tata 407",
    type: "Tata 407 (2.2 - 2.5 Ton)",
    description: "The legendary light commercial vehicle, offering reliable cargo haulage and versatility across local cluster routes.",
    image: "/images/tata_407.jpg",
    icon: (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    specs: [
      { label: "Cargo Capacity", value: "2.2 - 2.5 Tons" },
      { label: "Dimensions (LxWxH)", value: "3.4m x 2.0m x 1.9m" },
      { label: "Max Speed", value: "90 km/h" },
      { label: "Engine Class", value: "4SPCR Turbo Intercooled" },
      { label: "Eco Rating", value: "★★★★☆" },
    ],
  },
  {
    name: "Tata 709",
    type: "Tata 709 (3.5 - 4 Ton)",
    description: "High performance intermediate commercial truck, balancing payload volume and city road maneuverability.",
    image: "/images/tata_709.jpg",
    icon: (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    specs: [
      { label: "Cargo Capacity", value: "3.5 - 4.0 Tons" },
      { label: "Dimensions (LxWxH)", value: "4.2m x 2.2m x 2.1m" },
      { label: "Max Speed", value: "90 km/h" },
      { label: "Engine Class", value: "3.8 SGI Clean Engine" },
      { label: "Eco Rating", value: "★★★★★" },
    ],
  },
  {
    name: "Tata 909",
    type: "Tata 909 (5.5 - 6.5 Ton)",
    description: "Heavy-duty commercial carrier built to move bulky industrial components, auto parts, and heavy freight safely.",
    image: "/images/tata_909.jpg",
    icon: (
      <svg className={styles.cardIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    specs: [
      { label: "Cargo Capacity", value: "5.5 - 6.5 Tons" },
      { label: "Dimensions (LxWxH)", value: "5.2m x 2.3m x 2.2m" },
      { label: "Max Speed", value: "90 km/h" },
      { label: "Engine Class", value: "3.8L High-Torque Turbo" },
      { label: "Eco Rating", value: "★★★★☆" },
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
            We deploy a modern, specialized fleet of commercial trucks to serve the Chakan industrial cluster
            and wider regional routes with rock-solid dependability.
          </p>
        </div>

        <div className={styles.grid}>
          {FLEET_DATA.map((vehicle, index) => (
            <div key={index} className={`${styles.card} glass`}>
              <div className={styles.cardImageBg}>
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  className={styles.fleetImg}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

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
