import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ──────────────────────────────────────────────────────────────────

interface NavChild {
  label: string;
  path: string;
}

interface NavItem {
  label: string;
  path?: string;
  children?: NavChild[];
  megaMenu?: boolean;
}

// ─── Navigation Data ────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  {
    label: "Our Team",
    children: [
      { label: "Our Doctors", path: "/doctors" },
      { label: "Our Therapists", path: "/therapists" },
    ],
  },
  {
    label: "Conditions We Heal",
    children: [
      { label: "Erectile Dysfunction", path: "/treatments/erectile-dysfunction" },
      { label: "Premature Ejaculation", path: "/treatments/premature-ejaculation" },
      { label: "Delayed Ejaculation", path: "/treatments/delayed-ejaculation" },
    ],
  },
  {
    label: "Diagnostics",
    children: [
      { label: "Penile Doppler", path: "/diagnostics/penile-doppler" },
      { label: "USG Abdomen", path: "/diagnostics/usg-abdomen" },
      { label: "USG Scrotum & Doppler", path: "/diagnostics/usg-scrotum" },
      { label: "Uroflowmetry", path: "/diagnostics/uroflowmetry" },
      { label: "EEG", path: "/diagnostics/eeg" },
      { label: "ECG", path: "/diagnostics/ecg" },
      { label: "Nerve Stimulation Test", path: "/diagnostics/ncv-ncs" },
    ],
  },
  {
    label: "Therapies",
    megaMenu: true,
    children: [
      { label: "ED Therapy", path: "/therapies/erectile-dysfunction" },
      { label: "PE Therapy", path: "/therapies/premature-ejaculation" },
      { label: "DE Therapy", path: "/therapies/delayed-ejaculation" },
      { label: "Vaginismus", path: "/therapies/vaginismus" },
      { label: "Porn Addiction", path: "/therapies/porn-addiction" },
      { label: "Compulsive Masturbation", path: "/therapies/compulsive-masturbation" },
      { label: "Unconsummated Relationship", path: "/therapies/unconsummated-relationship" },
      { label: "Low Desire", path: "/therapies/low-desire" },
      { label: "FSAD", path: "/therapies/fsad" },
      { label: "Female Anorgasmia", path: "/therapies/female-anorgasmia" },
      { label: "Bride Checkup", path: "/therapies/bride-checkup" },
      { label: "Couple Sex Problems", path: "/therapies/couple-sex-problems" },
      { label: "Shock Wave Therapy", path: "/therapies/shock-wave-therapy" },
      { label: "HIFEM Therapy", path: "/therapies/hifem-therapy" },
      { label: "Rigi Scan", path: "/therapies/rigi-scan" },
      { label: "Biofeedback SOT", path: "/therapies/biofeedback-sot" },
      { label: "Stem Cells Therapy", path: "/therapies/stem-cells-therapy" },
      { label: "Psycho Sexual Counselling", path: "/therapies/psycho-sexual-counselling" },
    ],
  },
  { label: "Contact Us", path: "/contact" },
];

// ─── Framer Motion Variants ─────────────────────────────────────────────────

const dropdownVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: 4,
    transition: { duration: 0.15, ease: "easeIn" as const },
  },
};

const mobileMenuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, damping: 30, stiffness: 300 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring" as const, damping: 34, stiffness: 350 },
  },
};

const mobileBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.04 * i, duration: 0.3, ease: "easeOut" as const },
  }),
};

// ─── Chevron Icon ───────────────────────────────────────────────────────────

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={className}
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Desktop Nav Item ───────────────────────────────────────────────────────

