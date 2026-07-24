"use client";

import { useState, useEffect } from "react";
import styles from "./Testimonials.module.css";

const TESTIMONIALS_DATA = [
  {
    name: "Rohan Mehta",
    role: "VP of Supply Chain, Apex Electronics",
    text: "Sanket Logistics transformed our electronics supply chain. Their custom route optimization reduced our shipping costs by 18% while guaranteeing 100% on-time delivery. A truly tech-forward partner.",
    stars: 5,
  },
  {
    name: "Dr. Nisha Sharma",
    role: "Director of Operations, BioPharma India",
    text: "Our temperature-sensitive pharmaceuticals require strict temperature logs and zero delays. The smart refrigerated fleet at Sanket Logistics has been absolutely flawless in maintaining strict standards.",
    stars: 5,
  },
  {
    name: "Vikram Singh",
    role: "Logistics Manager, Tata Infra Projects",
    text: "For heavy industrial machinery, you need logistics experts. Sanket Logistics handled our heavy multi-state machinery cargo hauling with absolute professionalism and excellent route support.",
    stars: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto scroll testimonials every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[index];

  return (
    <section className={`${styles.testimonials} section`}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.subTitle}>Success Stories</span>
          <h2 className={styles.title}>Trusted by Industry Leaders</h2>
          <p className={styles.desc}>
            See how Sanket Logistics helps companies optimize operations, reduce expenditures, and
            build resilient logistics networks.
          </p>
        </div>

        <div className={styles.container}>
          <div className={styles.carousel}>
            <div className={`${styles.card} glass`}>
              {/* Giant quote background symbol */}
              <svg className={styles.quoteIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <div className={styles.rating}>
                {Array.from({ length: current.stars }).map((_, i) => (
                  <svg
                    key={i}
                    className={styles.star}
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className={styles.text}>&quot;{current.text}&quot;</p>

              <div className={styles.author}>
                <span className={styles.authorName}>{current.name}</span>
                <span className={styles.authorRole}>{current.role}</span>
              </div>
            </div>

            <div className={styles.controls}>
              <button
                className={styles.controlBtn}
                onClick={handlePrev}
                aria-label="Previous review"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className={styles.dots}>
                {TESTIMONIALS_DATA.map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.dot} ${index === i ? styles.dotActive : ""}`}
                    onClick={() => setIndex(i)}
                  ></span>
                ))}
              </div>

              <button
                className={styles.controlBtn}
                onClick={handleNext}
                aria-label="Next review"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
