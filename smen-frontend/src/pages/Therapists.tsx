import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */
interface Therapist {
  name: string;
  initials: string;
  specialty: string;
  experience: string;
  bio: string;
}

const therapists: Therapist[] = [
  {
    name: "Ananya Verma",
    initials: "AV",
    specialty: "Certified Sex Therapist",
    experience: "12+ years",
    bio: "AASECT-certified therapist specializing in desire discrepancy, performance anxiety, and intimacy restoration through cognitive-behavioral techniques.",
  },
  {
    name: "Dr. Meera Iyer",
    initials: "MI",
    specialty: "Clinical Psychologist",
    experience: "14+ years",
    bio: "Doctorate in clinical psychology with deep expertise in anxiety-driven sexual dysfunctions and trauma-informed therapeutic approaches.",
  },
  {
    name: "Kavita Nair",
    initials: "KN",
    specialty: "Relationship Counselor",
    experience: "10+ years",
    bio: "Gottman-trained couples counselor who helps partners rebuild communication, trust, and physical connection in a safe, structured environment.",
  },
  {
    name: "Dr. Arjun Reddy",
    initials: "AR",
    specialty: "Psychosexual Therapist",
    experience: "16+ years",
    bio: "Pioneering psychosexual therapist integrating mindfulness, sensate focus, and psychodynamic methods to address the root causes of sexual difficulties.",
  },
];

const approachPoints = [
  {
    title: "Compassionate & Judgment-Free",
    desc: "Every session is a safe space. Our therapists create an atmosphere of empathy and acceptance so you can speak openly without fear.",
  },
  {
    title: "Flexible & Private Sessions",
    desc: "In-person or virtual, individual or couples -- sessions are tailored to your comfort and schedule with complete confidentiality guaranteed.",
  },
  {
    title: "Evidence-Based Methods",
    desc: "Our therapists draw from CBT, mindfulness, psychodynamic therapy, and the latest research in sexual health psychology.",
  },
];

const therapyTypes = [
  {
    title: "Individual Sex Therapy",
    desc: "One-on-one sessions addressing performance anxiety, desire disorders, and body image concerns.",
  },
  {
    title: "Couples / Relationship Therapy",
    desc: "Guided sessions to rebuild communication, restore intimacy, and resolve conflict patterns.",
  },
  {
    title: "Cognitive Behavioral Therapy (CBT)",
    desc: "Structured techniques to reframe negative thought patterns around sex and intimacy.",
  },
  {
    title: "Psychosexual Therapy",
    desc: "Specialized therapy exploring the psychological and emotional roots of sexual difficulties.",
  },
  {
    title: "Mindfulness & Sensate Focus",
    desc: "Body-awareness exercises that reduce anxiety and help you reconnect with physical sensation.",
  },
  {
    title: "Trauma-Informed Therapy",
    desc: "Safe, paced processing of past experiences that may be affecting your present sexual well-being.",
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
export default function Therapists() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-white text-navy-950 font-body">
      {/* ============ Hero ============ */}
      <section className="relative bg-navy-950 overflow-hidden pt-32 pb-24 px-6">
        {/* Monogram watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[12rem] md:text-[18rem] font-display font-bold text-white/[0.03] leading-none tracking-tight">
            THERAPISTS
          </span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            <nav className="text-sm text-white/50 mb-6">
              <Link to="/" className="text-gold-500 hover:text-gold-400 transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span>Our Therapists</span>
            </nav>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight mb-6">
              Our Therapists
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/60 font-body max-w-xl mx-auto">
              Certified Sexual Health &amp; Relationship Therapists
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
            Sexual well-being is inseparable from mental and emotional health.
            Our licensed therapists and clinical psychologists specialize
            exclusively in sexual health and relationship dynamics. Whether you
            are navigating performance anxiety, intimacy challenges, or the
            emotional toll of a diagnosis, our team provides compassionate,
            judgment-free sessions designed to help you heal, reconnect, and
            thrive.
          </p>
        </Reveal>
      </section>

      {/* ============ Therapist Grid ============ */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <Reveal className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-navy-950 tracking-tight">
            Meet Our Therapists
          </h2>
        </Reveal>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {therapists.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
              className="group bg-white border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Initials monogram */}
              <div className="bg-navy-950 aspect-square flex items-center justify-center">
                <span className="text-gold-500 text-6xl md:text-7xl font-display font-semibold tracking-wide select-none">
                  {t.initials}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-heading text-xl font-semibold text-navy-950 mb-1">
                  {t.name}
                </h3>
                <p className="text-gold-500 text-sm uppercase tracking-wider font-body font-medium mb-2">
                  {t.specialty}
                </p>
                <p className="text-sm text-navy-700/50 font-body mb-4">
                  {t.experience} experience
                </p>
                <p className="text-sm leading-relaxed text-navy-700/70 font-body mb-6">
                  {t.bio}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-gold-500 text-sm font-medium font-body tracking-wide hover:text-gold-600 transition-colors group/link"
                >
                  Book Session
                  <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                    &rarr;
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ============ Our Approach ============ */}
      <section className="bg-navy-950 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
              Our Approach
            </h2>
            <p className="text-white/50 font-body max-w-xl mx-auto leading-relaxed">
              Compassionate, judgment-free sessions built on trust, backed by
              science, and tailored to your unique needs.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {approachPoints.map((a, i) => (
              <Reveal key={a.title} delay={0.1 + i * 0.1}>
                <div className="text-center md:text-left">
                  <div className="w-8 h-px bg-gold-500 mb-6 mx-auto md:mx-0" />
                  <h3 className="font-heading text-lg font-semibold text-white mb-3">
                    {a.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/50 font-body">
                    {a.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Therapy Types ============ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-navy-950 tracking-tight">
              Types of Therapy We Offer
            </h2>
          </Reveal>

          <div className="space-y-6">
            {therapyTypes.map((tt, i) => (
              <Reveal key={tt.title} delay={0.05 + i * 0.06}>
                <div className="flex items-start gap-5 py-5 border-b border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 shrink-0" />
                  <div>
                    <h3 className="font-heading text-base font-semibold text-navy-950 mb-1">
                      {tt.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-navy-700/60 font-body">
                      {tt.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-navy-950 tracking-tight mb-4">
              Start Your Healing Journey
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-navy-700/60 font-body leading-relaxed mb-10">
              Taking the first step is often the hardest -- and the most
              important. Book a confidential session with one of our therapists
              today. No judgment, no pressure, just expert guidance at your pace.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-navy-950 text-white font-body text-sm font-medium tracking-wider uppercase hover:bg-navy-800 transition-colors duration-300"
            >
              Book Your First Session
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
