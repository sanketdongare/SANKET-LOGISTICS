"use client";

import React, { useState } from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.grid} container`}>
        <div className={styles.column}>
          <div className={styles.logo} onClick={() => scrollToSection("home")} style={{ cursor: "pointer" }}>
            <svg
              className={styles.logoIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h9" />
              <path d="M20 14h2" />
              <path d="M14 10h10" />
              <path d="M14 14h4" />
              <circle cx="7.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <span className={styles.logoText}>
              SANKET <span className={styles.logoAccent}>LOGISTICS</span>
            </span>
          </div>
          <p className={styles.desc}>
            Providing global supply chain, warehousing, and freight forwarding solutions.
            Connecting businesses worldwide with premium, secure, and smart logistics services.
          </p>
          <div className={styles.desc} style={{ fontSize: "0.85rem", display: "flex", flexDirection: "column", gap: "0.4rem", opacity: 0.8 }}>
            <span><strong>Owner:</strong> Sanket Dhondibhau Dongare</span>
            <span><strong>GSTIN:</strong> 27GLNPD3288K1ZH</span>
            <span><strong>H.O:</strong> Nanekarwadi, Chakan, Pune – 410501</span>
          </div>
        </div>

        <div className={styles.column}>
          <h4 className={styles.title}>Services</h4>
          <ul className={styles.links}>
            <li className={styles.link} onClick={() => scrollToSection("services")}>Road Freight</li>
            <li className={styles.link} onClick={() => scrollToSection("services")}>Air Freight</li>
            <li className={styles.link} onClick={() => scrollToSection("services")}>Ocean Cargo</li>
            <li className={styles.link} onClick={() => scrollToSection("services")}>Warehousing</li>
            <li className={styles.link} onClick={() => scrollToSection("services")}>Supply Chain</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.title}>Company</h4>
          <ul className={styles.links}>
            <li className={styles.link} onClick={() => scrollToSection("home")}>About Us</li>
            <li className={styles.link} onClick={() => scrollToSection("fleet")}>Our Fleet</li>
            <li className={styles.link} onClick={() => scrollToSection("tracking")}>Track Shipment</li>
            <li className={styles.link} onClick={() => scrollToSection("calculator")}>Rate Estimator</li>
            <li className={styles.link} onClick={() => scrollToSection("booking")}>Contact Us</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.title}>Newsletter</h4>
          <p className={styles.newsletterText}>
            Subscribe to our weekly insights report for global logistics updates and freight market trends.
          </p>
          <form onSubmit={handleSubscribe} className={styles.form}>
            <input
              type="email"
              className={styles.input}
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary styles.submitBtn">
              Join
            </button>
          </form>
          {subscribed && (
            <span style={{ color: "var(--accent-green)", fontSize: "0.85rem", marginTop: "-0.5rem" }}>
              ✓ Subscribed successfully!
            </span>
          )}

          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>+91 7083701098</span>
            </div>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>sanketdongare89@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.bottom} container`}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} SANKET LOGISTICS Pvt. Ltd. All rights reserved.
        </span>
        <div className={styles.socials}>
          {["twitter", "linkedin", "facebook"].map((social) => (
            <a
              key={social}
              href="#"
              className={styles.socialIcon}
              aria-label={`Sanket Logistics on ${social}`}
            >
              {social === "twitter" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              )}
              {social === "linkedin" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              )}
              {social === "facebook" && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
