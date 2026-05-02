import { useRef, type ReactNode } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

/* ================================================================== */
/*  Diagnostic data                                                    */
/* ================================================================== */
interface DiagnosticData {
  title: string;
  abbr: string;
  subtitle: string;
  description: string;
  howItWorks: string;
  benefits: string[];
  preparation: string[];
  duration: string;
}

const diagnostics: Record<string, DiagnosticData> = {
  "penile-doppler": {
    title: "Penile Doppler",
    abbr: "PD",
    subtitle: "Advanced Vascular Assessment for Erectile Function",
    description:
      "Penile Doppler ultrasound is a specialized diagnostic test that evaluates blood flow to the penis. It helps identify vascular causes of erectile dysfunction by measuring arterial inflow and venous outflow.",
    howItWorks:
      "A high-frequency ultrasound probe is used to visualize the blood vessels in the penis. After injection of a vasodilator medication, blood flow velocity and direction are measured to assess arterial sufficiency and venous competence.",
    benefits: [
      "Non-invasive and painless",
      "Accurate vascular assessment",
      "Helps determine ED cause",
      "Guides treatment planning",
      "Quick results",
    ],
    preparation: [
      "No special fasting required",
      "Wear comfortable clothing",
      "Inform about current medications",
      "Allow 30-45 minutes for the procedure",
    ],
    duration: "30-45 minutes",
  },
  "usg-abdomen": {
    title: "USG Abdomen",
    abbr: "USG",
    subtitle: "Comprehensive Abdominal Ultrasound Evaluation",
    description:
      "Abdominal ultrasound is a non-invasive imaging technique used to examine organs in the abdomen including kidneys, liver, bladder, and prostate. It helps detect conditions that may contribute to sexual health issues.",
    howItWorks:
      "Sound waves create real-time images of internal organs. A gel is applied to the abdomen and a transducer is moved across the skin to capture detailed images of organs and structures.",
    benefits: [
      "Completely non-invasive",
      "No radiation exposure",
      "Real-time organ visualization",
      "Detects structural abnormalities",
      "Painless procedure",
    ],
    preparation: [
      "Fasting for 6-8 hours recommended",
      "Drink water to fill bladder",
      "Wear loose, comfortable clothing",
      "Bring previous reports if any",
    ],
    duration: "20-30 minutes",
  },
  "usg-scrotum": {
    title: "USG Scrotum & Doppler",
    abbr: "USD",
    subtitle: "Detailed Scrotal Ultrasound with Blood Flow Analysis",
    description:
      "Scrotal ultrasound with Doppler evaluation provides detailed images of the testicles and surrounding structures, along with blood flow assessment. It is essential for diagnosing varicocele, testicular issues, and other scrotal conditions.",
    howItWorks:
      "High-frequency sound waves produce detailed images of the scrotal contents. Doppler technology adds blood flow information, helping identify varicoceles, torsion, or other vascular issues.",
    benefits: [
      "Detailed testicular imaging",
      "Blood flow assessment",
      "Varicocele detection",
      "Non-invasive and safe",
      "Immediate results",
    ],
    preparation: [
      "No fasting needed",
      "Wear comfortable, loose clothing",
      "No special preparation required",
      "Allow 20-30 minutes",
    ],
    duration: "20-30 minutes",
  },
  uroflowmetry: {
    title: "Uroflowmetry",
    abbr: "UFM",
    subtitle: "Urinary Flow Rate Assessment",
    description:
      "Uroflowmetry is a simple, non-invasive diagnostic test that measures the flow rate of urine. It helps evaluate the function of the urinary tract and can identify obstructions or abnormalities affecting urination.",
    howItWorks:
      "You urinate into a special funnel connected to a measuring device. The equipment records the volume, speed, and duration of urine flow, generating a flow curve that helps diagnose urinary conditions.",
    benefits: [
      "Completely non-invasive",
      "Quick and simple test",
      "Evaluates urinary function",
      "Detects obstructions",
      "Guides further treatment",
    ],
    preparation: [
      "Arrive with a comfortably full bladder",
      "Drink fluids before the test",
      "Avoid urinating for 2 hours before",
      "Normal diet allowed",
    ],
    duration: "10-15 minutes",
  },
  eeg: {
    title: "EEG (Electroencephalogram)",
    abbr: "EEG",
    subtitle: "Brain Wave Activity Monitoring",
    description:
      "An electroencephalogram (EEG) records electrical activity in the brain. In the context of sexual health, it can help identify neurological factors that may contribute to sexual dysfunction.",
    howItWorks:
      "Small electrodes are attached to the scalp using a special paste. These sensors detect and record the electrical signals produced by brain cells, which are displayed as wave patterns for analysis.",
    benefits: [
      "Non-invasive brain monitoring",
      "Identifies neurological factors",
      "Painless procedure",
      "Helps in comprehensive diagnosis",
      "Safe with no side effects",
    ],
    preparation: [
      "Wash hair before the test",
      "Avoid caffeine for 8 hours",
      "Take medications as usual",
      "Get adequate sleep the night before",
    ],
    duration: "45-60 minutes",
  },
  ecg: {
    title: "ECG (Electrocardiogram)",
    abbr: "ECG",
    subtitle: "Heart Rhythm & Function Assessment",
    description:
      "An electrocardiogram records the electrical activity of the heart. Cardiovascular health is closely linked to sexual function, and ECG helps assess heart health as part of a comprehensive sexual health evaluation.",
    howItWorks:
      "Electrodes are placed on the chest, arms, and legs. These detect the electrical impulses generated by the heart and display them as a waveform, revealing heart rhythm, rate, and other cardiac parameters.",
    benefits: [
      "Quick and painless",
      "Assesses cardiovascular health",
      "Links heart health to sexual function",
      "Identifies hidden heart conditions",
      "Essential baseline test",
    ],
    preparation: [
      "No special preparation needed",
      "Wear easily removable clothing",
      "Avoid exercise before the test",
      "Inform about medications",
    ],
    duration: "10-15 minutes",
  },
  "ncv-ncs": {
    title: "Nerve Stimulation Test (NCV/NCS)",
    abbr: "NCS",
    subtitle: "Nerve Conduction & Function Evaluation",
    description:
      "Nerve Conduction Velocity (NCV) and Nerve Conduction Studies (NCS) measure how fast electrical signals travel through nerves. This test helps identify nerve damage that may contribute to sexual dysfunction.",
    howItWorks:
      "Small electrodes are placed on the skin over specific nerves. A mild electrical impulse stimulates the nerve, and the response is recorded. The speed and strength of the signal helps identify nerve damage or dysfunction.",
    benefits: [
      "Identifies nerve damage",
      "Guides targeted treatment",
      "Non-invasive assessment",
      "Quantifiable results",
      "Helps in comprehensive diagnosis",
    ],
    preparation: [
      "No fasting required",
      "Avoid lotions on test areas",
      "Wear loose clothing",
      "Inform about pacemakers or implants",
    ],
    duration: "30-60 minutes",
  },
};

