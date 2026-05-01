/**
 * Zentrale Inhaltsverwaltung für die Corporate Website
 * Alle Texte, Links und Konfigurationen – organisiert nach Locale (de/en)
 */

import type { LocaleContent, Locale } from "./types";

// ─── Deutsche Inhalte ────────────────────────────────────────────────────────

export const de: LocaleContent = {
  siteConfig: {
    title: "Jonas Westphal – IT-Beratung, Automatisierung & Cloud Solutions",
    description:
      "IT-Beratung, n8n-Automatisierung, KI-Workflows & Managed Hosting für KMU und Startups. Über 10 Jahre Erfahrung. Jetzt unverbindlich anfragen.",
    image: "/og-image.svg",
    url: "https://www.jonaswestphal.de",
    locale: "de",
    ogLocale: "de_DE",
  },

  header: {
    navLinks: [
      { label: "Start", href: "#hero" },
      { label: "Dienstleistungen", href: "#services" },
      { label: "Über mich", href: "#about" },
      { label: "So funktioniert's", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Kontakt", href: "#contact" },
    ],
    cta: {
      label: "Kostenlos beraten lassen",
      href: "#contact",
    },
  },

  hero: {
    headline: "IT-Beratung & Automatisierung für KMU und Startups",
    subheadline:
      "n8n-Workflows, KI-gestützte Automatisierung und Managed Hosting – damit Sie sich auf Ihr Kerngeschäft konzentrieren können.",
    primaryCta: {
      label: "Jetzt unverbindlich anfragen",
      href: "#contact",
    },
    secondaryCta: {
      label: "Dienstleistungen entdecken",
      href: "#services",
    },
  },

  services: {
    sectionTitle: "Dienstleistungen",
    sectionSubtitle:
      "Maßgeschneiderte IT-Lösungen für Ihr Unternehmen – von n8n-Automatisierung bis Managed Hosting.",
    items: [
      {
        icon: "workflow",
        title: "n8n Workflow-Automatisierung",
        description:
          "Automatisieren Sie Ihre Geschäftsprozesse mit n8n. Ich verbinde Ihre Tools und Systeme zu effizienten, automatisierten Abläufen – ohne manuellen Aufwand.",
      },
      {
        icon: "brain",
        title: "KI-gestützte Workflows",
        description:
          "Intelligente Automatisierung mit künstlicher Intelligenz. Optimieren Sie Ihre Prozesse durch KI-Workflows und steigern Sie die Effizienz Ihres Unternehmens.",
      },
      {
        icon: "rocket",
        title: "Startup-Beratung & IT-Strategie",
        description:
          "Strategische IT-Beratung und Implementierung für Startups. Von der Infrastrukturplanung bis zur Umsetzung – pragmatisch, skalierbar und kosteneffizient.",
      },
      {
        icon: "server",
        title: "Managed Hosting nach Maß",
        description:
          "Individuelle Hosting-Lösungen für Websites, n8n-Instanzen und mehr. Zuverlässig, sicher und auf Ihre Anforderungen zugeschnitten – inklusive Monitoring und Support.",
      },
    ],
  },

  profile: {
    sectionTitle: "Über mich",
    introduction:
      "Ich bin Jonas Westphal, erfahrener Systemadministrator und IT-Berater mit über 10 Jahren Berufserfahrung im Aufbau, Betrieb und der Optimierung von IT-Infrastrukturen. Mein Schwerpunkt liegt auf kleinen bis mittelständischen Unternehmen (KMU) sowie Startups mit bis zu 400 Mitarbeitenden.",
    experienceSummary:
      "Neben meiner Haupttätigkeit biete ich als Selbstständiger IT-Beratung, n8n-Automatisierung und KI-gestützte Workflow-Lösungen an. Mein Ziel: pragmatische, stabile und skalierbare Lösungen, die Kosten senken und Prozesse optimieren.",
    technicalStack: [
      {
        category: "Betriebssysteme",
        skills: ["Windows Server", "Linux (Ubuntu/Debian)"],
      },
      {
        category: "Virtualisierung & Cloud",
        skills: ["VMware", "Proxmox", "Azure", "Hetzner", "Docker"],
      },
      {
        category: "Monitoring & Verwaltung",
        skills: ["Grafana", "Zabbix", "Baramundi"],
      },
      {
        category: "Scripting & Automatisierung",
        skills: ["PowerShell", "Bash", "n8n"],
      },
    ],
    softSkills: [
      "Komplexe technische Themen verständlich für nicht-technische Stakeholder, Management und C-Level erklären",
      "Strukturierte und transparente Arbeitsweise",
      "Fokus auf Kosteneffizienz und langfristige Optimierung",
    ],
    competencyHighlights: [
      "Über 10 Jahre Erfahrung in IT-Infrastruktur",
      "Spezialisiert auf KMU und Startups mit bis zu 400 Mitarbeitenden",
      "Experte für Baramundi Endpoint Management",
      "Erfahrung mit großflächigen Windows-Migrationen",
    ],
  },

  timeline: {
    sectionTitle: "Beruflicher Werdegang",
    entries: [
      {
        period: "Laufend",
        role: "Baramundi-Experte",
        company: "Endpoint Management",
        description:
          "Exzellente Expertise im Bereich Baramundi Endpoint Management: OS-Deployment (Windows Imaging, Autopilot-Alternativen), Softwareverteilung und Automatisierung durch Custom Scripting und Integrationen.",
      },
      {
        period: "Projektbasiert",
        role: "Migrationsspezialist",
        company: "Großflächige Windows-Migrationen",
        description:
          "Planung und Durchführung großflächiger Windows-Migrationen (Windows 7 auf 10, Windows 10 auf 11) in Unternehmensumgebungen mit mehreren hundert Arbeitsplätzen.",
      },
      {
        period: "Projektbasiert",
        role: "Virtualisierungsarchitekt",
        company: "Proxmox-Plattformen",
        description:
          "Aufbau und Betrieb von Proxmox-basierten Virtualisierungsplattformen für zuverlässige und skalierbare Server-Infrastrukturen.",
      },
      {
        period: "Projektbasiert",
        role: "Infrastruktur-Architekt",
        company: "Komplettlösungen",
        description:
          "Implementierung vollständiger IT-Infrastrukturen inklusive Monitoring, Backup-Strategien und Managed Hosting für einen reibungslosen Betrieb.",
      },
      {
        period: "Über 10 Jahre",
        role: "Systemadministrator",
        company: "Startups & Mittelstand",
        description:
          "Erfahrung in Startups und kleinen bis mittelständischen Unternehmen mit bis zu 400 Mitarbeitenden. Pragmatische, stabile und skalierbare Lösungen für wachsende Organisationen.",
      },
    ],
  },

  howItWorks: {
    sectionTitle: "So funktioniert's",
    sectionSubtitle:
      "In drei einfachen Schritten zu Ihrer individuellen IT-Lösung – von der Beratung bis zum laufenden Betrieb.",
    steps: [
      {
        stepNumber: 1,
        title: "Erstgespräch",
        description:
          "Wir besprechen Ihre Anforderungen und Ziele in einem unverbindlichen Erstgespräch. Ich analysiere Ihre aktuelle Situation und identifiziere Optimierungspotenziale.",
      },
      {
        stepNumber: 2,
        title: "Konzept & Umsetzung",
        description:
          "Auf Basis des Erstgesprächs erstelle ich ein maßgeschneidertes Konzept und setze die Lösung professionell um – transparent, termingerecht und kosteneffizient.",
      },
      {
        stepNumber: 3,
        title: "Betrieb & Support",
        description:
          "Nach der Umsetzung stehe ich Ihnen für den laufenden Betrieb und Support zur Verfügung. Monitoring, Wartung und Optimierung – damit Ihre Systeme zuverlässig laufen.",
      },
    ],
  },

  faq: {
    sectionTitle: "Häufig gestellte Fragen",
    sectionSubtitle:
      "Antworten auf die wichtigsten Fragen zu IT-Beratung, Automatisierung und Managed Hosting.",
    items: [
      {
        question: "Welche IT-Dienstleistungen bieten Sie für KMU und Startups an?",
        answer:
          "Ich biete n8n Workflow-Automatisierung, KI-gestützte Prozessoptimierung, IT-Beratung für Startups sowie maßgeschneidertes Managed Hosting an. Darüber hinaus unterstütze ich bei IT-Infrastruktur-Projekten, Baramundi Endpoint Management und Cloud-Migrationen.",
      },
      {
        question: "Was kostet IT-Beratung und Automatisierung?",
        answer:
          "Meine Preise richten sich nach dem Umfang und der Komplexität des Projekts. Nach einem unverbindlichen Erstgespräch erstelle ich Ihnen ein transparentes Angebot. Für laufende Dienstleistungen wie Managed Hosting biete ich monatliche Pauschalen an.",
      },
      {
        question: "Was ist n8n und wie hilft es meinem Unternehmen?",
        answer:
          "n8n ist eine Open-Source-Plattform für Workflow-Automatisierung. Damit lassen sich wiederkehrende Geschäftsprozesse automatisieren, Tools miteinander verbinden und manuelle Aufwände reduzieren. Ich richte n8n-Workflows individuell für Ihre Anforderungen ein – von einfachen Benachrichtigungen bis zu komplexen KI-gestützten Prozessen.",
      },
      {
        question: "Wie schnell sind Sie für ein IT-Projekt verfügbar?",
        answer:
          "Da ich nebenberuflich selbstständig bin, plane ich Projekte sorgfältig und kommuniziere realistische Zeitrahmen. Für dringende Anfragen finden wir gemeinsam eine Lösung. Kontaktieren Sie mich gerne für eine aktuelle Verfügbarkeitsauskunft.",
      },
      {
        question: "Wie läuft die Zusammenarbeit bei einem IT-Projekt ab?",
        answer:
          "Die Zusammenarbeit beginnt mit einem unverbindlichen Erstgespräch, in dem wir Ihre Anforderungen besprechen. Danach erstelle ich ein Konzept, setze die Lösung um und begleite Sie im laufenden Betrieb. Transparenz und regelmäßige Kommunikation sind mir dabei besonders wichtig.",
      },
      {
        question: "Bieten Sie auch Managed Hosting für n8n an?",
        answer:
          "Ja, ich biete individuelles Managed Hosting für n8n Community Instanzen, Websites und andere Anwendungen an. Das Hosting umfasst Einrichtung, Monitoring, Backups, Updates und Support – alles aus einer Hand, zuverlässig und kosteneffizient.",
      },
    ],
  },

  contact: {
    sectionTitle: "Kontakt",
    sectionSubtitle:
      "Haben Sie ein IT-Projekt oder eine Frage zu Automatisierung und Hosting? Schreiben Sie mir – ich melde mich zeitnah bei Ihnen.",
    emailLabel: "Oder direkt per E-Mail:",
    emailAddress: "business@jonaswestphal.de",
    form: {
      namePlaceholder: "Ihr Name",
      emailPlaceholder: "Ihre E-Mail-Adresse",
      messagePlaceholder: "Ihre Nachricht",
      submitLabel: "Nachricht senden",
      successMessage: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.",
      errorMessage:
        "Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt per E-Mail.",
      requiredFieldError: "Dieses Feld ist erforderlich.",
      invalidEmailError: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    },
  },

  footer: {
    brandText: "Jonas Westphal – IT & Cloud Solutions",
    legalLinks: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
    socialLinks: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jonaswestphal",
        icon: "linkedin",
      },
      {
        label: "GitHub",
        href: "https://github.com/jonaswestphal",
        icon: "github",
      },
    ],
    contactInfo: {
      email: "business@jonaswestphal.de",
    },
    cookieSettingsLabel: "Cookie-Einstellungen",
    copyright: `© ${new Date().getFullYear()} Jonas Westphal. Alle Rechte vorbehalten.`,
  },

  cookieConsent: {
    title: "Cookie-Einstellungen",
    description:
      "Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Sie können wählen, welche Cookies Sie zulassen möchten.",
    acceptAll: "Alle akzeptieren",
    rejectNonEssential: "Nur notwendige",
    customize: "Einstellungen anpassen",
    save: "Auswahl speichern",
    categories: {
      necessary: {
        label: "Notwendige Cookies",
        description:
          "Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.",
      },
      analytics: {
        label: "Analyse-Cookies",
        description:
          "Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen, um sie kontinuierlich zu verbessern.",
      },
    },
  },

  thankYou: {
    headline: "Vielen Dank für Ihre Nachricht!",
    message:
      "Ich habe Ihre Anfrage erhalten und melde mich in Kürze persönlich bei Ihnen. In der Regel antworte ich innerhalb von 24 Stunden.",
    ctaLabel: "Zurück zur Startseite",
    ctaHref: "/",
  },

  errors: {
    notFound: {
      headline: "Seite nicht gefunden",
      message:
        "Die angeforderte Seite existiert leider nicht. Möglicherweise wurde sie verschoben oder der Link ist fehlerhaft.",
      ctaLabel: "Zur Startseite",
      ctaHref: "/",
    },
    serverError: {
      headline: "Ein Fehler ist aufgetreten",
      message:
        "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie mich direkt.",
      ctaLabel: "Zur Startseite",
      ctaHref: "/",
    },
  },
};

