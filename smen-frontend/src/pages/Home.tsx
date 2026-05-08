import { useRef, type FC, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';

/* ══════════════════════════════════════════════════════════════════
   ANIMATION HELPERS
   ══════════════════════════════════════════════════════════════════ */

/** Staggered text-reveal: parent + children variants */
const textRevealParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const textRevealChild = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

/** Wrapper that triggers animation when scrolled into view */
const ScrollReveal: FC<{
  children: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}> = ({ children, className, threshold = 0.2, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Animated heading with per-word reveal */
const RevealHeading: FC<{
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}> = ({ text, className = '', as: Tag = 'h2' }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      <motion.span
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={textRevealParent}
        className="flex flex-wrap justify-center"
      >
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
            <motion.span variants={textRevealChild} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};

/** Gold line that expands from 0 to full width on scroll */
const ExpandingLine: FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={`h-px bg-gold-500 origin-left ${className}`}
    />
  );
};

/** Single "Why" item -- extracted so hooks are called at component top level */
const WhyItem: FC<{
  item: { num: string; title: string; desc: string };
  isLast: boolean;
}> = ({ item, isLast }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={textRevealParent}
        className="py-12 md:py-16"
      >
        <div className="flex items-start gap-6 md:gap-10">
          <motion.span
            variants={textRevealChild}
            className="text-4xl md:text-5xl font-heading text-gold-500/30 leading-none shrink-0"
          >
            {item.num}
          </motion.span>

          <div>
            <div className="overflow-hidden mb-4">
              <motion.h3
                variants={textRevealChild}
                className="text-2xl md:text-3xl font-heading text-white"
              >
                {item.title}
              </motion.h3>
            </div>
            <div className="overflow-hidden">
              <motion.p
                variants={textRevealChild}
                className="text-base md:text-lg text-white/50 leading-relaxed font-body max-w-xl"
              >
                {item.desc}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>

      {!isLast && <ExpandingLine className="max-w-full" />}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════════ */

const trustItems = [
  '100% Confidential',
  'Non-Invasive',
  'Latest Technology',
  'Evidence Based',
];

const conditions = [
  {
    num: '01',
    title: 'Erectile Dysfunction',
    desc: 'Regain confidence with advanced, non-invasive treatments tailored to restore natural function effectively.',
    link: '/treatments/erectile-dysfunction',
  },
  {
    num: '02',
    title: 'Premature Ejaculation',
    desc: 'Take control with proven therapies designed to enhance endurance and improve intimate well-being.',
    link: '/treatments/premature-ejaculation',
  },
  {
    num: '03',
    title: 'Delayed Ejaculation',
    desc: 'Discover personalized solutions that address root causes and help restore a fulfilling intimate life.',
    link: '/treatments/delayed-ejaculation',
  },
];

const whyItems = [
  {
    num: '01',
    title: 'One-Stop Solution',
    desc: 'Comprehensive sexual health care under one roof -- from diagnosis and testing to treatment and long-term follow-up, all handled by a dedicated team.',
  },
  {
    num: '02',
    title: 'Advanced Equipment',
    desc: 'State-of-the-art diagnostic and treatment technology including Rigi Scan, Penile Doppler, Shock Wave Therapy, and HIFEM -- delivering precision results.',
  },
  {
    num: '03',
    title: 'Expert Specialists',
    desc: 'Experienced urologists and sexual health experts bring years of specialized training and a compassionate, evidence-based approach to every patient.',
  },
];

const treatments = [
  {
    title: 'Shock Wave Therapy',
    desc: 'Non-invasive acoustic waves to stimulate tissue repair and improve blood flow.',
    link: '/therapies/shock-wave-therapy',
  },
  {
    title: 'HIFEM Therapy',
    desc: 'High-Intensity Focused Electromagnetic technology for pelvic floor strengthening.',
    link: '/therapies/hifem',
  },
  {
    title: 'Rigi Scan',
    desc: 'Gold-standard nocturnal penile tumescence testing for accurate diagnosis.',
    link: '/diagnostics/rigi-scan',
  },
  {
    title: 'Biofeedback SOT',
    desc: 'Sensory-optimized training to build control through real-time biofeedback.',
    link: '/therapies/biofeedback-sot',
  },
  {
    title: 'Stem Cell Therapy',
    desc: "Regenerative medicine harnessing the body's healing power for restoration.",
    link: '/therapies/stem-cell-therapy',
  },
  {
    title: 'Penile Doppler',
    desc: 'Advanced ultrasound imaging for precise vascular assessment and planning.',
    link: '/diagnostics/penile-doppler',
  },
];

const processSteps = [
  { num: '01', title: 'Book Consultation', desc: 'Schedule a private appointment at your convenience, online or by phone.' },
  { num: '02', title: 'Confidential Assessment', desc: 'A thorough, discreet evaluation by our specialist team to understand your needs.' },
  { num: '03', title: 'Personalized Treatment', desc: 'A bespoke treatment plan crafted around your specific condition and goals.' },
  { num: '04', title: 'Recovery & Follow-up', desc: 'Ongoing support, monitoring, and adjustments to ensure lasting results.' },
];

const testimonials = [
  {
    text: 'I was hesitant at first, but the team made me feel completely at ease. The treatment was painless and the results have been life-changing.',
    initials: 'R.K.',
    city: 'Hyderabad',
    stars: 5,
  },
  {
    text: "The confidentiality and professionalism here are unmatched. I finally found a clinic that truly understands men's health concerns.",
    initials: 'A.M.',
    city: 'Bangalore',
    stars: 5,
  },
  {
    text: "Advanced technology combined with genuine care. My confidence has been restored and I couldn't be more grateful to the SMEN team.",
    initials: 'S.P.',
    city: 'Chennai',
    stars: 5,
  },
];

/* ══════════════════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════════════════ */

const Home: FC = () => {
  /* ── Parallax: hero watermark ── */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroWatermarkY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroContentOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroContentY = useTransform(heroScroll, [0, 0.7], [0, 60]);

  /* ── Parallax: why section watermark ── */
  const whyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: whyScroll } = useScroll({
    target: whyRef,
    offset: ['start end', 'end start'],
  });
  const whyWatermarkY = useTransform(whyScroll, [0, 1], [-80, 80]);

  /* ── Parallax: CTA watermark ── */
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  });
  const ctaWatermarkY = useTransform(ctaScroll, [0, 1], [-50, 50]);

  return (
    <>
      {/* ═══════════════════ 1. HERO ═══════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950"
      >
        {/* SMEN watermark */}
        <motion.div
          style={{ y: heroWatermarkY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span className="text-[12vw] md:text-[10vw] font-display tracking-[0.15em] text-white/5 uppercase">
            SMEN
          </span>
        </motion.div>

        {/* Full-width hero background image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute inset-0 z-[1] pointer-events-none"
        >
          <img
            src="/images/hero-couple.jpeg"
            alt="Restored confidence and happiness"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-950/50 to-navy-950/60" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroContentOpacity, y: heroContentY }}
          className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center"
        >
          {/* Main headline with text reveal */}
          <RevealHeading
            as="h1"
            text="Your Journey to Better Sexual Health Starts Here"
            className="text-4xl md:text-6xl lg:text-7xl font-heading text-white leading-[1.1] mb-6 justify-center"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 font-body leading-relaxed"
          >
            India's Most Advanced, Non-Invasive &amp; 100% Confidential Clinic
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/contact"
              className="bg-gold-500 text-navy-950 px-8 py-4 font-heading font-semibold tracking-wide text-base hover:bg-gold-400 transition-colors duration-300"
            >
              Book Consultation
            </Link>
            <Link
              to="/treatments/erectile-dysfunction"
              className="border border-white/30 text-white px-8 py-4 font-heading font-semibold tracking-wide text-base hover:border-gold-500 hover:text-gold-500 transition-colors duration-300"
            >
              Explore Treatments
            </Link>
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-body">
            Scroll
          </span>
          <motion.div
            animate={{ height: [16, 32, 16] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px bg-gold-500/50"
          />
        </div>
      </section>

      {/* ═══════════════════ 2. TRUST STRIP ═══════════════════ */}
      <section className="bg-cream border-y border-navy-950/5">
        <div className="max-w-6xl mx-auto px-6 py-6 md:py-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center justify-center md:divide-x md:divide-navy-700/20"
          >
            {trustItems.map((item) => (
              <motion.span
                key={item}
                variants={fadeUp}
                className="px-6 md:px-10 py-3 md:py-0 text-xs uppercase tracking-[0.25em] text-navy-700 font-body font-medium"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ 3. CONDITIONS WE HEAL ═══════════════════ */}
      <section className="bg-white py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section heading with consultation image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div>
              <RevealHeading
                text="Conditions We Heal"
                className="text-3xl md:text-5xl font-heading text-navy-950 mb-6 justify-center lg:justify-start"
              />
              <ExpandingLine className="max-w-[80px] mx-auto lg:mx-0" />
              <ScrollReveal>
                <p className="mt-6 text-base md:text-lg text-navy-700/60 leading-relaxed font-body max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                  Our specialists provide discreet, evidence-based care for the most common sexual health conditions affecting men.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal className="hidden lg:block">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-navy-950/10 border border-navy-950/5">
                  <img
                    src="/images/consultation.jpeg"
                    alt="Doctor consultation"
                    className="w-full h-[300px] object-cover"
                  />
                </div>
                {/* Gold accent bar */}
                <div className="absolute -bottom-3 -left-3 w-24 h-1 bg-gold-500 rounded-full" />
              </div>
            </ScrollReveal>
          </div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
          >
            {conditions.map((cond) => (
              <motion.div
                key={cond.num}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group bg-white border border-navy-950/8 p-8 md:p-10 transition-all duration-300 hover:border-l-2 hover:border-l-gold-500 hover:shadow-lg"
              >
                <span className="block text-5xl md:text-6xl font-heading text-gold-500/20 mb-4 leading-none">
                  {cond.num}
                </span>
                <h3 className="text-xl md:text-2xl font-heading text-navy-950 mb-3">
                  {cond.title}
                </h3>
                <p className="text-sm md:text-base text-navy-700/70 leading-relaxed mb-6 font-body">
                  {cond.desc}
                </p>
                <Link
                  to={cond.link}
                  className="inline-flex items-center gap-2 text-gold-500 font-body font-medium text-sm tracking-wide group-hover:gap-3 transition-all duration-300"
                >
                  Learn More
                  <span className="text-lg">&rarr;</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ 4. WHY CHOOSE SMEN ═══════════════════ */}
      <section
        ref={whyRef}
        className="relative bg-navy-950 py-28 md:py-40 px-6 overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/equipment-screen.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/70" />
        </div>

        {/* Watermark */}
        <motion.div
          style={{ y: whyWatermarkY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1]"
        >
          <span className="text-[15vw] md:text-[8vw] font-display text-gold-500/[0.06] uppercase tracking-[0.1em] whitespace-nowrap">
            Why SMEN?
          </span>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Why items */}
          <div className="max-w-xl">
            <ScrollReveal>
              <span className="text-xs uppercase tracking-[0.3em] text-gold-500 font-body mb-4 block">
                Why Choose Us
              </span>
            </ScrollReveal>
            {whyItems.map((item, i) => (
              <WhyItem
                key={item.num}
                item={item}
                isLast={i === whyItems.length - 1}
              />
            ))}
          </div>

          {/* Right: Tech device showcase */}
          <ScrollReveal className="hidden lg:block">
            <div className="relative">
              {/* Primary image — medical device frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/40 bg-navy-900">
                {/* Device status bar */}
                <div className="flex items-center justify-between px-4 py-2 bg-navy-800/80 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-green-400/70 font-body uppercase tracking-wider">Live</span>
                  </div>
                  <span className="text-[10px] text-white/30 font-body tracking-wide">SMEN Diagnostics</span>
                  <div className="flex items-center gap-1">
                    <span className="w-5 h-[3px] rounded-full bg-gold-500/40" />
                    <span className="w-5 h-[3px] rounded-full bg-gold-500/40" />
                    <span className="w-3 h-[3px] rounded-full bg-gold-500/20" />
                  </div>
                </div>
                <img
                  src="/images/clinic-tech.jpeg"
                  alt="Advanced diagnostic monitoring"
                  className="w-full h-[320px] object-cover"
                />
              </div>

              {/* Floating MRI/scanner image */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-8 -right-6 w-[55%] rounded-xl overflow-hidden border border-gold-500/20 shadow-xl shadow-black/30"
              >
                <img
                  src="/images/equipment-screen.jpeg"
                  alt="MRI and advanced scanning equipment"
                  className="w-full h-[180px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span className="text-[9px] text-white/60 font-body">Advanced Scanning</span>
                </div>
              </motion.div>

              {/* Gold accent corner */}
              <div className="absolute -top-4 -left-4 w-16 h-px bg-gold-500" />
              <div className="absolute -top-4 -left-4 w-px h-16 bg-gold-500" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════ 5. EVIDENCE-BASED TREATMENTS ═══════════════════ */}
      <section className="bg-cream py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top: heading + featured image */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-end mb-16">
            <div className="lg:col-span-3">
              <RevealHeading
                text="Evidence-Based Treatments"
                className="text-3xl md:text-5xl font-heading text-navy-950 mb-6 justify-center lg:justify-start"
              />
              <ExpandingLine className="max-w-[80px] mx-auto lg:mx-0" />
              <ScrollReveal>
                <p className="mt-6 text-base md:text-lg text-navy-700/60 leading-relaxed font-body max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                  Our clinic combines cutting-edge medical technology with proven therapeutic approaches, delivering treatments that are backed by clinical evidence.
                </p>
              </ScrollReveal>
            </div>
            {/* Featured tech image in screen frame */}
            <ScrollReveal className="lg:col-span-2 hidden lg:block">
              <div className="rounded-xl overflow-hidden border border-navy-950/8 shadow-lg bg-white">
                <div className="flex items-center justify-between px-3 py-2 bg-navy-950 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[9px] text-green-400/60 font-body uppercase tracking-wider">Active</span>
                  </div>
                  <span className="text-[9px] text-white/30 font-body tracking-wide">Treatment Bay</span>
                </div>
                <img
                  src="/images/clinic-tech.jpeg"
                  alt="Advanced treatment technology"
                  className="w-full h-[220px] object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Treatment cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {treatments.map((t) => (
              <motion.div key={t.title} variants={fadeUp}>
                <Link
                  to={t.link}
                  className="group block bg-white border border-navy-950/8 p-8 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg rounded-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg md:text-xl font-heading text-navy-950 group-hover:text-gold-600 transition-colors duration-300">
                      {t.title}
                    </h4>
                    <span className="text-gold-500 text-xl shrink-0 ml-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      &rarr;
                    </span>
                  </div>
                  <p className="text-sm text-navy-700/60 leading-relaxed font-body">
                    {t.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ 6. HOW IT WORKS ═══════════════════ */}
      <section className="bg-white py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            {/* Left: doctor image in device frame */}
            <ScrollReveal className="lg:col-span-2 hidden lg:block">
              <div className="sticky top-32">
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-navy-950/10 border border-navy-950/5">
                    <img
                      src="/images/doctor-team.jpeg"
                      alt="Our specialist team"
                      className="w-full h-[480px] object-cover object-top"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 bg-navy-950 rounded-xl px-5 py-3 shadow-lg border border-gold-500/20">
                    <span className="text-gold-500 font-heading text-sm">4-Step Process</span>
                  </div>
                  {/* Gold accent */}
                  <div className="absolute -top-3 -left-3 w-20 h-px bg-gold-500" />
                  <div className="absolute -top-3 -left-3 w-px h-20 bg-gold-500" />
                </div>
              </div>
            </ScrollReveal>

            {/* Right: steps */}
            <div className="lg:col-span-3">
              <div className="mb-12 text-center lg:text-left">
                <RevealHeading
                  text="How It Works"
                  className="text-3xl md:text-5xl font-heading text-navy-950 mb-6 justify-center lg:justify-start"
                />
                <ExpandingLine className="max-w-[80px] mx-auto lg:mx-0" />
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="space-y-8"
              >
                {processSteps.map((step) => (
                  <motion.div
                    key={step.num}
                    variants={fadeUp}
                    className="flex gap-6 items-start group"
                  >
                    {/* Gold number circle */}
                    <div className="w-[60px] h-[60px] rounded-full bg-navy-950 border border-gold-500/40 flex items-center justify-center shrink-0 group-hover:border-gold-500 transition-colors duration-300">
                      <span className="text-base font-heading text-gold-500">
                        {step.num}
                      </span>
                    </div>
                    <div className="pt-1">
                      <h4 className="text-lg md:text-xl font-heading text-navy-950 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm md:text-base text-navy-700/60 leading-relaxed font-body">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 7. CTA BANNER ═══════════════════ */}
      <section
        ref={ctaRef}
        className="relative bg-navy-950 py-28 md:py-36 px-6 overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/happy-man.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/80" />
        </div>

        {/* SMEN watermark */}
        <motion.div
          style={{ y: ctaWatermarkY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-[1]"
        >
          <span className="text-[20vw] md:text-[14vw] font-display text-white/[0.03] uppercase tracking-[0.15em]">
            SMEN
          </span>
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <RevealHeading
            text="Take the First Step"
            className="text-3xl md:text-5xl lg:text-6xl font-heading text-white mb-6 justify-center"
          />

          <ScrollReveal className="mb-12">
            <p className="text-lg md:text-xl text-white/50 font-body">
              Book Your Confidential Consultation Today
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Link
              to="/contact"
              className="inline-block bg-gold-500 text-navy-950 px-10 py-5 font-heading font-semibold tracking-wide text-base hover:bg-gold-400 transition-colors duration-300"
            >
              Book Consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════ 8. TESTIMONIALS ═══════════════════ */}
      <section className="bg-cream py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <RevealHeading
              text="What Our Patients Say"
              className="text-3xl md:text-5xl font-heading text-navy-950 mb-6 justify-center"
            />
            <ExpandingLine className="max-w-[80px] mx-auto" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.initials}
                variants={fadeUp}
                className="bg-white border border-navy-950/5 p-8 md:p-10"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-gold-500 text-sm">
                      &#9733;
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base text-navy-700/70 leading-relaxed font-body mb-8 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Attribution */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-navy-950 flex items-center justify-center">
                    <span className="text-xs font-heading text-gold-500 tracking-wide">
                      {t.initials}
                    </span>
                  </div>
                  <span className="text-sm text-navy-700/50 font-body">
                    {t.city}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
