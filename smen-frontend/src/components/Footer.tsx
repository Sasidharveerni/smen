import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Animated wrapper — fade-in on scroll                               */
/* ------------------------------------------------------------------ */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Doctors", to: "/doctors" },
  { label: "Therapists", to: "/therapists" },
  { label: "Contact", to: "/contact" },
];

const services = [
  { label: "ED Treatment", to: "/treatments/erectile-dysfunction" },
  { label: "PE Treatment", to: "/treatments/premature-ejaculation" },
  { label: "DE Treatment", to: "/treatments/delayed-ejaculation" },
  { label: "Diagnostics", to: "/diagnostics/penile-doppler" },
  { label: "Therapies", to: "/therapies/erectile-dysfunction" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Top gold separator */}
      <div className="h-px bg-gold-500" />

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Column 1 — Brand */}
          <FadeIn delay={0.0}>
            <div>
              <img
                src="/smen-logo.png"
                alt="SMEN"
                className="mb-5 h-10 w-auto"
              />
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-500">
                Advanced Men's Sexual Health
              </p>
              <p className="max-w-xs text-sm leading-relaxed text-white/60">
                Confidential, evidence-based treatments combining cutting-edge
                diagnostics with personalised care.
              </p>
            </div>
          </FadeIn>

          {/* Column 2 — Quick Links */}
          <FadeIn delay={0.1}>
            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gold-500">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-3">
                {quickLinks.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Column 3 — Services */}
          <FadeIn delay={0.2}>
            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gold-500">
                Services
              </h4>
              <ul className="flex flex-col gap-3">
                {services.map(({ label, to }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Column 4 — Contact */}
          <FadeIn delay={0.3}>
            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gold-500">
                Contact
              </h4>
              <ul className="flex flex-col gap-4 text-sm text-white/60">
                <li>
                  SMen, Axis Diagnostics Building,
                  <br />
                  Ratnam Residency, Pragathi Nagar Main Road,
                  <br />
                  Incois Rd, opp. Canara Bank,
                  <br />
                  Hyderabad, Telangana 500090
                </li>
                <li>
                  <a
                    href="tel:+918143031234"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    +91 81430 31234
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:smenclinics@gmail.com"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    smenclinics@gmail.com
                  </a>
                </li>
                <li>
                  <span className="block">Mon - Sat: 9:00 AM - 8:00 PM</span>
                  <span className="block">Sun: 10:00 AM - 2:00 PM</span>
                  <span className="block">Emergency: 24/7 Helpline</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5 lg:px-8">
          <span className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} SMEN. All rights reserved.
          </span>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="text-xs text-white/40 transition-colors duration-200 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-white/40 transition-colors duration-200 hover:text-white"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
