import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

/* ───────────────────────── data types ───────────────────────── */
interface TherapyData {
  title: string;
  subtitle: string;
  description: string;
  approach: string[];
  benefits: string[];
  sessionInfo: string;
  whoIsItFor: string;
}

/* ───────────────────────── therapy data ───────────────────────── */
const therapies: Record<string, TherapyData> = {
  "erectile-dysfunction": {
    title: "Erectile Dysfunction Therapy",
    subtitle: "Comprehensive Therapeutic Solutions for ED",
    description:
      "Our specialized therapy program for erectile dysfunction combines psychological counseling with evidence-based behavioral techniques to address both the mental and physical aspects of ED.",
    approach: [
      "Cognitive Behavioral Therapy (CBT)",
      "Sensate Focus Exercises",
      "Mindfulness-Based Stress Reduction",
      "Performance Anxiety Management",
      "Relationship Communication Skills",
    ],
    benefits: [
      "Address root psychological causes",
      "Improve intimate confidence",
      "Reduce performance anxiety",
      "Strengthen relationship bonds",
      "Long-lasting results",
    ],
    sessionInfo: "45-60 minute sessions, typically 8-12 sessions",
    whoIsItFor:
      "Men experiencing ED related to psychological factors such as stress, anxiety, depression, or relationship issues.",
  },
  "premature-ejaculation": {
    title: "Premature Ejaculation Therapy",
    subtitle: "Build Lasting Control & Confidence",
    description:
      "Our PE therapy program uses proven behavioral techniques and psychological strategies to help you gain better control and improve sexual satisfaction for both partners.",
    approach: [
      "Start-Stop Technique Training",
      "Squeeze Technique",
      "Pelvic Floor Exercises",
      "Mindfulness & Body Awareness",
      "Cognitive Restructuring",
    ],
    benefits: [
      "Improved ejaculatory control",
      "Increased sexual confidence",
      "Better partner satisfaction",
      "Reduced anxiety",
      "Sustainable improvement",
    ],
    sessionInfo: "45-60 minute sessions, typically 6-10 sessions",
    whoIsItFor:
      "Men experiencing premature ejaculation, whether lifelong or acquired, who want to develop better control naturally.",
  },
  "delayed-ejaculation": {
    title: "Delayed Ejaculation Therapy",
    subtitle: "Overcome Barriers to Natural Response",
    description:
      "Our therapy for delayed ejaculation helps identify and address the underlying psychological and behavioral factors preventing normal ejaculatory response.",
    approach: [
      "Graduated Stimulation Techniques",
      "Anxiety Reduction Strategies",
      "Mindfulness Training",
      "Partner Involvement Exercises",
      "Medication Review Consultation",
    ],
    benefits: [
      "Improved sexual response",
      "Reduced frustration",
      "Enhanced intimacy",
      "Better understanding of triggers",
      "Personalized approach",
    ],
    sessionInfo: "45-60 minute sessions, typically 8-12 sessions",
    whoIsItFor:
      "Men who experience significant delay or inability to ejaculate during partnered sexual activity.",
  },
  vaginismus: {
    title: "Vaginismus Therapy",
    subtitle: "Gentle, Compassionate Treatment for Couples",
    description:
      "Vaginismus therapy helps couples overcome involuntary vaginal muscle tightening that makes penetration painful or impossible. Our approach is gentle, gradual, and deeply supportive.",
    approach: [
      "Graduated Exposure Therapy",
      "Relaxation Techniques",
      "Pelvic Floor Physiotherapy",
      "Couple Communication Training",
      "Desensitization Exercises",
    ],
    benefits: [
      "Pain-free intimacy",
      "Improved relationship satisfaction",
      "Increased confidence",
      "Better body awareness",
      "Supportive environment",
    ],
    sessionInfo: "45-60 minute sessions, typically 10-16 sessions",
    whoIsItFor:
      "Couples where the female partner experiences involuntary vaginal muscle spasm making intercourse difficult or impossible.",
  },
  "porn-addiction": {
    title: "Porn Addiction Therapy",
    subtitle: "Break Free from Compulsive Behavior",
    description:
      "Our specialized therapy helps individuals overcome problematic pornography use that interferes with daily life, relationships, and sexual health.",
    approach: [
      "Cognitive Behavioral Therapy",
      "Motivational Interviewing",
      "Trigger Identification & Management",
      "Healthy Coping Strategies",
      "Relationship Repair Work",
    ],
    benefits: [
      "Freedom from compulsive behavior",
      "Improved real-life intimacy",
      "Better mental health",
      "Restored relationship trust",
      "Sustainable recovery",
    ],
    sessionInfo: "50-60 minute sessions, typically 12-20 sessions",
    whoIsItFor:
      "Individuals whose pornography consumption has become compulsive and is negatively affecting their life, relationships, or sexual function.",
  },
  "compulsive-masturbation": {
    title: "Compulsive Masturbation Therapy",
    subtitle: "Regain Control Over Your Behavior",
    description:
      "Our therapy program addresses compulsive masturbation behavior through a combination of behavioral strategies, psychological support, and lifestyle modifications.",
    approach: [
      "Behavioral Modification Techniques",
      "Cognitive Restructuring",
      "Stress Management",
      "Healthy Outlet Development",
      "Self-Monitoring Strategies",
    ],
    benefits: [
      "Regained self-control",
      "Improved daily functioning",
      "Better sexual health",
      "Reduced shame and guilt",
      "Healthier relationships",
    ],
    sessionInfo: "45-60 minute sessions, typically 10-16 sessions",
    whoIsItFor:
      "Individuals whose masturbation habits have become compulsive and are interfering with their daily life or relationships.",
  },
  "unconsummated-relationship": {
    title: "Unconsummated Relationship Therapy",
    subtitle: "Compassionate Support for Couples",
    description:
      "Our specialized therapy helps couples who have been unable to consummate their relationship, addressing physical, psychological, and relational barriers with sensitivity and expertise.",
    approach: [
      "Couples Counseling",
      "Graduated Intimacy Exercises",
      "Anxiety Management",
      "Sexual Education",
      "Individual Therapy as Needed",
    ],
    benefits: [
      "Achieve physical intimacy",
      "Reduced anxiety and fear",
      "Stronger relationship bond",
      "Better communication",
      "Judgment-free support",
    ],
    sessionInfo: "60 minute sessions, typically 12-20 sessions",
    whoIsItFor:
      "Couples who have been unable to consummate their marriage or relationship due to physical or psychological barriers.",
  },
  "low-desire": {
    title: "Low Desire Therapy",
    subtitle: "Reignite Your Intimate Connection",
    description:
      "Our therapy for low sexual desire helps identify and address the complex factors behind reduced libido, restoring healthy sexual interest and improving relationship satisfaction.",
    approach: [
      "Hormone Assessment Referral",
      "Psychological Assessment",
      "Sensate Focus Therapy",
      "Stress & Lifestyle Optimization",
      "Relationship Enhancement",
    ],
    benefits: [
      "Renewed sexual interest",
      "Better hormonal balance",
      "Improved relationship quality",
      "Reduced relationship conflict",
      "Holistic well-being",
    ],
    sessionInfo: "45-60 minute sessions, typically 8-14 sessions",
    whoIsItFor:
      "Individuals experiencing persistently low sexual desire that causes personal distress or relationship difficulties.",
  },
  fsad: {
    title: "Female Sexual Arousal Disorder (FSAD) Therapy",
    subtitle: "Expert Care for Women's Sexual Health",
    description:
      "Our FSAD therapy helps women who experience difficulty with sexual arousal, providing evidence-based treatment in a comfortable, confidential environment.",
    approach: [
      "Psychoeducation",
      "Mindfulness-Based Techniques",
      "Sensate Focus Exercises",
      "Body Image Work",
      "Partner Communication Training",
    ],
    benefits: [
      "Improved arousal response",
      "Greater sexual satisfaction",
      "Enhanced body awareness",
      "Better intimate communication",
      "Increased confidence",
    ],
    sessionInfo: "45-60 minute sessions, typically 8-12 sessions",
    whoIsItFor:
      "Women experiencing persistent difficulty with sexual arousal that affects their sexual satisfaction and quality of life.",
  },
  "female-anorgasmia": {
    title: "Female Anorgasmia Therapy",
    subtitle: "Achieving Sexual Fulfillment",
    description:
      "Our therapy program helps women who have difficulty reaching orgasm, using proven techniques to enhance sexual response and satisfaction.",
    approach: [
      "Directed Masturbation Therapy",
      "Sensate Focus",
      "Cognitive Behavioral Techniques",
      "Pelvic Floor Awareness",
      "Communication Skills Training",
    ],
    benefits: [
      "Improved orgasmic response",
      "Greater sexual confidence",
      "Enhanced pleasure awareness",
      "Better partner communication",
      "Personalized approach",
    ],
    sessionInfo: "45-60 minute sessions, typically 8-14 sessions",
    whoIsItFor:
      "Women who experience difficulty or inability to achieve orgasm despite adequate stimulation and desire.",
  },
  "bride-checkup": {
    title: "Pre-Marital Health Checkup",
    subtitle: "Start Your Journey Together with Confidence",
    description:
      "Our comprehensive pre-marital health checkup ensures couples start their married life with complete knowledge about their health status, including sexual health, fertility, and general wellness.",
    approach: [
      "Complete Health Screening",
      "Sexual Health Assessment",
      "Fertility Evaluation",
      "Genetic Compatibility Testing",
      "Pre-Marital Counseling",
    ],
    benefits: [
      "Complete health awareness",
      "Early detection of issues",
      "Fertility assessment",
      "Peace of mind",
      "Professional guidance",
    ],
    sessionInfo: "Comprehensive evaluation over 1-2 visits",
    whoIsItFor:
      "Couples planning to get married who want a comprehensive health assessment before beginning their married life.",
  },
  "couple-sex-problems": {
    title: "Couple Sexual Problems Therapy",
    subtitle: "Strengthen Your Intimate Bond",
    description:
      "Our couples therapy addresses sexual difficulties within the relationship context, helping partners communicate better, understand each other's needs, and rebuild intimacy.",
    approach: [
      "Couples Assessment",
      "Communication Training",
      "Sensate Focus Exercises",
      "Conflict Resolution",
      "Intimacy Rebuilding",
    ],
    benefits: [
      "Improved communication",
      "Renewed intimacy",
      "Better understanding",
      "Resolved conflicts",
      "Stronger relationship",
    ],
    sessionInfo: "60-75 minute sessions, typically 10-16 sessions",
    whoIsItFor:
      "Couples experiencing sexual difficulties that affect their relationship satisfaction and emotional connection.",
  },
  "shock-wave-therapy": {
    title: "Shock Wave Therapy",
    subtitle: "Non-Invasive Regenerative Treatment",
    description:
      "Low-intensity extracorporeal shock wave therapy (LI-ESWT) uses acoustic waves to improve blood flow and stimulate tissue regeneration in the penis, offering a drug-free solution for erectile dysfunction.",
    approach: [
      "Low-Intensity Acoustic Waves",
      "Targeted Penile Application",
      "Neovascularization Stimulation",
      "Tissue Regeneration",
      "Progressive Treatment Protocol",
    ],
    benefits: [
      "Non-invasive procedure",
      "No medication needed",
      "Improves natural erections",
      "Long-lasting results",
      "Minimal side effects",
    ],
    sessionInfo: "15-20 minute sessions, typically 6-12 sessions over several weeks",
    whoIsItFor:
      "Men with erectile dysfunction, particularly those who prefer non-pharmacological treatment or have not responded well to medications.",
  },
  "hifem-therapy": {
    title: "HIFEM Therapy",
    subtitle: "High-Intensity Focused Electromagnetic Stimulation",
    description:
      "HIFEM therapy uses focused electromagnetic energy to stimulate pelvic floor muscles, improving strength and control. This cutting-edge technology offers a non-invasive approach to treating various sexual health conditions.",
    approach: [
      "Electromagnetic Muscle Stimulation",
      "Pelvic Floor Strengthening",
      "Progressive Intensity Protocol",
      "Automated Treatment Sessions",
      "Post-Treatment Assessment",
    ],
    benefits: [
      "Completely non-invasive",
      "No downtime required",
      "Strengthens pelvic muscles",
      "Improves urinary control",
      "Enhances sexual function",
    ],
    sessionInfo: "28-minute sessions, typically 6 sessions over 3 weeks",
    whoIsItFor:
      "Men and women seeking non-invasive pelvic floor strengthening for improved sexual function and urinary control.",
  },
  "rigi-scan": {
    title: "RigiScan Assessment",
    subtitle: "Objective Erectile Function Measurement",
    description:
      "RigiScan is an advanced diagnostic device that continuously monitors and records penile rigidity and tumescence during sleep, providing objective data about erectile function.",
    approach: [
      "Overnight Monitoring",
      "Tumescence Recording",
      "Rigidity Measurement",
      "Digital Data Analysis",
      "Comprehensive Report Generation",
    ],
    benefits: [
      "Objective measurement",
      "Distinguishes psychological vs physical ED",
      "Non-invasive monitoring",
      "Detailed data analysis",
      "Guides treatment decisions",
    ],
    sessionInfo: "Overnight monitoring (1-2 nights)",
    whoIsItFor:
      "Men with erectile dysfunction where the cause (psychological vs physical) needs to be determined for appropriate treatment planning.",
  },
  "biofeedback-sot": {
    title: "Biofeedback SOT",
    subtitle: "Mind-Body Connection for Sexual Health",
    description:
      "Biofeedback therapy uses electronic monitoring to help you gain awareness and control over physiological functions. For sexual health, it focuses on pelvic floor control, relaxation, and stress management.",
    approach: [
      "Electronic Physiological Monitoring",
      "Real-Time Visual Feedback",
      "Pelvic Floor Training",
      "Relaxation Response Training",
      "Progressive Skill Building",
    ],
    benefits: [
      "Improved body awareness",
      "Better pelvic floor control",
      "Reduced performance anxiety",
      "Enhanced relaxation ability",
      "Drug-free approach",
    ],
    sessionInfo: "30-45 minute sessions, typically 8-12 sessions",
    whoIsItFor:
      "Individuals seeking to improve sexual function through enhanced body awareness and control, particularly for PE and ED.",
  },
  "stem-cells-therapy": {
    title: "Stem Cell Therapy",
    subtitle: "Regenerative Medicine for Sexual Health",
    description:
      "Stem cell therapy represents the frontier of regenerative medicine for sexual health. This innovative treatment uses the body's own healing potential to restore tissue function and improve sexual performance.",
    approach: [
      "Stem Cell Harvesting",
      "Targeted Injection Therapy",
      "Tissue Regeneration Protocol",
      "Follow-Up Monitoring",
      "Combined Therapy Integration",
    ],
    benefits: [
      "Natural tissue regeneration",
      "Long-lasting improvement",
      "Minimally invasive",
      "Uses body's own cells",
      "Cutting-edge technology",
    ],
    sessionInfo: "Single or multiple sessions based on evaluation",
    whoIsItFor:
      "Men with erectile dysfunction seeking advanced regenerative treatment options, particularly those who have not responded to conventional therapies.",
  },
  "psycho-sexual-counselling": {
    title: "Psychosexual Counselling",
    subtitle: "Professional Support for Sexual Well-being",
    description:
      "Psychosexual counselling provides a safe, confidential space to explore and address sexual concerns, relationship difficulties, and psychological factors affecting sexual health.",
    approach: [
      "Individual Assessment",
      "Cognitive Behavioral Therapy",
      "Psychodynamic Exploration",
      "Behavioral Assignments",
      "Regular Progress Review",
    ],
    benefits: [
      "Safe, non-judgmental space",
      "Address root causes",
      "Improved sexual confidence",
      "Better relationships",
      "Lasting psychological well-being",
    ],
    sessionInfo: "50-60 minute sessions, frequency based on individual needs",
    whoIsItFor:
      "Anyone experiencing sexual difficulties, concerns about sexual behavior, relationship issues affecting intimacy, or psychological barriers to sexual well-being.",
  },
};

