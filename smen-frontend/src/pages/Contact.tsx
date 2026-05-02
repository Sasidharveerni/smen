import { useState, useRef, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

/* ================================================================== */
/*  Scroll-triggered fade-in wrapper                                   */
/* ================================================================== */
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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  Contact page                                                       */
/* ================================================================== */
const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    preferredDate: "",
    condition: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you for reaching out! Our team will contact you shortly. Your information is 100% confidential."
    );
  };

  const conditions = [
    { value: "", label: "Select your condition / concern" },
    { value: "ED", label: "Erectile Dysfunction (ED)" },
    { value: "PE", label: "Premature Ejaculation (PE)" },
    { value: "DE", label: "Delayed Ejaculation (DE)" },
    { value: "Diagnostic", label: "Diagnostic Assessment" },
    { value: "Therapy", label: "Therapy / Counselling" },
    { value: "Other", label: "Other" },
  ];

  /* shared input classes */
  const inputClasses =
    "w-full bg-white border border-gray-200 px-4 py-3.5 text-sm text-navy-950 placeholder:text-gray-400 rounded-none transition-all duration-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/20 focus:outline-none";

  const labelClasses = "block text-xs uppercase tracking-wider text-gray-500 mb-2";

  return (
    <div className="min-h-screen bg-white">
      {/* ─────────────────────────────────────────────────────────── */}
      {/*  1. HERO                                                    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-navy-950 overflow-hidden py-32 lg:py-40">
        {/* Monogram watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="text-[15vw] font-display font-bold leading-none text-white/5 tracking-tighter">
            CONTACT
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm mb-10 font-body"
          >
            <Link
              to="/"
              className="text-gold-500 hover:text-gold-400 transition-colors"
            >
              Home
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/60">Contact</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-5"
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-body text-lg md:text-xl text-white/50 max-w-xl mx-auto"
          >
            We're Here to Help — 100% Confidential
          </motion.p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  2. CONTACT INFO ROW                                        */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Phone", value: "+91 81430 31234" },
            { label: "Email", value: "smenclinics@gmail.com" },
            { label: "Location", value: "Pragathi Nagar, Hyderabad" },
          ].map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.1}>
              <div className="border border-gray-200 p-8 text-center">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-body">
                  {item.label}
                </p>
                <p className="text-gold-500 font-body text-base font-medium">
                  {item.value}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  3. CONTACT FORM + WORKING HOURS                            */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* ── Form (2/3) ── */}
          <FadeIn className="lg:col-span-2">
            <h2 className="font-heading text-2xl md:text-3xl text-navy-950 mb-2">
              Get in Touch
            </h2>
            <p className="font-body text-sm text-gray-400 mb-10">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row: Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Row: Email + Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Condition Select */}
              <div>
                <label className={labelClasses}>Condition</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  {conditions.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className={labelClasses}>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className={`${inputClasses} resize-vertical min-h-[120px]`}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-gold-500 text-navy-950 py-4 font-body font-medium text-sm uppercase tracking-wider rounded-none transition-colors duration-300 hover:bg-gold-600 cursor-pointer"
              >
                Send Message
              </motion.button>

              {/* Privacy note */}
              <p className="text-xs text-gray-400 text-center font-body">
                Your information is 100% confidential
              </p>
            </form>
          </FadeIn>

          {/* ── Working Hours (1/3) ── */}
          <FadeIn delay={0.15} className="lg:col-span-1">
            <div className="border border-gray-200 border-t-2 border-t-gold-500">
              <div className="p-8">
                <h3 className="font-heading text-xl text-navy-950 mb-6">
                  Working Hours
                </h3>

                <div className="space-y-5 font-body text-sm">
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-500">Mon — Sat</span>
                    <span className="text-navy-950 font-medium">
                      9:00 AM — 8:00 PM
                    </span>
                  </div>

                  <div className="w-full h-px bg-gray-100" />

                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-500">Sunday</span>
                    <span className="text-navy-950 font-medium">
                      10:00 AM — 2:00 PM
                    </span>
                  </div>

                  <div className="w-full h-px bg-gray-100" />

                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-500">Emergency</span>
                    <span className="text-gold-500 font-medium">
                      24/7 Helpline
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  4. PRIVACY SECTION                                         */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl text-navy-950 mb-10 text-center">
              Your Privacy is Our Priority
            </h2>
          </FadeIn>

          <div className="space-y-5">
            {[
              "Encrypted Communications",
              "Private Consultation Rooms",
              "Discreet Billing",
            ].map((point, i) => (
              <FadeIn key={point} delay={i * 0.1}>
                <p className="font-body text-base text-navy-950/80">
                  <span className="text-gold-500 mr-3">—</span>
                  {point}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  5. MAP PLACEHOLDER                                         */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-20 lg:py-28">
        <FadeIn>
          <div className="bg-gray-100 flex items-center justify-center py-28 md:py-36">
            <p className="font-body text-sm text-gray-400 tracking-wide text-center px-6">
              Visit Us — SMen, Axis Diagnostics Building, Pragathi Nagar Main Road, Hyderabad, Telangana 500090
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
};

export default Contact;