/* ================================================================== */
/*  Why Choose SMEN data                                               */
/* ================================================================== */
const whyChoose = [
  {
    label: "Latest Equipment",
    desc: "State-of-the-art diagnostic technology for the most accurate results.",
  },
  {
    label: "Experienced Technicians",
    desc: "Board-certified professionals with years of specialized experience.",
  },
  {
    label: "Comfortable Environment",
    desc: "A calm, private setting designed for your comfort and ease.",
  },
  {
    label: "Quick Results",
    desc: "Fast turnaround so you can begin your treatment plan sooner.",
  },
  {
    label: "Confidential",
    desc: "Your privacy is our top priority at every step of the process.",
  },
];

/* ================================================================== */
/*  Scroll-reveal wrapper                                              */
/* ================================================================== */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================== */
/*  Main Diagnostic page                                               */
/* ================================================================== */
export default function Diagnostic() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? diagnostics[slug] : undefined;

  /* ── Not Found ─────────────────────────────────────────────────── */
  if (!data || !slug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-navy-950 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-heading text-6xl font-bold text-gold-500 mb-6">
            404
          </p>
          <h1 className="font-heading text-3xl font-semibold text-white mb-3">
            Diagnostic Not Found
          </h1>
          <p className="text-warm-gray text-lg mb-10 max-w-md mx-auto leading-relaxed">
            The diagnostic test you are looking for does not exist or may have
            been moved.
          </p>
          <Link
            to="/"
            className="inline-block px-10 py-4 bg-gold-500 text-navy-950 font-bold text-sm uppercase tracking-widest rounded-none hover:bg-gold-600 transition-colors"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================================ */}
      {/*  1. HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative bg-navy-950 overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 px-6">
        {/* Monogram watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[15vw] font-display font-black text-white/5 leading-none">
            {data.abbr}
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-sm mb-10 flex-wrap"
          >
            <Link to="/" className="text-gold-500 hover:text-gold-400 transition-colors">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white/50">Diagnostics</span>
            <span className="text-white/30">/</span>
            <span className="text-white/80">{data.title}</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight"
          >
            {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="font-body text-lg md:text-xl text-gold-300 max-w-2xl mx-auto leading-relaxed"
          >
            {data.subtitle}
          </motion.p>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. OVERVIEW                                                  */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-navy-950 mb-8">
            Overview
          </h2>
          <div className="w-12 h-px bg-gold-500 mx-auto mb-10" />
          <p className="font-body text-lg md:text-xl text-navy-700 leading-[1.85] tracking-normal">
            {data.description}
          </p>
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/*  3. HOW IT WORKS                                              */}
      {/* ============================================================ */}
      <section className="bg-cream py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-navy-950 mb-10 text-center">
              How It Works
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="border border-navy-950/10 rounded-sm overflow-hidden">
              <div className="h-1 bg-gold-500" />
              <div className="px-8 py-10 md:px-12 md:py-14">
                <p className="font-body text-lg text-navy-700 leading-[1.9]">
                  {data.howItWorks}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. BENEFITS                                                  */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-navy-950 mb-12 text-center">
              Benefits
            </h2>
          </Reveal>

          <div className="space-y-5">
            {data.benefits.map((benefit, i) => (
              <Reveal key={benefit} delay={0.08 * i}>
                <div className="flex items-start gap-4">
                  <span className="text-gold-500 text-xl font-bold leading-relaxed shrink-0 mt-0.5">
                    &#10003;
                  </span>
                  <p className="font-body text-lg text-navy-700 leading-relaxed">
                    {benefit}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. PREPARATION                                               */}
      {/* ============================================================ */}
      <section className="bg-navy-950 py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-14 text-center">
              How to Prepare
            </h2>
          </Reveal>

          <div className="space-y-8">
            {data.preparation.map((step, i) => (
              <Reveal key={step} delay={0.1 * i}>
                <div className="flex items-start gap-6">
                  <span className="font-heading text-2xl md:text-3xl font-bold text-gold-500 leading-none shrink-0 mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 border-b border-white/10 pb-6">
                    <p className="font-body text-lg text-white/80 leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. DURATION                                                  */}
      {/* ============================================================ */}
      <section className="py-20 md:py-24 px-6">
        <Reveal className="max-w-md mx-auto text-center">
          <div className="border border-navy-950/10 rounded-sm px-10 py-12">
            <p className="font-body text-sm uppercase tracking-[0.2em] text-warm-gray mb-4">
              Estimated Duration
            </p>
            <p className="font-heading text-4xl md:text-5xl font-bold text-navy-950">
              {data.duration}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ============================================================ */}
      {/*  7. WHY CHOOSE SMEN                                           */}
      {/* ============================================================ */}
      <section className="bg-cream py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-navy-950 mb-14 text-center">
              Why Choose SMEN
            </h2>
          </Reveal>

          <div className="space-y-8">
            {whyChoose.map((item, i) => (
              <Reveal key={item.label} delay={0.08 * i}>
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="font-heading text-lg font-bold text-gold-500 shrink-0 w-44 md:w-52 text-right">
                    {item.label}
                  </span>
                  <p className="font-body text-lg text-navy-700 leading-relaxed flex-1">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. CTA                                                       */}
      {/* ============================================================ */}
      <section className="bg-navy-950 py-24 md:py-32 px-6">
        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Book Your Diagnostic Test
          </h2>
          <p className="font-body text-lg text-white/60 leading-relaxed mb-12 max-w-lg mx-auto">
            Take the first step towards understanding your health. Our expert
            team is ready to provide accurate, confidential, and comfortable
            diagnostic services.
          </p>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block"
          >
            <Link
              to="/contact"
              className="inline-block px-14 py-5 bg-gold-500 text-navy-950 font-bold text-sm uppercase tracking-[0.15em] hover:bg-gold-400 transition-colors"
            >
              Book Now
            </Link>
          </motion.div>
        </Reveal>
      </section>
    </div>
  );
}
