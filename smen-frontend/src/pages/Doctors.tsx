import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
interface Doctor {
  name: string;
  initials: string;
  specialty: string;
  experience: string;
  bio: string;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Ravikishore Sadula",
    initials: "RS",
    specialty: "M.D. (Psychiatry) — Sexual Health Specialist",
    experience: "17+ years",
    bio: "Senior sexual health specialist with 17 years of clinical experience and 300+ patients treated. Expert in evidence-based psychiatric and sexual medicine. Speaks English, Hindi & Telugu.",
  },
  {
    name: "Dr. Anil Sharma",
    initials: "AS",
    specialty: "Sexual Medicine Specialist",
    experience: "12+ years",
    bio: "Board-certified in sexual medicine with expertise in hormonal therapies and penile rehabilitation protocols for lasting results.",
  },
  {
    name: "Dr. Priya Mehta",
    initials: "PM",
    specialty: "Urologist & Pelvic Health Expert",
    experience: "10+ years",
    bio: "Expert in pelvic floor disorders and ejaculatory dysfunction. Combines diagnostic precision with compassionate, patient-centered care.",
  },
  {
    name: "Dr. Sanjay Gupta",
    initials: "SG",
    specialty: "Andrologist & Fertility Specialist",
    experience: "18+ years",
    bio: "Leading andrologist recognized for groundbreaking work in male fertility preservation and advanced shockwave therapy techniques.",
  },
];

const whyReasons = [
  {
    title: "Evidence-Based Expertise",
    desc: "Every treatment protocol is grounded in the latest clinical research and peer-reviewed studies, ensuring you receive only proven therapies.",
  },
  {
    title: "100% Confidentiality",
    desc: "Your privacy is paramount. All consultations, records, and treatments are handled with the strictest medical confidentiality standards.",
  },
  {
    title: "Patient-First Approach",
    desc: "We listen before we prescribe. Our doctors take the time to understand your concerns, lifestyle, and goals before recommending any course of action.",
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                  */
/* ------------------------------------------------------------------ */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};


/* ------------------------------------------------------------------ */
/*  Reveal component                                                    */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function Doctors() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-white text-navy-950 font-body">
      {/* ============ Hero ============ */}
      <section className="relative bg-navy-950 overflow-hidden pt-32 pb-24 px-6">
        {/* Monogram watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[12rem] md:text-[18rem] font-display font-bold text-white/[0.03] leading-none tracking-tight">
            OUR DOCTORS
          </span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <nav className="text-sm text-white/50 mb-6">
              <Link to="/" className="text-gold-500 hover:text-gold-400 transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Our Doctors</span>
            </nav>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6">
              Our Doctors
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/60 font-body max-w-xl mx-auto">
              Expert Urologists &amp; Sexual Health Specialists
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="w-16 h-px bg-gold-500 mx-auto mt-8" />
          </Reveal>
        </div>
      </section>

      {/* ============ Intro ============ */}
      <section className="py-20 px-6">
        <Reveal className="max-w-3xl mx-auto text-center">
          <p className="text-base md:text-lg leading-relaxed text-navy-700/70 font-body">
            At SMEN, our team of board-certified urologists, andrologists, and
            sexual medicine specialists brings decades of combined clinical
            experience. Every doctor on our panel is committed to evidence-based,
            non-invasive treatments that restore confidence and improve quality of
            life — all within a private, judgment-free environment. We stay at the
            forefront of medical innovation so that you receive the most advanced
            care available today.
          </p>
        </Reveal>
      </section>

      {/* ============ Doctor Grid ============ */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <Reveal className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-navy-950 tracking-tight">
            Meet the Team
          </h2>
        </Reveal>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {doctors.map((doc) => (
            <motion.div
              key={doc.name}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
              className="group bg-white border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Initials monogram */}
              <div className="bg-navy-950 aspect-square flex items-center justify-center">
                <span className="text-gold-500 text-6xl md:text-7xl font-display font-semibold tracking-wide select-none">
                  {doc.initials}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-heading text-xl font-semibold text-navy-950 mb-1">
                  {doc.name}
                </h3>
                <p className="text-gold-500 text-sm uppercase tracking-wider font-body font-medium mb-2">
                  {doc.specialty}
                </p>
                <p className="text-sm text-navy-700/50 font-body mb-4">
                  {doc.experience} experience
                </p>
                <p className="text-sm leading-relaxed text-navy-700/70 font-body mb-6">
                  {doc.bio}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-gold-500 text-sm font-medium font-body tracking-wide hover:text-gold-600 transition-colors group/link"
                >
                  Book Appointment
                  <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ============ Why Our Doctors ============ */}
      <section className="bg-navy-950 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              Why Our Doctors
            </h2>
            <p className="text-white/50 font-body max-w-xl mx-auto leading-relaxed">
              Choosing the right specialist is the first step toward lasting
              results. Here is what sets our medical team apart.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {whyReasons.map((r, i) => (
              <Reveal key={r.title} delay={0.1 + i * 0.1}>
                <div className="text-center md:text-left">
                  <div className="w-8 h-px bg-gold-500 mb-6 mx-auto md:mx-0" />
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">
                    {r.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50 font-body">
                    {r.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-navy-950 tracking-tight mb-4">
              Ready to Take the First Step?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-navy-700/60 font-body leading-relaxed mb-10">
              Schedule a confidential consultation with one of our specialists
              today. Every conversation is private, every treatment plan is
              personalized, and every visit is a step toward a better you.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-navy-950 text-white font-body text-sm font-medium tracking-wider uppercase hover:bg-navy-800 transition-colors duration-300"
            >
              Schedule a Consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
