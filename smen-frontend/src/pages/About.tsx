import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  animate,
} from "framer-motion";
import { Link } from "react-router-dom";

/* ═══════════════════════ ANIMATED COUNTER ═══════════════════════ */

interface CountUpProps {
  to: number;
  suffix?: string;
  duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({ to, suffix = "", duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, to, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, motionVal, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

/* ═══════════════════════ TEXT REVEAL ═══════════════════════ */

const TextReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={inView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ═══════════════════════ DATA ═══════════════════════ */

const values = [
  {
    num: "01",
    title: "Confidentiality",
    desc: "Your privacy is safeguarded at every step of your care journey.",
  },
  {
    num: "02",
    title: "Compassion",
    desc: "Empathetic, judgment-free care that puts your wellbeing first.",
  },
  {
    num: "03",
    title: "Excellence",
    desc: "The highest clinical standards in treatment and technology.",
  },
  {
    num: "04",
    title: "Innovation",
    desc: "Cutting-edge, evidence-based approaches to men's health.",
  },
  {
    num: "05",
    title: "Integrity",
    desc: "Honest, transparent relationships built on trust.",
  },
  {
    num: "06",
    title: "Accessibility",
    desc: "Making world-class sexual health care available to every man.",
  },
];

const stats = [
  { value: 1000, suffix: "+", label: "Patients Treated" },
  { value: 15, suffix: "+", label: "Advanced Treatments" },
  { value: 100, suffix: "%", label: "Confidential" },
  { value: 0, suffix: "", label: "Support", display: "24/7" },
];

/* ═══════════════════════ ANIMATION VARIANTS ═══════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

/* ═══════════════════════ COMPONENT ═══════════════════════ */

const About: React.FC = () => {
  /* refs for in-view detection */
  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" });

  const vmRef = useRef<HTMLDivElement>(null);
  const vmInView = useInView(vmRef, { once: true, margin: "-100px" });

  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  /* parallax for stats section */
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div className="min-h-screen bg-navy-950">
      {/* ─────────── 1. HERO ─────────── */}
      <section className="relative overflow-hidden bg-navy-950 py-32 md:py-40">
        {/* Monogram watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
          <span className="text-[15vw] font-display font-bold tracking-widest text-white/5">
            ABOUT
          </span>
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-sm font-body tracking-wide"
          >
            <Link
              to="/"
              className="text-gold-500 transition-colors hover:text-gold-400"
            >
              Home
            </Link>
            <span className="mx-2 text-white/30">&gt;</span>
            <span className="text-white/60">About</span>
          </motion.nav>

          {/* Heading with text reveal */}
          <TextReveal>
            <h1 className="font-heading text-5xl font-bold tracking-tight text-white md:text-7xl">
              About{" "}
              <span className="text-gold-500">SMEN</span>
            </h1>
          </TextReveal>

          {/* Subtitle */}
          <TextReveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl font-body text-lg text-white/60 md:text-xl">
              Pioneering Excellence in Men&rsquo;s Sexual Health
            </p>
          </TextReveal>

          {/* Decorative gold line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-10 h-px w-24 origin-center bg-gold-500/40"
          />
        </div>
      </section>

      {/* ─────────── 2. OUR STORY ─────────── */}
      <section className="bg-white py-24 md:py-32">
        <motion.div
          ref={storyRef}
          initial="hidden"
          animate={storyInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <h2 className="font-heading text-3xl font-semibold text-navy-950 md:text-4xl">
            Our <span className="text-gold-500">Story</span>
          </h2>

          <div className="mx-auto mt-4 h-px w-16 bg-gold-500/40" />

          <p className="mt-10 font-body text-base leading-relaxed text-navy-700 md:text-lg">
            SMEN was founded with a singular mission: to provide compassionate,
            confidential, and evidence-based sexual health care for men. We
            recognised that too many men suffer in silence due to stigma,
            misinformation, or lack of access to specialised care&nbsp;&mdash;
            and we set out to change that. Our clinic is built around a
            non-invasive approach, harnessing the latest medical technology to
            deliver safe, effective treatments without surgery or downtime.
          </p>

          {/* Pull quote */}
          <blockquote className="relative mx-auto mt-12 max-w-2xl border-l-4 border-gold-500 py-4 pl-8 text-left">
            <p className="font-heading text-xl italic leading-relaxed text-navy-900 md:text-2xl">
              &ldquo;Every consultation, every treatment plan, and every
              follow-up is designed with your comfort, privacy, and well-being
              at the forefront.&rdquo;
            </p>
          </blockquote>

          <p className="mt-10 font-body text-base leading-relaxed text-navy-700 md:text-lg">
            From diagnosis to recovery, we serve as your complete, one-stop
            solution for men&rsquo;s sexual wellness. Our team of specialists
            combines decades of experience with cutting-edge technology to
            deliver outcomes that restore confidence and transform lives.
          </p>
        </motion.div>
      </section>

      {/* ─────────── 3. VISION & MISSION ─────────── */}
      <section className="bg-cream py-24 md:py-32">
        <div
          ref={vmRef}
          className="mx-auto grid max-w-5xl gap-8 px-6 md:grid-cols-2"
        >
          {/* Vision */}
          <motion.div
            initial="hidden"
            animate={vmInView ? "visible" : "hidden"}
            variants={slideFromLeft}
            className="rounded-xl border border-navy-950/10 bg-white p-10 shadow-sm"
          >
            <div className="mb-6 h-1 w-16 bg-gold-500" />
            <h3 className="font-heading text-2xl font-semibold text-navy-950 md:text-3xl">
              Our Vision
            </h3>
            <p className="mt-4 font-body text-base leading-relaxed text-navy-700">
              To be India&rsquo;s most trusted and advanced sexual health
              clinic, breaking stigma and empowering men to lead healthier,
              more confident lives through world-class medical excellence.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial="hidden"
            animate={vmInView ? "visible" : "hidden"}
            variants={slideFromRight}
            className="rounded-xl border border-navy-950/10 bg-white p-10 shadow-sm"
          >
            <div className="mb-6 h-1 w-16 bg-gold-500" />
            <h3 className="font-heading text-2xl font-semibold text-navy-950 md:text-3xl">
              Our Mission
            </h3>
            <p className="mt-4 font-body text-base leading-relaxed text-navy-700">
              To provide world-class, evidence-based, non-invasive treatments
              in a 100% confidential environment, ensuring every patient
              receives personalized care with dignity and respect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────── 4. OUR VALUES ─────────── */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          {/* Section title */}
          <div className="mb-16 text-center">
            <h2 className="font-heading text-3xl font-semibold text-navy-950 md:text-4xl">
              Our <span className="text-gold-500">Values</span>
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gold-500/40" />
          </div>

          {/* Values grid */}
          <motion.div
            ref={valuesRef}
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {values.map(({ num, title, desc }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                className="group cursor-default rounded-lg border border-navy-950/5 bg-cream p-8 transition-all duration-300 hover:border-l-4 hover:border-l-gold-500 hover:shadow-md"
              >
                <span className="block font-heading text-3xl font-bold text-gold-500/30">
                  {num}
                </span>
                <h3 className="mt-3 font-heading text-xl font-semibold text-navy-950">
                  {title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-navy-700">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────── 5. STATS / NUMBERS (parallax dark) ─────────── */}
      <section
        ref={parallaxRef}
        className="relative overflow-hidden bg-navy-950 py-24 md:py-32"
      >
        {/* Monogram watermark with parallax */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
          style={{ y: parallaxY }}
        >
          <span className="text-[20vw] font-display font-bold tracking-widest text-white/[0.03]">
            SMEN
          </span>
        </motion.div>

        <div className="relative mx-auto max-w-5xl px-6">
          <motion.div
            ref={statsRef}
            variants={staggerContainer}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={staggerItem}
                className="text-center"
              >
                <div className="font-heading text-5xl font-bold text-gold-500">
                  {s.display ? (
                    s.display
                  ) : (
                    <CountUp to={s.value} suffix={s.suffix} duration={2.2} />
                  )}
                </div>
                <p className="mt-3 font-body text-sm tracking-wide text-white/60 uppercase">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────── 6. CTA ─────────── */}
      <section className="py-24 md:py-32">
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mx-auto max-w-2xl px-6 text-center"
        >
          <h2 className="font-heading text-3xl font-semibold text-white md:text-5xl">
            Ready to Start Your{" "}
            <span className="text-gold-500">Journey</span>?
          </h2>

          <p className="mx-auto mt-6 max-w-md font-body text-base text-white/50">
            Take the first step towards a healthier, more confident you. Our
            specialists are here to help&nbsp;&mdash; discreetly and
            professionally.
          </p>

          <Link to="/contact" className="mt-10 inline-block">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer rounded-lg bg-gold-500 px-10 py-4 font-body text-sm font-semibold tracking-wide text-navy-950 uppercase shadow-lg shadow-gold-500/20 transition-colors hover:bg-gold-400"
            >
              Book a Consultation
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
