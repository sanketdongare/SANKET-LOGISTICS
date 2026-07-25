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

      <div className={`${styles.grid} container`}>
        <div className={`${styles.content} animate-fade-in`}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Dedicated Logistics Solutions
          </div>
          <h1 className={styles.title}>
            Reliable Transport &amp; <br />
            <span className="text-gradient-cyan">Supply Chain Partners</span>
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

        <div className={`${styles.visual} animate-fade-in`}>
          <svg className={styles.vectorSymbol} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="symbolGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B1B3D" />
                <stop offset="100%" stopColor="var(--accent-cyan)" />
              </linearGradient>
              <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FFA000" />
              </linearGradient>
            </defs>

            {/* Glowing background */}
            <circle cx="250" cy="250" r="220" fill="url(#symbolGlow)" />

            {/* Orbiting outer dotted ring */}
            <circle className={styles.orbitRing} cx="250" cy="250" r="180" stroke="var(--border-input)" strokeWidth="2.5" strokeDasharray="12 18" />

            {/* Orbiting inner dotted ring */}
            <circle className={styles.orbitRingInner} cx="250" cy="250" r="145" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeOpacity="0.45" strokeDasharray="6 8" />

            {/* Connection mesh lines */}
            <path d="M 110 250 A 140 140 0 0 1 390 250" stroke="var(--border-input)" strokeWidth="1.5" strokeOpacity="0.4" />
            <path d="M 250 110 A 140 140 0 0 1 250 390" stroke="var(--border-input)" strokeWidth="1.5" strokeOpacity="0.4" />
            <path d="M 150 150 L 350 350" stroke="var(--border-input)" strokeWidth="1" strokeOpacity="0.25" />
            <path d="M 150 350 L 350 150" stroke="var(--border-input)" strokeWidth="1" strokeOpacity="0.25" />

            {/* Pulsing connection nodes */}
            <g className={styles.nodesGroup}>
              <circle className={styles.pulseNode} cx="150" cy="150" r="6.5" fill="var(--accent-cyan)" />
              <circle className={styles.pulseNode} cx="350" cy="350" r="6.5" fill="var(--accent-cyan)" />
              <circle className={styles.pulseNode} cx="350" cy="150" r="6.5" fill="#FF6B00" />
              <circle className={styles.pulseNode} cx="150" cy="350" r="6.5" fill="var(--accent-cyan)" />
            </g>

            {/* Outer Hexagon Shield */}
            <polygon points="250,90 380,165 380,315 250,390 120,315 120,165" fill="none" stroke="url(#primaryGrad)" strokeWidth="4.5" strokeLinejoin="round" />
            {/* Inner Hexagon Shield */}
            <polygon className={styles.innerHex} points="250,110 360,175 360,305 250,370 140,305 140,175" fill="none" stroke="url(#accentGrad)" strokeWidth="2.5" strokeDasharray="18 12" strokeLinejoin="round" />

            {/* Central Cargo Truck Silhouette & Speed Lines */}
            <g transform="translate(192, 192) scale(2.4)">
              {/* Animated Speed Lines */}
              <path className={styles.speedLine1} d="M3 8 h4.5" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
              <path className={styles.speedLine2} d="M1.5 12 h6.5" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
              <path className={styles.speedLine3} d="M4 16 h3.5" stroke="#FF6B00" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Truck Shape */}
              <path d="M10 7 h12 l4.5 5.5 v6.5 h-2 a2.5 2.5 0 0 1-5 0 h-6 a2.5 2.5 0 0 1-5 0 h-2 v-12 z" fill="url(#primaryGrad)" />
              {/* Cabin window */}
              <path d="M19 8 h3.2 L24.7 12 h-5.7 z" fill="#fff" />
              {/* Wheels */}
              <circle cx="13.5" cy="19" r="1.5" fill="#fff" />
              <circle cx="21" cy="19" r="1.5" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
