// Locale-Typen
export type Locale = "de" | "en";

// Site-Konfiguration
export interface SiteConfig {
  title: string;
  description: string;
  image: string;
  url: string;
  locale: Locale;
  ogLocale: string; // "de_DE" | "en_US"
}

// Navigation
export interface NavLink {
  label: string;
  href: string;
}

export interface HeaderContent {
  navLinks: NavLink[];
  cta: {
    label: string;
    href: string;
  };
}

// Hero-Sektion
export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

// Dienstleistungen
export interface ServiceItem {
  icon: string; // Icon-Name oder SVG-Referenz
  title: string;
  description: string;
}

export interface ServicesContent {
  sectionTitle: string;
  sectionSubtitle: string;
  items: ServiceItem[];
}

// Profil / Über mich
export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ProfileContent {
  sectionTitle: string;
  introduction: string;
  experienceSummary: string;
  technicalStack: SkillCategory[];
  softSkills: string[];
  competencyHighlights: string[];
}

// Zeitstrahl
export interface TimelineEntry {
  period: string; // z.B. "2020 – 2023"
  role: string; // z.B. "Senior Systemadministrator"
  company: string; // z.B. "Startup GmbH"
  description: string; // Beschreibung der Tätigkeiten und Projekte
}

export interface TimelineContent {
  sectionTitle: string;
  entries: TimelineEntry[];
}

// So funktioniert's
export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface HowItWorksContent {
  sectionTitle: string;
  sectionSubtitle: string;
  steps: ProcessStep[];
}

// FAQ
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  sectionTitle: string;
  sectionSubtitle: string;
  items: FAQItem[];
}

// Kontakt
export interface ContactContent {
  sectionTitle: string;
  sectionSubtitle: string;
  emailLabel: string;
  emailAddress: string;
  form: {
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
    requiredFieldError: string;
    invalidEmailError: string;
  };
}

// Footer
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent {
  brandText: string;
  legalLinks: FooterLink[];
  socialLinks: {
    label: string;
    href: string;
    icon: string;
  }[];
  contactInfo: {
    email: string;
  };
  cookieSettingsLabel: string;
  copyright: string;
}

// Cookie Consent
export interface CookieConsentContent {
  title: string;
  description: string;
  acceptAll: string;
  rejectNonEssential: string;
  customize: string;
  save: string;
  categories: {
    necessary: { label: string; description: string };
    analytics: { label: string; description: string };
  };
}

// Danke-Seite
export interface ThankYouContent {
  headline: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
}

// Fehlerseiten
export interface ErrorPageContent {
  headline: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
}

// Gesamte Locale-Konfiguration
export interface LocaleContent {
  siteConfig: SiteConfig;
  header: HeaderContent;
  hero: HeroContent;
  services: ServicesContent;
  profile: ProfileContent;
  timeline: TimelineContent;
  howItWorks: HowItWorksContent;
  faq: FAQContent;
  contact: ContactContent;
  footer: FooterContent;
  cookieConsent: CookieConsentContent;
  thankYou: ThankYouContent;
  errors: {
    notFound: ErrorPageContent;
    serverError: ErrorPageContent;
  };
}
