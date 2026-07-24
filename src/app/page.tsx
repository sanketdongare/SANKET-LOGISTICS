import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Tracking from "@/components/Tracking";
import Calculator from "@/components/Calculator";
import Fleet from "@/components/Fleet";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Tracking />
        <Calculator />
        <Fleet />
        <Booking />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
