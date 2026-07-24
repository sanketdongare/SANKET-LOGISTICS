"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll
      const sections = ["home", "services", "tracking", "calculator", "fleet", "booking"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (sectionId: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.navContainer} container`}>
        <div className={styles.logo} onClick={() => handleLinkClick("home")}>
          <svg
            className={styles.logoIcon}
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
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

        <nav>
          <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navActive : ""}`}>
            {[
              { id: "home", label: "Home" },
              { id: "services", label: "Services" },
              { id: "tracking", label: "Track Shipment" },
              { id: "calculator", label: "Rate Estimator" },
              { id: "fleet", label: "Our Fleet" },
              { id: "booking", label: "Contact Us" },
            ].map((link) => (
              <li key={link.id}>
                <a
                  className={`${styles.navLink} ${
                    activeSection === link.id ? styles.activeLink : ""
                  }`}
                  onClick={() => handleLinkClick(link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className={styles.navAction}>
              <button
                className="btn btn-primary"
                onClick={() => handleLinkClick("booking")}
              >
                Book Shipment
              </button>
            </li>
          </ul>
        </nav>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
