"use client";

import React, { useState, useEffect } from "react";
import styles from "./Booking.module.css";

interface BookingFormValues {
  name: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  mode: string;
  cargoType: string;
  weight: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  origin?: string;
  destination?: string;
}

export default function Booking() {
  const [formValues, setFormValues] = useState<BookingFormValues>({
    name: "",
    email: "",
    phone: "",
    origin: "",
    destination: "",
    mode: "road",
    cargoType: "general",
    weight: "150",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Prefill hook from Calculator rate selection
  useEffect(() => {
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<{
        mode: string;
        cargoType: string;
        weight: number;
        distance: number;
      }>;
      const { mode, cargoType, weight, distance } = customEvent.detail;
      setFormValues((prev) => ({
        ...prev,
        mode,
        cargoType,
        weight: weight.toString(),
        notes: `Prefilled from calculator. Distance: ${distance} km.`,
      }));
    };

    window.addEventListener("prefill-booking", handlePrefill);
    return () => window.removeEventListener("prefill-booking", handlePrefill);
  }, []);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!formValues.name.trim()) {
      tempErrors.name = "Full name is required.";
      isValid = false;
    }

    if (!formValues.email.trim()) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      tempErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formValues.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^[0-9+ ]{10,14}$/.test(formValues.phone.trim())) {
      tempErrors.phone = "Please enter a valid phone number (10-12 digits).";
      isValid = false;
    }

    if (!formValues.origin.trim()) {
      tempErrors.origin = "Origin city is required.";
      isValid = false;
    }

    if (!formValues.destination.trim()) {
      tempErrors.destination = "Destination city is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Mock tracking number generation
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const bookingId = `SK-${randomNum}`;
      setGeneratedId(bookingId);
      setShowSuccessModal(true);
      setIsCopied(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    // Reset form after successful booking
    setFormValues({
      name: "",
      email: "",
      phone: "",
      origin: "",
      destination: "",
      mode: "road",
      cargoType: "general",
      weight: "150",
      notes: "",
    });
  };

  // Dynamic message construction for WhatsApp and Email redirection
  const messageText = `Hello Sanket Logistics,

I would like to request a shipment booking.

*Booking Details:*
- *Booking ID:* ${generatedId}
- *Name:* ${formValues.name}
- *Email:* ${formValues.email}
- *Phone:* ${formValues.phone}
- *Origin:* ${formValues.origin}
- *Destination:* ${formValues.destination}
- *Mode of Transport:* ${formValues.mode.toUpperCase()}
- *Cargo Type:* ${formValues.cargoType.toUpperCase()}
- *Weight:* ${formValues.weight} kg
- *Notes:* ${formValues.notes || "None"}`;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=917083701098&text=${encodeURIComponent(messageText)}`;
  const emailUrl = `mailto:sanketdongare89@gmail.com?subject=New Booking Request - ${generatedId}&body=${encodeURIComponent(messageText)}`;

  return (
    <section id="booking" className={`${styles.booking} section`}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <span className={styles.subTitle}>Booking & Contact</span>
          <h2 className={styles.title}>Book Your Shipment</h2>
          <p className={styles.desc}>
            Fill out the form below to submit a shipment request. Our coordinators will review and
            contact you within 15 minutes.
          </p>
        </div>

        <div className={styles.sectionGrid}>
          <div className={`${styles.formCard} glass`}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className={styles.input}
                  placeholder="John Doe"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className={styles.input}
                  placeholder="john@example.com"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className={styles.input}
                  placeholder="+91 98765 43210"
                  value={formValues.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  className={styles.input}
                  placeholder="150"
                  value={formValues.weight}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Origin City</label>
                <input
                  type="text"
                  name="origin"
                  className={styles.input}
                  placeholder="Mumbai"
                  value={formValues.origin}
                  onChange={handleInputChange}
                />
                {errors.origin && <span className={styles.errorText}>{errors.origin}</span>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Destination City</label>
                <input
                  type="text"
                  name="destination"
                  className={styles.input}
                  placeholder="Bangalore"
                  value={formValues.destination}
                  onChange={handleInputChange}
                />
                {errors.destination && (
                  <span className={styles.errorText}>{errors.destination}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Transport Mode</label>
                <select
                  name="mode"
                  className={styles.select}
                  value={formValues.mode}
                  onChange={handleInputChange}
                >
                  <option value="road">Overland Road Freight</option>
                  <option value="air">Global Air Freight</option>
                  <option value="ocean">Ocean Cargo Shipping</option>
                  <option value="express">Express Courier B2B</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Cargo Type</label>
                <select
                  name="cargoType"
                  className={styles.select}
                  value={formValues.cargoType}
                  onChange={handleInputChange}
                >
                  <option value="general">General Dry Goods</option>
                  <option value="perishable">Perishables (Cold Chain)</option>
                  <option value="hazardous">Hazardous / Dangerous Goods</option>
                  <option value="highvalue">High-Value / Insured Goods</option>
                </select>
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.label}>Additional Details / Handling Notes</label>
                <textarea
                  name="notes"
                  className={styles.textarea}
                  placeholder="Describe your cargo, packing specifications, or key deadlines..."
                  value={formValues.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
              Submit Booking Request
            </button>
          </form>
        </div>

        <div className={`${styles.infoCard} glass`}>
          <h3 className={styles.infoTitle}>Official Credentials</h3>
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Owner & Founder</span>
              <span className={styles.infoVal}>Sanket Dhondibhau Dongare</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>GST Registration (GSTIN)</span>
              <span className={`${styles.infoVal} ${styles.infoGst}`}>27GLNPD3288K1ZH</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Registered Address</span>
              <span className={styles.infoVal}>
                Nanekarwadi, Chakan,
                <br />
                Pune – 410501, Maharashtra
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Direct Contact</span>
              <span className={styles.infoVal}>+91 7083701098</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Official Support Email</span>
              <span className={styles.infoVal}>sanketdongare89@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>

      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.successIcon}>
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className={styles.modalTitle}>Request Registered!</h3>
            <p className={styles.modalDesc}>
              Thank you, {formValues.name}. Your cargo transport request from{" "}
              <strong>{formValues.origin}</strong> to <strong>{formValues.destination}</strong> has
              been registered.
            </p>

            <div className={styles.trackingCard}>
              <span className={styles.trackingLabel}>Your Generated Mock Tracking ID</span>
              <div className={styles.trackingId}>{generatedId}</div>
              <button className={styles.copyBtn} onClick={copyToClipboard}>
                {isCopied ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy Code
                  </>
                )}
              </button>
            </div>

            <div className={styles.actionButtons}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.shareBtn} ${styles.shareBtnWhatsapp}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.46h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Send via WhatsApp
              </a>
              <a
                href={emailUrl}
                className={`${styles.shareBtn} ${styles.shareBtnEmail}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Send via Email
              </a>
            </div>

            <p className={styles.modalDesc} style={{ fontSize: "0.85rem", color: "var(--text-low)" }}>
              Tip: You can paste this ID directly into the tracking section to test the tracker simulator!
            </p>

            <button className="btn btn-primary styles.closeBtn" onClick={handleCloseModal}>
              Return to Website
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
