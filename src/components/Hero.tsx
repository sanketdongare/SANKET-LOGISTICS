"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.glowBall1}></div>
        <div className={styles.glowBall2}></div>
      </div>

      <div className="container">
        <div className={`${styles.contentCentered} animate-fade-in`}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Dedicated Logistics Solutions
          </div>
          <h1 className={styles.title}>
            Reliable Transport &amp; <span className="text-gradient-cyan">Supply Chain Partners</span>
          </h1>
          <p className={styles.description}>
            Based in Nanekarwadi, Chakan, Pune, Sanket Logistics delivers premium, reliable, and secure 
            freight solutions. We optimize your business transit requirements with rock-solid dependability.
          </p>

          <div className={styles.ctas}>
            <button
              className="btn btn-primary"
              onClick={() => handleScrollTo("booking")}
            >
              Book Shipment
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "0.5rem" }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleScrollTo("calculator")}
            >
              Get Booking Estimate
            </button>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>15M+</span>
              <span className={styles.statLabel}>Miles Covered</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>99.9%</span>
              <span className={styles.statLabel}>On-Time Rate</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>650+</span>
              <span className={styles.statLabel}>Active Fleet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
