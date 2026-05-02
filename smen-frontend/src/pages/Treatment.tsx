import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ================================================================== */
/*  Scroll-triggered reveal                                            */
/* ================================================================== */
function Reveal({
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
/*  Treatment data                                                     */
/* ================================================================== */
interface TreatmentData {
  title: string;
  abbreviation: string;
  subtitle: string;
  description: string;
  causes: string[];
  symptoms: string[];
  treatments: { name: string; slug: string }[];
  whyChooseUs: string;
  faqs: { question: string; answer: string }[];
}

const treatments: Record<string, TreatmentData> = {
  "erectile-dysfunction": {
    title: "Erectile Dysfunction",
    abbreviation: "ED",
    subtitle:
      "Regain Your Confidence with Advanced, Non-Invasive Treatment",
    description:
      "Erectile dysfunction (ED) is the inability to achieve or maintain an erection firm enough for sexual intercourse. It affects millions of men worldwide and can be caused by physical conditions, psychological factors, or a combination of both.",
    causes: [
      "Cardiovascular disease",
      "Diabetes",
      "Hormonal imbalances",
      "Neurological conditions",
      "Psychological factors (stress, anxiety, depression)",
      "Lifestyle factors (smoking, alcohol, obesity)",
    ],
    symptoms: [
      "Difficulty getting an erection",
      "Trouble maintaining an erection during sexual activity",
      "Reduced sexual desire",
      "Performance anxiety",
    ],
    treatments: [
      { name: "Shock Wave Therapy", slug: "shock-wave-therapy" },
      { name: "HIFEM Therapy", slug: "hifem-therapy" },
      { name: "Stem Cell Therapy", slug: "stem-cells-therapy" },
      { name: "Penile Doppler Diagnosis", slug: "rigi-scan" },
      { name: "Psychosexual Counselling", slug: "psycho-sexual-counselling" },
      { name: "Biofeedback SOT", slug: "biofeedback-sot" },
    ],
    whyChooseUs:
      "At SMEN, we use the latest non-invasive technologies and evidence-based treatments to address erectile dysfunction at its root cause. Our confidential approach ensures you receive personalized care with complete privacy.",
    faqs: [
      {
        question: "Is erectile dysfunction treatment painful?",
        answer:
          "Most of our treatments are completely non-invasive and pain-free. Shock Wave Therapy, for example, uses low-intensity sound waves that patients describe as a mild tingling sensation. We always prioritize your comfort throughout the treatment process.",
      },
      {
        question: "How long before I see results?",
        answer:
          "Many patients notice improvement within 2-3 weeks of starting treatment. However, the full course of treatment typically spans 6-12 weeks depending on the severity and underlying cause. Our specialists will provide a personalized timeline during your consultation.",
      },
      {
        question: "Are the treatments covered by insurance?",
        answer:
          "Coverage varies by provider and plan. We recommend contacting your insurance company to check your specific coverage. Our patient coordinators can also help you navigate insurance questions and provide documentation as needed.",
      },
      {
        question: "Do I need a referral to book a consultation?",
        answer:
          "No referral is needed. You can book a confidential consultation directly through our website or by calling our clinic. We make the process as simple and discreet as possible.",
      },
    ],
  },
  "premature-ejaculation": {
    title: "Premature Ejaculation",
    abbreviation: "PE",
    subtitle: "Effective Solutions for Lasting Confidence",
    description:
      "Premature ejaculation (PE) is when ejaculation occurs sooner than desired during sexual intercourse. It is one of the most common sexual dysfunctions and can cause significant distress and relationship difficulties.",
    causes: [
      "Psychological factors (anxiety, stress)",
      "Hormonal imbalances",
      "Abnormal neurotransmitter levels",
      "Prostate or urethral inflammation",
      "Relationship issues",
      "Early sexual experiences",
    ],
    symptoms: [
      "Ejaculation within 1-3 minutes of penetration",
      "Inability to delay ejaculation",
      "Feelings of frustration or avoidance of intimacy",
      "Decreased sexual satisfaction",
    ],
    treatments: [
      { name: "Behavioral Therapy", slug: "erectile-dysfunction" },
      { name: "Psychosexual Counselling", slug: "psycho-sexual-counselling" },
      { name: "Biofeedback SOT", slug: "biofeedback-sot" },
      { name: "Medication Management", slug: "erectile-dysfunction" },
      { name: "Nerve Stimulation Therapy", slug: "shock-wave-therapy" },
      { name: "Couple Therapy", slug: "psycho-sexual-counselling" },
    ],
    whyChooseUs:
      "SMEN offers a comprehensive, multi-disciplinary approach to premature ejaculation treatment combining the latest medical therapies with psychological support for lasting results.",
    faqs: [
      {
        question: "Is premature ejaculation common?",
        answer:
          "Yes, PE is one of the most common male sexual dysfunctions, affecting approximately 1 in 3 men at some point. It can occur at any age and is nothing to be embarrassed about. Seeking help is the first step toward improvement.",
      },
      {
        question: "Can premature ejaculation be cured permanently?",
        answer:
          "Many men achieve long-lasting improvement through our combined approach of behavioral techniques, counselling, and medical therapy. While individual results vary, our multi-disciplinary method addresses both physical and psychological factors for sustainable outcomes.",
      },
      {
        question: "Will my partner need to be involved in treatment?",
        answer:
          "Partner involvement is optional but can be beneficial, especially in couple therapy sessions. We offer both individual and couple-based treatment plans depending on your preference and comfort level.",
      },
      {
        question: "How confidential is the treatment?",
        answer:
          "Complete confidentiality is a cornerstone of SMEN. All consultations and treatments are conducted in private settings, and your medical records are protected under strict data protection standards.",
      },
    ],
  },
  "delayed-ejaculation": {
    title: "Delayed Ejaculation",
    abbreviation: "DE",
    subtitle: "Understanding & Treating Delayed Ejaculation",
    description:
      "Delayed ejaculation (DE) is a condition where a man requires prolonged sexual stimulation to reach ejaculation, or may be unable to ejaculate at all. It can affect sexual satisfaction and fertility.",
    causes: [
      "Psychological factors",
      "Medications (antidepressants, anti-anxiety drugs)",
      "Nerve damage",
      "Hormonal imbalances",
      "Chronic health conditions",
      "Substance use",
    ],
    symptoms: [
      "Needing extended stimulation to ejaculate",
      "Inability to ejaculate during intercourse",
      "Only able to ejaculate through specific stimulation",
      "Distress about the condition",
    ],
    treatments: [
      { name: "Psychosexual Counselling", slug: "psycho-sexual-counselling" },
      { name: "Medication Adjustment", slug: "erectile-dysfunction" },
      { name: "Behavioral Therapy", slug: "erectile-dysfunction" },
      { name: "Nerve Stimulation Test & Treatment", slug: "shock-wave-therapy" },
      { name: "Hormonal Therapy", slug: "erectile-dysfunction" },
      { name: "Biofeedback SOT", slug: "biofeedback-sot" },
    ],
    whyChooseUs:
      "Our specialists at SMEN provide thorough diagnostic evaluation to identify the specific cause of delayed ejaculation and create a personalized treatment plan using evidence-based approaches.",
    faqs: [
      {
        question: "What causes delayed ejaculation?",
        answer:
          "DE can result from a range of factors including certain medications (especially SSRIs), psychological issues, nerve damage, hormonal imbalances, or chronic health conditions. Our diagnostic process identifies the specific cause in your case to tailor the right treatment.",
      },
      {
        question: "Can medication adjustments help?",
        answer:
          "Yes, if your DE is linked to medication side effects, our specialists can work with your prescribing doctor to explore alternative medications or dosage adjustments that may resolve the issue while maintaining treatment for the underlying condition.",
      },
      {
        question: "How is delayed ejaculation diagnosed?",
        answer:
          "Diagnosis involves a comprehensive evaluation including medical history, physical examination, blood tests for hormonal levels, and potentially nerve stimulation testing. Our thorough approach ensures we identify the root cause accurately.",
      },
      {
        question: "Is delayed ejaculation treatable?",
        answer:
          "Absolutely. With proper diagnosis and a targeted treatment plan, most men experience significant improvement. Our evidence-based approach combines medical treatment with psychological support for the best possible outcomes.",
      },
    ],
  },
};

/* ================================================================== */
/*  Why Choose Us items                                                */
/* ================================================================== */
const whyChooseItems = [
  { number: "01", label: "Non-Invasive" },
  { number: "02", label: "Confidential" },
  { number: "03", label: "Evidence-Based" },
  { number: "04", label: "Latest Technology" },
];

/* ================================================================== */
/*  FAQ Accordion Item                                                 */
/* ================================================================== */
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <Reveal delay={0.06 * index}>
      <div className="border-b border-navy-800/10">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
        >
          <span className="font-heading text-lg text-navy-900 pr-8 leading-snug">
            {question}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-2xl text-gold-500 shrink-0 w-8 h-8 flex items-center justify-center font-light select-none"
          >
            +
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="faq-answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-base leading-relaxed text-navy-800/60 max-w-2xl">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

/* ================================================================== */
/*  Main Component                                                     */
/* ================================================================== */
export default function Treatment() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const data = slug ? treatments[slug] : undefined;

  /* ---- Not found ---- */
  if (!data || !slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream font-body px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <p className="font-heading text-6xl text-gold-500 mb-4">404</p>
          <h1 className="font-heading text-2xl text-navy-900 mb-3">
            Treatment Not Found
          </h1>
          <p className="text-navy-800/60 text-base leading-relaxed mb-8">
            The treatment you are looking for does not exist or may have been
            moved.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-gold-500 text-navy-950 font-semibold text-sm tracking-wide hover:bg-gold-600 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* ============================================================ */}
      {/*  1. HERO                                                      */}
      {/* ============================================================ */}
      <section className="relative bg-navy-950 overflow-hidden py-32 md:py-40 px-6">
        {/* Monogram watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[20vw] font-display font-bold text-white/5 leading-none">
            {data.abbreviation}
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <Reveal>
            <nav className="flex items-center justify-center gap-2 text-sm mb-10 flex-wrap">
              <Link
                to="/"
                className="text-white/50 hover:text-white/80 transition-colors no-underline"
              >
                Home
              </Link>
              <span className="text-white/20">/</span>
              <span className="text-white/50">Conditions We Heal</span>
              <span className="text-white/20">/</span>
              <span className="text-gold-500 font-medium">{data.title}</span>
            </nav>
          </Reveal>

          {/* Heading with text reveal */}
          <Reveal delay={0.1}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-semibold mb-6 leading-tight">
              {data.title}
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. OVERVIEW                                                  */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 mb-8">
              What is{" "}
              <span className="text-gold-500">{data.title}</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-navy-800/70 leading-loose">
              {data.description}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. CAUSES                                                    */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-6 mb-14">
              <h2 className="font-heading text-3xl md:text-4xl text-navy-900 whitespace-nowrap">
                Common Causes
              </h2>
              <div className="h-px flex-1 bg-gold-500/40" />
            </div>
          </Reveal>

          <div className="space-y-0">
            {data.causes.map((cause, i) => (
              <Reveal key={cause} delay={0.06 * i}>
                <div className="flex items-start gap-5 py-4 border-b border-navy-900/5 last:border-b-0">
                  <span className="text-gold-500 text-lg font-medium mt-0.5 shrink-0">
                    --
                  </span>
                  <p className="text-base text-navy-800 leading-relaxed">
                    {cause}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. SYMPTOMS                                                  */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-6 mb-14">
              <h2 className="font-heading text-3xl md:text-4xl text-navy-900 whitespace-nowrap">
                Signs & Symptoms
              </h2>
              <div className="h-px flex-1 bg-gold-500/40" />
            </div>
          </Reveal>

          <div className="space-y-0">
            {data.symptoms.map((symptom, i) => (
              <Reveal key={symptom} delay={0.06 * i}>
                <div className="flex items-start gap-5 py-4 border-b border-navy-900/5 last:border-b-0">
                  <span className="text-gold-500 text-lg font-semibold mt-0.5 shrink-0">
                    &#10003;
                  </span>
                  <p className="text-base text-navy-800 leading-relaxed">
                    {symptom}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. TREATMENT APPROACH                                        */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 text-center mb-14">
              Our <span className="text-gold-500">Treatment</span> Approach
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.treatments.map((treatment, i) => (
              <Reveal key={treatment.name} delay={0.06 * i}>
                <Link
                  to={`/therapies/${treatment.slug}`}
                  className="block no-underline group"
                >
                  <motion.div
                    className="relative border border-navy-900/8 py-7 px-6 bg-white transition-colors duration-300 group-hover:border-gold-500/30 overflow-hidden"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Gold left accent on hover */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                    <h3 className="font-heading text-lg text-navy-900 group-hover:text-gold-600 transition-colors duration-300">
                      {treatment.name}
                    </h3>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. WHY CHOOSE SMEN                                           */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 text-center mb-6">
              Why Choose <span className="text-gold-500">SMEN</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base text-navy-800/60 text-center max-w-2xl mx-auto leading-relaxed mb-16">
              {data.whyChooseUs}
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {whyChooseItems.map((item, i) => (
              <Reveal key={item.label} delay={0.08 * i}>
                <div className="text-center">
                  <p className="font-heading text-5xl md:text-6xl text-gold-500/30 mb-3 leading-none">
                    {item.number}
                  </p>
                  <p className="text-sm font-semibold text-navy-900 uppercase tracking-widest">
                    {item.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. CTA                                                       */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-6 bg-navy-950 text-center relative overflow-hidden">
        {/* Subtle monogram in CTA */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[15vw] font-display font-bold text-white/[0.02] leading-none">
            SMEN
          </span>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Don't Let {data.title} Hold You Back
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-white/50 leading-relaxed mb-10 max-w-xl mx-auto">
              Take the first step toward reclaiming your confidence and
              well-being. Our specialists are ready to help.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-gold-500 text-navy-950 font-semibold text-base tracking-wide hover:bg-gold-600 transition-colors"
            >
              Book Your Consultation
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  8. FAQ                                                       */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-4xl text-navy-900 text-center mb-14">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div>
            {data.faqs.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