// ─── English Content ─────────────────────────────────────────────────────────

export const en: LocaleContent = {
  siteConfig: {
    title: "Jonas Westphal – IT Consulting, Automation & Cloud Solutions",
    description:
      "IT consulting, n8n automation, AI workflows & managed hosting for SMEs and startups. Over 10 years of experience. Get in touch today.",
    image: "/og-image.svg",
    url: "https://www.jonaswestphal.de/en/",
    locale: "en",
    ogLocale: "en_US",
  },

  header: {
    navLinks: [
      { label: "Home", href: "#hero" },
      { label: "Services", href: "#services" },
      { label: "About Me", href: "#about" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    cta: {
      label: "Free Consultation",
      href: "#contact",
    },
  },

  hero: {
    headline: "IT Consulting & Automation for SMEs and Startups",
    subheadline:
      "n8n workflows, AI-powered automation, and managed hosting – so you can focus on what matters most.",
    primaryCta: {
      label: "Request a Free Consultation",
      href: "#contact",
    },
    secondaryCta: {
      label: "Explore Services",
      href: "#services",
    },
  },

  services: {
    sectionTitle: "Services",
    sectionSubtitle:
      "Tailored IT solutions for your business – from n8n automation to managed hosting.",
    items: [
      {
        icon: "workflow",
        title: "n8n Workflow Automation",
        description:
          "Automate your business processes with n8n. I connect your tools and systems into efficient, automated workflows – eliminating manual effort.",
      },
      {
        icon: "brain",
        title: "AI-Powered Workflows",
        description:
          "Intelligent automation with artificial intelligence. Optimize your processes through AI workflows and boost your business efficiency.",
      },
      {
        icon: "rocket",
        title: "Startup Consulting & IT Strategy",
        description:
          "Strategic IT consulting and implementation for startups. From infrastructure planning to execution – pragmatic, scalable, and cost-efficient.",
      },
      {
        icon: "server",
        title: "Custom Managed Hosting",
        description:
          "Tailored hosting solutions for websites, n8n instances, and more. Reliable, secure, and customized to your needs – including monitoring and support.",
      },
    ],
  },

  profile: {
    sectionTitle: "About Me",
    introduction:
      "I'm Jonas Westphal, an experienced system administrator and IT consultant with over 10 years of professional experience in designing, operating, and optimizing IT infrastructures. My focus is on small to medium-sized businesses (SMEs) and startups with up to 400 employees.",
    experienceSummary:
      "Alongside my main role, I offer IT consulting, n8n automation, and AI-driven workflow solutions as a freelancer. My goal: pragmatic, stable, and scalable solutions that reduce costs and optimize processes.",
    technicalStack: [
      {
        category: "Operating Systems",
        skills: ["Windows Server", "Linux (Ubuntu/Debian)"],
      },
      {
        category: "Virtualization & Cloud",
        skills: ["VMware", "Proxmox", "Azure", "Hetzner", "Docker"],
      },
      {
        category: "Monitoring & Management",
        skills: ["Grafana", "Zabbix", "Baramundi"],
      },
      {
        category: "Scripting & Automation",
        skills: ["PowerShell", "Bash", "n8n"],
      },
    ],
    softSkills: [
      "Explaining complex technical topics clearly to non-technical stakeholders, management, and C-level executives",
      "Structured and transparent work approach",
      "Focus on cost efficiency and long-term optimization",
    ],
    competencyHighlights: [
      "Over 10 years of experience in IT infrastructure",
      "Specialized in SMEs and startups with up to 400 employees",
      "Expert in Baramundi endpoint management",
      "Experience with large-scale Windows migrations",
    ],
  },

  timeline: {
    sectionTitle: "Professional Background",
    entries: [
      {
        period: "Ongoing",
        role: "Baramundi Expert",
        company: "Endpoint Management",
        description:
          "Excellent expertise in Baramundi endpoint management: OS deployment (Windows imaging, Autopilot alternatives), software distribution, and automation through custom scripting and integrations.",
      },
      {
        period: "Project-based",
        role: "Migration Specialist",
        company: "Large-Scale Windows Migrations",
        description:
          "Planning and execution of large-scale Windows migrations (Windows 7 to 10, Windows 10 to 11) in enterprise environments with several hundred workstations.",
      },
      {
        period: "Project-based",
        role: "Virtualization Architect",
        company: "Proxmox Platforms",
        description:
          "Building and operating Proxmox-based virtualization platforms for reliable and scalable server infrastructures.",
      },
      {
        period: "Project-based",
        role: "Infrastructure Architect",
        company: "Complete Solutions",
        description:
          "Implementation of complete IT infrastructures including monitoring, backup strategies, and managed hosting for seamless operations.",
      },
      {
        period: "Over 10 years",
        role: "System Administrator",
        company: "Startups & SMEs",
        description:
          "Experience in startups and small to medium-sized companies with up to 400 employees. Pragmatic, stable, and scalable solutions for growing organizations.",
      },
    ],
  },

  howItWorks: {
    sectionTitle: "How It Works",
    sectionSubtitle:
      "Three simple steps to your custom IT solution – from consulting to ongoing operations.",
    steps: [
      {
        stepNumber: 1,
        title: "Initial Consultation",
        description:
          "We discuss your requirements and goals in a no-obligation initial consultation. I analyze your current situation and identify optimization potential.",
      },
      {
        stepNumber: 2,
        title: "Concept & Implementation",
        description:
          "Based on the initial consultation, I create a tailored concept and implement the solution professionally – transparent, on schedule, and cost-efficient.",
      },
      {
        stepNumber: 3,
        title: "Operation & Support",
        description:
          "After implementation, I'm available for ongoing operations and support. Monitoring, maintenance, and optimization – so your systems run reliably.",
      },
    ],
  },

  faq: {
    sectionTitle: "Frequently Asked Questions",
    sectionSubtitle:
      "Answers to the most important questions about IT consulting, automation, and managed hosting.",
    items: [
      {
        question: "What IT services do you offer for SMEs and startups?",
        answer:
          "I offer n8n workflow automation, AI-powered process optimization, IT consulting for startups, and custom managed hosting. Additionally, I support IT infrastructure projects, Baramundi endpoint management, and cloud migrations.",
      },
      {
        question: "What does IT consulting and automation cost?",
        answer:
          "My pricing depends on the scope and complexity of the project. After a no-obligation initial consultation, I provide a transparent quote. For ongoing services like managed hosting, I offer monthly flat rates.",
      },
      {
        question: "What is n8n and how can it help my business?",
        answer:
          "n8n is an open-source workflow automation platform. It allows you to automate recurring business processes, connect tools, and reduce manual effort. I set up n8n workflows tailored to your needs – from simple notifications to complex AI-powered processes.",
      },
      {
        question: "How quickly are you available for an IT project?",
        answer:
          "As I work freelance alongside my main role, I plan projects carefully and communicate realistic timelines. For urgent requests, we find a solution together. Feel free to contact me for current availability.",
      },
      {
        question: "How does the collaboration process work for IT projects?",
        answer:
          "The collaboration starts with a no-obligation initial consultation where we discuss your requirements. Then I create a concept, implement the solution, and support you in ongoing operations. Transparency and regular communication are especially important to me.",
      },
      {
        question: "Do you offer managed hosting for n8n?",
        answer:
          "Yes, I offer custom managed hosting for n8n community instances, websites, and other applications. The hosting includes setup, monitoring, backups, updates, and support – all from a single source, reliable and cost-efficient.",
      },
    ],
  },

  contact: {
    sectionTitle: "Contact",
    sectionSubtitle:
      "Have an IT project or a question about automation and hosting? Write to me – I'll get back to you promptly.",
    emailLabel: "Or reach out directly via email:",
    emailAddress: "business@jonaswestphal.de",
    form: {
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email Address",
      messagePlaceholder: "Your Message",
      submitLabel: "Send Message",
      successMessage: "Thank you! Your message has been sent successfully.",
      errorMessage:
        "Unfortunately, an error occurred. Please try again or contact me directly via email.",
      requiredFieldError: "This field is required.",
      invalidEmailError: "Please enter a valid email address.",
    },
  },

  footer: {
    brandText: "Jonas Westphal – IT & Cloud Solutions",
    legalLinks: [
      { label: "Legal Notice", href: "/en/impressum" },
      { label: "Privacy Policy", href: "/en/privacy" },
    ],
    socialLinks: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jonaswestphal",
        icon: "linkedin",
      },
      {
        label: "GitHub",
        href: "https://github.com/jonaswestphal",
        icon: "github",
      },
    ],
    contactInfo: {
      email: "business@jonaswestphal.de",
    },
    cookieSettingsLabel: "Cookie Settings",
    copyright: `© ${new Date().getFullYear()} Jonas Westphal. All rights reserved.`,
  },

  cookieConsent: {
    title: "Cookie Settings",
    description:
      "We use cookies to provide you with the best possible experience on our website. You can choose which cookies you would like to allow.",
    acceptAll: "Accept All",
    rejectNonEssential: "Essential Only",
    customize: "Customize Settings",
    save: "Save Preferences",
    categories: {
      necessary: {
        label: "Essential Cookies",
        description:
          "These cookies are required for the basic functions of the website and cannot be disabled.",
      },
      analytics: {
        label: "Analytics Cookies",
        description:
          "These cookies help us understand how visitors use our website so we can continuously improve it.",
      },
    },
  },

  thankYou: {
    headline: "Thank You for Your Message!",
    message:
      "I have received your inquiry and will get back to you personally shortly. I typically respond within 24 hours.",
    ctaLabel: "Back to Homepage",
    ctaHref: "/en/",
  },

  errors: {
    notFound: {
      headline: "Page Not Found",
      message:
        "The requested page does not exist. It may have been moved or the link may be incorrect.",
      ctaLabel: "Go to Homepage",
      ctaHref: "/en/",
    },
    serverError: {
      headline: "An Error Occurred",
      message:
        "An unexpected error has occurred. Please try again later or contact me directly.",
      ctaLabel: "Go to Homepage",
      ctaHref: "/en/",
    },
  },
};

