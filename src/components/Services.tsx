"use client";

import Image from "next/image";
import styles from "./Services.module.css";

const SERVICES_DATA = [
  {
    title: "Overland Road Freight",
    description: "Flexible, secure, and fast door-to-door domestic cargo distribution with our advanced fleet of container trucks.",
    features: ["GPS Live Tracking", "FTL & LTL Options", "Express Delivery Services"],
    image: "/images/road_freight.jpg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Global Air Freight",
    description: "Time-critical international shipping routed through the world's major airport hubs. Safe and incredibly fast.",
    features: ["Customs Clearance Assist", "Temperature Control", "Priority Airport Handling"],
    image: "/images/air_freight.jpg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Ocean Cargo Shipping",
    description: "Efficient international container logistics. Perfect for transporting heavy, oversized, or high-volume items.",
    features: ["FCL & LCL Shipments", "Port-to-Port Handling", "Project Cargo Management"],
    image: "/images/ocean_freight.jpg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 22h20" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33-.05l2.27-.57a1 1 0 0 0 .72-1.21L21 8.5" />
        <path d="M19 5.5v3M15 4v6M11 2.5v7.5M7 4v6M3 5.5v3" />
        <path d="M3 13h18c.6 0 1.1-.4 1.2-1l1-5c.1-.6-.3-1.2-1-1.3H1.8c-.7.1-1.1.7-1 1.3l1 5c.1.6.6 1 1.2 1z" />
      </svg>
    ),
  },
  {
    title: "Smart Warehousing",
    description: "Secure, temperature-regulated, and automated inventory storage with complete warehouse management integration.",
    features: ["WMS Real-time Inventory", "Cross-Docking Services", "Picking & Packing Fulfilment"],
    image: "/images/warehouse.jpg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: "Express Courier B2B",
    description: "Next-day fast express service tailored for critical documentations, packages, and components distribution.",
    features: ["Proof of Delivery (POD)", "Same-Day City Delivery", "Direct Courier Access"],
    image: "/images/delivery_van.jpg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Supply Chain Consulting",
    description: "Strategic planning to optimize distribution lanes, reduce freight expenditures, and build resilient networks.",
    features: ["Route Optimization Studies", "3PL & 4PL Structuring", "Carbon Emission Reductions"],
    image: "/images/flatbed_truck.jpg",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className={`${styles.services} section`}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subTitle}>What We Offer</span>
          <h2 className={styles.title}>End-to-End Logistics Services</h2>
          <p className={styles.desc}>
            Sanket Logistics provides comprehensive, tech-driven transport and storage services,
            designed to make your supply chain efficient and stress-free.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES_DATA.map((service, index) => (
            <div key={index} className={`${styles.card} glass`}>
              <div className={styles.cardGlow}></div>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={service.image}
                  alt={service.title}
                  className={styles.cardImage}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className={styles.iconWrapper}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
              <ul className={styles.featureList}>
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className={styles.featureItem}>
                    <svg
                      className={styles.checkIcon}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
