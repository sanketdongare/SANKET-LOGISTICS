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
            Next-Gen Logistics Network
          </div>
          <h1 className={styles.title}>
            Smart Transport Solutions for <span className="text-gradient-cyan">Global Scale</span>
          </h1>
          <p className={styles.description}>
            Sanket Logistics delivers premium, reliable, and secure supply chain and freight services.
            Powered by advanced tracking, optimized routing, and a modern fleet, we connect your business to the world.
          </p>

          <div className={styles.ctas}>
            <button
              className="btn btn-primary"
              onClick={() => handleScrollTo("tracking")}
            >
              Track Cargo
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
          <div className={`${styles.consoleCard} glass`}>
            <div className={styles.consoleHeader}>
              <div className={styles.consoleDots}>
                <span className={`${styles.dot} ${styles.dotRed}`}></span>
                <span className={`${styles.dot} ${styles.dotYellow}`}></span>
                <span className={`${styles.dot} ${styles.dotGreen}`}></span>
              </div>
              <span className={styles.consoleTitle}>Live Shipments Map</span>
            </div>

            <div className={styles.consoleBody}>
              <div className={styles.routeLine}>
                <div className={`${styles.routeNode} ${styles.nodeDone}`}>
                  <span className={styles.nodeMarker}></span>
                  <div className={styles.nodeLabel}>Origin: Shanghai Port</div>
                  <div className={styles.nodeDesc}>Dispatched & Passed Customs • Jul 22</div>
                </div>

                <div className={`${styles.routeNode} ${styles.nodeDone}`}>
                  <span className={styles.nodeMarker}></span>
                  <div className={styles.nodeLabel}>Transit: Indian Ocean</div>
                  <div className={styles.nodeDesc}>Cargo Vessel SK-Ocean 4 • Jul 23</div>
                </div>

                <div className={`${styles.routeNode} ${styles.nodeActive}`}>
                  <span className={styles.nodeMarker}></span>
                  <div className={styles.nodeLabel}>Destination: Nhava Sheva (Mumbai)</div>
                  <div className={styles.nodeDesc}>Arrival scheduled • Jul 25, 08:30 AM</div>
                </div>

                <div className={styles.routeNode}>
                  <span className={styles.nodeMarker}></span>
                  <div className={styles.nodeLabel}>Final Delivery: Warehouse Delhi</div>
                  <div className={styles.nodeDesc}>Local Courier Dispatch • Scheduled</div>
                </div>
              </div>

              <div className={styles.vehicleStatus}>
                <svg
                  className={styles.vehicleIcon}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M2 17h2a3 3 0 0 0 6 0h4a3 3 0 0 0 6 0h2v-4l-3-4H9L6 13H2z" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
                <div className={styles.vehicleInfo}>
                  <span className={styles.vehicleName}>Truck #SK-4820 (In-Route)</span>
                  <span className={styles.vehicleRoute}>Mumbai Hub → Delhi NCR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