// ─── Locale-Zugriffsfunktion ─────────────────────────────────────────────────

const content: Record<Locale, LocaleContent> = { de, en };

export function getContent(locale: Locale): LocaleContent {
  return content[locale];
}

// ─── Legacy-Exporte (Abwärtskompatibilität mit Template-Komponenten) ─────────
// Diese Exporte werden entfernt, sobald alle Komponenten auf getContent() umgestellt sind.

export const siteConfig = {
  name: de.siteConfig.title,
  title: de.siteConfig.title,
  description: de.siteConfig.description,
  image: de.siteConfig.image,
  quickLinks: de.header.navLinks,
  legalLinks: de.footer.legalLinks,
};

export const header = {
  name: de.siteConfig.title,
  navLinks: de.header.navLinks,
  cta: de.header.cta,
};

export const hero = {
  headline: de.hero.headline,
  subheadline: de.hero.subheadline,
  primaryCta: de.hero.primaryCta,
  secondaryCta: de.hero.secondaryCta,
  image: {
    src: "/images/hero-illustration.png",
    alt: "IT-Beratung und Automatisierung – Jonas Westphal",
  },
};

export const features = {
  heading: de.services.sectionTitle,
  description: de.services.sectionSubtitle,
  items: de.services.items.map((item) => ({
    icon: item.icon,
    headline: item.title,
    description: item.description,
  })),
};