/* ───────────────────── abbreviation helper ───────────────────── */
function getAbbreviation(slug: string): string {
  const map: Record<string, string> = {
    "erectile-dysfunction": "ED",
    "premature-ejaculation": "PE",
    "delayed-ejaculation": "DE",
    vaginismus: "VG",
    "porn-addiction": "PA",
    "compulsive-masturbation": "CM",
    "unconsummated-relationship": "UR",
    "low-desire": "LD",
    fsad: "FSAD",
    "female-anorgasmia": "FA",
    "bride-checkup": "PMC",
    "couple-sex-problems": "CSP",
    "shock-wave-therapy": "SWT",
    "hifem-therapy": "HIFEM",
    "rigi-scan": "RS",
    "biofeedback-sot": "BFS",
    "stem-cells-therapy": "SCT",
    "psycho-sexual-counselling": "PSC",
  };
  return map[slug] || slug.charAt(0).toUpperCase();
}

function formatSlug(s: string): string {
  return s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ───────────────────── animation variants ───────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/* ───────────────────── scroll section wrapper ───────────────────── */
function ScrollReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────── stagger container wrapper ───────────────────── */
function StaggerWrap({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ───────────────────── why choose data ───────────────────── */
const whyChooseItems = [
  { number: "01", title: "Non-Invasive", desc: "Gentle, effective treatments without surgery or downtime." },
  { number: "02", title: "Confidential", desc: "Your privacy is protected at every step of your journey." },
  { number: "03", title: "Evidence-Based", desc: "All treatments are grounded in the latest clinical research." },
  { number: "04", title: "Expert Team", desc: "Qualified specialists with years of experience in sexual health." },
];

/* ───────────────────── not found ───────────────────── */
function TherapyNotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl text-white mb-4"
        >
          Therapy Not Found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-body text-warm-gray leading-relaxed mb-10"
        >
          The therapy you are looking for does not exist or may have been moved.
          Please explore our available therapies or contact us for assistance.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-gold-500 text-navy-950 font-body font-semibold text-sm tracking-wide uppercase hover:bg-gold-400 transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

const Therapy: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? therapies[slug] : undefined;

  if (!data) return <TherapyNotFound />;

  const abbreviation = getAbbreviation(slug!);

  return (
    <div className="bg-navy-950 min-h-screen">
      {/* ─────────── 1. HERO ─────────── */}
      <section className="relative overflow-hidden bg-navy-950 pt-32 pb-24 px-6 md:pt-40 md:pb-32">
        {/* monogram watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
          <span className="text-[12vw] font-display font-bold text-white/5 leading-none">
            {abbreviation}
          </span>
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          {/* breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-body text-sm text-warm-gray mb-10 tracking-wide"
          >
            <Link to="/" className="text-gold-500 hover:text-gold-400 transition-colors">
              Home
            </Link>
            <span className="mx-2 text-warm-gray/50">/</span>
            <span className="text-warm-gray">Therapies</span>
            <span className="mx-2 text-warm-gray/50">/</span>
            <span className="text-white">{formatSlug(slug!)}</span>
          </motion.nav>

          {/* heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight"
          >
            {data.title}
          </motion.h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="font-body text-lg md:text-xl text-warm-gray max-w-xl mx-auto leading-relaxed"
          >
            {data.subtitle}
          </motion.p>
        </div>
      </section>

      {/* ─────────── 2. OVERVIEW ─────────── */}
      <section className="py-20 md:py-28 px-6">
        <ScrollReveal className="max-w-3xl mx-auto">
          <p className="font-body text-lg md:text-xl text-slate-300 leading-[1.8] tracking-wide">
            {data.description}
          </p>
        </ScrollReveal>
      </section>

      {/* ─────────── 3. OUR APPROACH ─────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-14">
              <h2 className="font-heading text-3xl md:text-4xl text-white tracking-tight">
                Our Approach
              </h2>
              <div className="flex-1 h-px bg-gold-500/30" />
            </div>
          </ScrollReveal>

          <StaggerWrap className="space-y-0">
            {data.approach.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex items-baseline gap-4 py-5 border-b border-white/5 last:border-b-0"
              >
                <span className="text-gold-500 font-body text-lg leading-none shrink-0">
                  --
                </span>
                <p className="font-body text-base md:text-lg text-slate-300 leading-relaxed">
                  {item}
                </p>
              </motion.div>
            ))}
          </StaggerWrap>
        </div>
      </section>

      {/* ─────────── 4. BENEFITS ─────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-14">
              <h2 className="font-heading text-3xl md:text-4xl text-white tracking-tight">
                Benefits
              </h2>
              <div className="flex-1 h-px bg-gold-500/30" />
            </div>
          </ScrollReveal>

          <StaggerWrap className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {data.benefits.map((benefit, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex items-start gap-3 py-3"
              >
                <span className="text-gold-500 font-body text-lg leading-tight shrink-0 mt-0.5">
                  &#10003;
                </span>
                <p className="font-body text-base md:text-lg text-slate-300 leading-relaxed">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </StaggerWrap>
        </div>
      </section>

      {/* ─────────── 5. WHO IS THIS FOR ─────────── */}
      <section className="py-20 md:py-28 px-6 bg-cream">
        <ScrollReveal className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-navy-950 tracking-tight text-center mb-10">
            Who Is This For
          </h2>
          <div className="border border-navy-950/10 rounded-sm p-8 md:p-12 text-center">
            <p className="font-body text-base md:text-lg text-navy-800 leading-[1.8]">
              {data.whoIsItFor}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ─────────── 6. SESSION INFO ─────────── */}
      <section className="py-20 md:py-28 px-6">
        <ScrollReveal className="max-w-xl mx-auto">
          <div className="border border-white/10 rounded-sm p-8 md:p-12 text-center">
            <h2 className="font-heading text-2xl md:text-3xl text-white tracking-tight mb-6">
              Session Information
            </h2>
            <p className="font-body text-lg text-slate-300 leading-relaxed">
              {data.sessionInfo}
            </p>
            <p className="font-body text-sm text-warm-gray mt-6">
              Session frequency and duration may vary based on individual assessment.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ─────────── 7. WHY CHOOSE SMEN ─────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl text-white tracking-tight text-center mb-16">
              Why Choose SMEN
            </h2>
          </ScrollReveal>

          <StaggerWrap className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {whyChooseItems.map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="text-center"
              >
                <span className="block font-heading text-5xl md:text-6xl text-gold-500 mb-4 leading-none">
                  {item.number}
                </span>
                <h3 className="font-heading text-lg text-white mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-warm-gray leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </StaggerWrap>
        </div>
      </section>

      {/* ─────────── 8. CTA ─────────── */}
      <section className="py-20 md:py-28 px-6">
        <ScrollReveal className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white tracking-tight mb-8">
            Start Your Therapy Journey
          </h2>
          <p className="font-body text-lg text-warm-gray leading-relaxed mb-12 max-w-lg mx-auto">
            Take the first step towards a healthier, more confident you.
            Our team is ready to support you every step of the way.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-4 bg-gold-500 text-navy-950 font-body font-semibold text-sm tracking-widest uppercase hover:bg-gold-400 transition-colors"
          >
            Get in Touch
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Therapy;
