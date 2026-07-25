"use client";

import { useState } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate angle: max 15 degrees tilt
    const x = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 15;
    const y = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 15;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
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
          <div
            className={styles.interactiveContainer}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Orbiting SVG background decoration */}
            <svg className={styles.orbitingSvg} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="symbolGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Glowing base */}
              <circle cx="250" cy="250" r="220" fill="url(#symbolGlow)" />

              {/* Orbiting outer dotted ring */}
              <circle className={styles.orbitRing} cx="250" cy="250" r="195" stroke="var(--border-input)" strokeWidth="2" strokeDasharray="12 18" />

              {/* Orbiting inner dotted ring */}
              <circle className={styles.orbitRingInner} cx="250" cy="250" r="160" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeOpacity="0.45" strokeDasharray="6 8" />

              {/* Pulsing connection nodes */}
              <circle className={styles.pulseNode} cx="150" cy="150" r="6.5" fill="var(--accent-cyan)" />
              <circle className={styles.pulseNode} cx="350" cy="350" r="6.5" fill="var(--accent-cyan)" />
              <circle className={styles.pulseNode} cx="350" cy="150" r="6.5" fill="#FF6B00" />
              <circle className={styles.pulseNode} cx="150" cy="350" r="6.5" fill="var(--accent-cyan)" />
            </svg>

            {/* 3D Tilting Logo Frame */}
            <div
              className={styles.logoFrame}
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
                transition: mousePos.x === 0 && mousePos.y === 0 ? "transform 0.5s ease" : "none",
              }}
            >
              <div className={styles.logoRingOuter}>
                <div className={styles.logoRingInner}>
                  <div className={styles.centerTextContainer}>
                    <svg
                      className={styles.centerIcon}
                      width="38"
                      height="38"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--accent-cyan)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 17h2a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h2v-4l-3-4H9L6 13H2z" />
                      <circle cx="7" cy="17" r="2" />
                      <circle cx="17" cy="17" r="2" />
                    </svg>
                    <div className={styles.centerTextPrimary}>SANKET</div>
                    <div className={styles.centerTextSecondary}>LOGISTICS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