export const howItWorks = {
  heading: de.howItWorks.sectionTitle,
  description: de.howItWorks.sectionSubtitle,
  items: de.howItWorks.steps.map((step) => ({
    number: String(step.stepNumber),
    headline: step.title,
    description: step.description,
  })),
};

export const faq = {
  heading: de.faq.sectionTitle,
  description: de.faq.sectionSubtitle,
  items: de.faq.items,
};

export const cta = {
  headline: "Bereit für Ihre individuelle IT-Lösung?",
  description: de.hero.subheadline,
  button: {
    label: de.header.cta.label,
    href: de.header.cta.href,
  },
  disclaimer: "Unverbindlich und kostenlos.",
};

export const testimonials = {
  heading: "Das sagen meine Kunden",
  description: "Erfahrungen aus der Zusammenarbeit.",
  items: [] as { quote: string; author: string; company: string; avatar: string; image: string }[],
};

export const problem = {
  headline: "IT-Herausforderungen im Alltag",
  description:
    "Viele KMU und Startups kämpfen mit manuellen Prozessen, unzuverlässiger Infrastruktur und fehlender Automatisierung.",
};

export const solution = {
  headline: "Professionelle IT-Beratung & Automatisierung",
  description:
    "Mit über 10 Jahren Erfahrung biete ich maßgeschneiderte Lösungen für n8n-Automatisierung, Managed Hosting und IT-Infrastruktur.",
};

export const footer = {
  sections: {
    quickLinks: {
      title: "Navigation",
      links: de.header.navLinks,
    },
    legal: {
      title: "Rechtliches",
      links: de.footer.legalLinks,
    },
  },
  copyright: de.footer.copyright,
  social: de.footer.socialLinks.map((link) => ({
    name: link.label,
    icon: link.icon,
    url: link.href,
  })),
};