function DesktopNavItem({
  item,
  isActive,
  scrolled,
}: {
  item: NavItem;
  isActive: boolean;
  scrolled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasChildren = !!item.children;
  const location = useLocation();

  const isChildActive = item.children?.some(
    (c) => location.pathname === c.path
  );

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (hasChildren) setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const activeState = isActive || isChildActive;

  const textColorClass = scrolled
    ? activeState
      ? "text-gold-500"
      : "text-navy-800 hover:text-navy-950"
    : activeState
      ? "text-gold-400"
      : "text-white/80 hover:text-white";

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {hasChildren ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-1 text-xs font-medium uppercase tracking-[0.12em] font-display bg-transparent border-none cursor-pointer font-body py-2 transition-colors duration-300 ease-out ${textColorClass}`}
          aria-expanded={open}
          aria-haspopup="true"
        >
          {item.label}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <ChevronDown />
          </motion.span>
        </button>
      ) : (
        <Link
          to={item.path!}
          className={`relative text-xs font-medium uppercase tracking-[0.12em] font-display py-2 transition-colors duration-300 ease-out no-underline ${textColorClass}`}
        >
          {item.label}
        </Link>
      )}

      {/* Active indicator */}
      {activeState && (
        <motion.div
          layoutId="active-nav-indicator"
          className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold-500"
          transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
        />
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute top-full mt-3 bg-white rounded-lg shadow-lg shadow-black/8 border border-gray-100 z-50 ${
              item.megaMenu
                ? "right-0 w-[540px] grid grid-cols-3 gap-0 p-3"
                : "left-1/2 -translate-x-1/2 min-w-[220px] py-2"
            }`}
          >
            {item.children!.map((child) => (
              <DropdownLink
                key={child.path}
                to={child.path}
                label={child.label}
                isMega={!!item.megaMenu}
                onClick={() => setOpen(false)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Dropdown Link ──────────────────────────────────────────────────────────

function DropdownLink({
  to,
  label,
  isMega,
  onClick,
}: {
  to: string;
  label: string;
  isMega: boolean;
  onClick: () => void;
}) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block transition-colors duration-200 ease-out no-underline ${
        isMega
          ? `px-3 py-2.5 text-xs rounded-md ${
              active
                ? "text-gold-600 font-semibold bg-gold-100/60"
                : "text-navy-800 hover:text-gold-600 hover:bg-gray-50"
            }`
          : `px-5 py-2.5 text-sm ${
              active
                ? "text-gold-600 font-semibold"
                : "text-navy-700 hover:text-gold-600 hover:bg-gray-50"
            }`
      }`}
    >
      {label}
    </Link>
  );
}

// ─── Mobile Accordion Item ──────────────────────────────────────────────────

function MobileNavItem({
  item,
  index,
  isActive,
  onClose,
}: {
  item: NavItem;
  index: number;
  isActive: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const hasChildren = !!item.children;

  const labelClass = `text-xs font-medium uppercase tracking-[0.12em] font-display ${
    isActive ? "text-gold-500" : "text-navy-900"
  }`;

  return (
    <motion.div
      custom={index}
      variants={mobileLinkVariants}
      initial="hidden"
      animate="visible"
    >
      {hasChildren ? (
        <>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center justify-between w-full py-4 px-6 bg-transparent border-none cursor-pointer border-b border-gray-100 font-body"
            aria-expanded={expanded}
          >
            <span className={labelClass}>{item.label}</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center text-navy-700"
            >
              <ChevronDown />
            </motion.span>
          </button>
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden bg-gray-50/60"
              >
                {item.children!.map((child) => {
                  const childActive = location.pathname === child.path;
                  return (
                    <Link
                      key={child.path}
                      to={child.path}
                      onClick={onClose}
                      className={`block py-3 pl-10 pr-6 text-sm no-underline border-b border-gray-100/60 transition-colors duration-200 ${
                        childActive
                          ? "text-gold-600 font-semibold"
                          : "text-navy-700"
                      }`}
                    >
                      {child.label}
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          to={item.path!}
          onClick={onClose}
          className={`block py-4 px-6 no-underline border-b border-gray-100 ${labelClass}`}
        >
          {item.label}
        </Link>
      )}
    </motion.div>
  );
}

// ─── Hamburger Button ───────────────────────────────────────────────────────

function HamburgerButton({
  isOpen,
  onClick,
  scrolled,
}: {
  isOpen: boolean;
  onClick: () => void;
  scrolled: boolean;
}) {
  const barColor = isOpen ? "bg-navy-800" : scrolled ? "bg-navy-800" : "bg-white";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="flex flex-col items-center justify-center gap-[5px] bg-transparent border-none cursor-pointer p-2 z-[60] relative"
    >
      <span
        className={`block w-5 h-[1.5px] rounded-full transition-all duration-300 origin-center ${barColor}`}
        style={{
          transform: isOpen ? "translateY(3.25px) rotate(45deg)" : "none",
        }}
      />
      <span
        className={`block w-5 h-[1.5px] rounded-full transition-all duration-300 ${barColor}`}
        style={{
          opacity: isOpen ? 0 : 1,
          transform: isOpen ? "scaleX(0)" : "none",
        }}
      />
      <span
        className={`block w-5 h-[1.5px] rounded-full transition-all duration-300 origin-center ${barColor}`}
        style={{
          transform: isOpen ? "translateY(-3.25px) rotate(-45deg)" : "none",
        }}
      />
    </button>
  );
}

// ─── Main Navbar ────────────────────────────────────────────────────────────

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = useCallback(
    (item: NavItem): boolean => {
      if (item.path) return location.pathname === item.path;
      if (item.children)
        return item.children.some((c) => location.pathname === c.path);
      return false;
    },
    [location.pathname]
  );

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring" as const, damping: 24, stiffness: 260 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-gray-200/60 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`max-w-[1440px] mx-auto px-8 flex items-center justify-between transition-all duration-300 ease-out ${
            scrolled ? "h-20" : "h-28"
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-6">
            <img
              src="/smen-logo.png"
              alt="SMEN"
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-14" : "h-20"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden xl:flex items-center gap-5"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <DesktopNavItem
                key={item.label}
                item={item}
                isActive={isActive(item)}
                scrolled={scrolled}
              />
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Desktop CTA */}
            <Link
              to="/contact"
              className={`hidden xl:inline-flex items-center text-xs font-semibold uppercase tracking-widest px-6 py-2.5 rounded-none border transition-all duration-300 ease-out no-underline ${
                scrolled
                  ? "border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white"
                  : "border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-navy-900"
              }`}
            >
              Book Consultation
            </Link>

            {/* Mobile Hamburger */}
            <div className="xl:hidden flex">
              <HamburgerButton
                isOpen={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
                scrolled={scrolled}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={mobileBackdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[51]"
            />

            {/* Panel */}
            <motion.nav
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              aria-label="Mobile navigation"
              className="fixed top-0 right-0 bottom-0 w-[min(85vw,380px)] bg-white z-[52] overflow-y-auto flex flex-col shadow-2xl"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <Link to="/" onClick={() => setMobileOpen(false)}>
                  <img
                    src="/smen-logo.png"
                    alt="SMEN"
                    className="h-12 w-auto"
                  />
                </Link>
                <HamburgerButton
                  isOpen={true}
                  onClick={() => setMobileOpen(false)}
                  scrolled={true}
                />
              </div>

              {/* Mobile links */}
              <div className="flex-1 pt-2">
                {NAV_ITEMS.map((item, i) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    index={i}
                    isActive={isActive(item)}
                    onClose={() => setMobileOpen(false)}
                  />
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="p-6 border-t border-gray-100">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 text-xs font-semibold uppercase tracking-widest border border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white transition-all duration-300 no-underline"
                >
                  Book Consultation
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
