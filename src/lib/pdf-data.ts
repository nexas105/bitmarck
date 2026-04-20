// PDF CV Data — single source of truth for PDF content
// Based on .planning/research/CV.json

export type Experience = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  details: string[];
};

export type Education = {
  degree: string;
  institution: string;
  start: string;
  end: string;
};

export type Project = {
  name: string;
  type: string;
  details: string[];
};

export type Volunteering = {
  organization: string;
  role: string;
  details: string[];
};

export type CvData = {
  personalInformation: {
    name: string;
    birthDate: string;
    birthPlace: string;
    nationality: string;
    maritalStatus: string;
    address: {
      street: string;
      postalCode: string;
      city: string;
      country: string;
    };
    contact: {
      email: string;
      phone: string;
      website: string;
      github: string;
    };
  };
  profile: {
    summary: string;
    strengths: string[];
  };
  technicalSkills: {
    frontend: string[];
    backend: string[];
    languages: string[];
    databases: string[];
    devops: string[];
    concepts: string[];
    other: string[];
  };
  spokenLanguages: Record<string, string>;
  professionalExperience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: string[];
  volunteering: Volunteering[];
  interests: string[];
};

const cvData: CvData = {
  personalInformation: {
    name: "Tobias Ludwig",
    birthDate: "1994-08-09",
    birthPlace: "Troisdorf",
    nationality: "Deutsch",
    maritalStatus: "Ledig",
    address: {
      street: "Lauterbachstr. 37",
      postalCode: "53639",
      city: "Königswinter",
      country: "Deutschland",
    },
    contact: {
      email: "Ludwig.tobias105@t-online.de",
      phone: "+49 173 19 480 45",
      website: "www.tobiasjonas-ludwig.de",
      github: "github.com/nexas105",
    },
  },

  profile: {
    summary:
      "IT-Fachkraft mit 10+ Jahren Erfahrung an der Schnittstelle zwischen Technik und Fachbereich. Weiterbildung zum Software Developer Expert, laufendes Informatikstudium. Erfahrung mit SINA-Systemen, Anforderungsanalyse und Prozessoptimierung in sicherheitskritischen Umgebungen.",
    strengths: [
      "Schnelle Auffassungsgabe",
      "Hohe Arbeitsmoral und Engagement",
      "Kommunikationsstärke",
      "Kreativität und Innovationsgeist",
      "Eigenverantwortlicher Arbeitsstil",
      "Logisch-analytisches Denken",
    ],
  },

  technicalSkills: {
    frontend: ["React", "Next.js", "Flutter"],
    backend: ["Node.js (Express)", "REST APIs"],
    languages: ["TypeScript", "JavaScript", "Dart", "Java"],
    databases: ["PostgreSQL", "Supabase"],
    devops: ["Docker", "Linux", "Self-Hosting"],
    concepts: ["RLS", "API Design", "Realtime", "Auth Systems"],
    other: ["UI/UX Design", "Analytics", "Automation"],
  },

  spokenLanguages: {
    German: "C2",
    English: "B2",
  },

  professionalExperience: [
    {
      role: "IT-Systemadministrator Secure Client Manager",
      company: "Xecuro GmbH",
      location: "Berlin",
      start: "2025-02",
      end: "heute",
      details: [
        "Administration, Pflege und Weiterentwicklung von SINA-basierten Secure Clients",
        "Härtung von Windows- und Linux-Systemen unter Sicherheitsrichtlinien",
        "Aufbau und Betrieb von IT-Infrastruktur",
        "Analyse und Behebung von Störungen sowie Performanceoptimierung",
        "Mitwirkung an Sicherheitskonzepten",
        "Zusammenarbeit mit Security- und Infrastrukturteams",
        "Bereitstellung von Test- und Integrationsumgebungen",
      ],
    },
    {
      role: "Freelancer — DevOps, Web & IT-Beratung",
      company: "Selbstständig",
      start: "2026-01",
      end: "heute",
      details: [
        "Webentwicklung und Hosting für Kunden",
        "Servereinrichtung und DevOps",
        "Anforderungsgespräche und Projektplanung",
        "Eigenverantwortliche Projektsteuerung",
      ],
    },
    {
      role: "IT Client Techniker",
      company: "Persona GmbH",
      location: "Bonn",
      start: "2024-12",
      end: "2025-01",
      details: [
        "Koordination von IT-Terminen und Kunden",
        "Planung und Umsetzung von Infrastrukturprojekten",
        "IT-Support und Problemlösung",
        "Leitung kleiner IT-Projekte",
        "Koordination externer Dienstleister",
        "Optimierung von IT-Prozessen",
        "Dokumentation und Softwareinstallation",
      ],
    },
    {
      role: "Assistent Studioleitung / IT-Berater",
      company: "BHF Group GmbH",
      location: "Königswinter",
      start: "2023-12",
      end: "2024-10",
      details: [
        "Entwicklung einer CRM- und Trainingssoftware",
        "Backend mit Node.js und REST APIs",
        "Datenbankdesign mit PostgreSQL",
        "UI/UX Design",
        "DSGVO-konforme Sicherheitskonzepte",
        "Workflow-Automatisierung",
        "Analytics und Reporting",
        "Organisation und Personalplanung",
      ],
    },
    {
      role: "IT-Service Techniker",
      company: "BWI GmbH",
      location: "Bonn",
      start: "2021-04",
      end: "2023-09",
      details: [
        "IT-Infrastrukturprojekte für BMVg",
        "Installation und Konfiguration von Systemen (Cisco, LANCOM, VLAN)",
        "Ticketbasierter Support (IBM Maximo)",
        "Arbeit mit sicherheitskritischen Systemen (SINA)",
        "Dokumentation und Prozessoptimierung",
      ],
    },
    {
      role: "Messbauführer Fernmeldetechnik",
      company: "Biermann Telekommunikationstechnik",
      start: "2018-07",
      end: "2021-03",
      details: [
        "Planung und Organisation von Tiefbauarbeiten",
        "Koordination externer Firmen",
        "Fehleranalyse im Kupfernetz",
        "Führung von Monteurteams",
        "Technische Dokumentation",
      ],
    },
    {
      role: "IT-Service Techniker Netzebene 4",
      company: "Media.com GmbH",
      start: "2016-09",
      end: "2018-03",
      details: [
        "Wartung von Koaxialnetzen",
        "Analyse von Signalstörungen",
        "Optimierung von Netzqualität (MER, BER)",
        "Zusammenarbeit mit Fachabteilungen",
      ],
    },
    {
      role: "Service Techniker Glasfaser",
      company: "Deutsche Telekom",
      start: "2014-07",
      end: "2016-03",
      details: [
        "Glasfaserverlegung und Netzwerkausbau",
        "Spleißarbeiten und Installation",
        "Messungen und Qualitätssicherung",
        "Fehlerbehebung und Wartung",
      ],
    },
  ],

  projects: [
    {
      name: "Next CMS",
      type: "Fullstack",
      details: [
        "Eigenes Headless CMS mit Next.js",
        "Supabase Integration (Auth, DB, Storage)",
        "Rollenbasierte Zugriffe (RLS)",
        "Auto-Install Script",
        "Docker Self-Hosting",
      ],
    },
    {
      name: "Partner App",
      type: "Mobile",
      details: [
        "Flutter App für Paare",
        "Realtime Chat und Media Sharing",
        "Push Notifications (FCM/APNs)",
        "Supabase Backend",
      ],
    },
    {
      name: "MyFitCoach PRO",
      type: "Fullstack",
      details: [
        "Coaching Plattform",
        "Flutter + Next.js",
        "Strapi Backend",
        "Realtime Features",
        "Analytics",
      ],
    },
    {
      name: "Logbuch App",
      type: "Mobile",
      details: [
        "Strukturierte Datenerfassung",
        "Flutter + Supabase",
        "Formularlogik + API Integration",
      ],
    },
    {
      name: "Auth API Service",
      type: "Backend",
      details: [
        "Node.js Auth Service",
        "JWT + RBAC",
        "PostgreSQL + Prisma",
      ],
    },
    {
      name: "MPA Nutrition Shop",
      type: "Fullstack",
      details: [
        "Eigenes Shopsystem",
        "Zahlungs- und Versandintegration",
        "Marketing & Analytics",
      ],
    },
    {
      name: "DBFV Wettkampfsoftware",
      type: "Ehrenamt",
      details: [
        "Wettkampfsoftware für DBFV",
        "Bewertungssystem für Jury",
        "Athleten- und Wettkampfdatenverwaltung",
      ],
    },
  ],

  education: [
    {
      degree: "B.Sc. Informatik",
      institution: "Fernuni Hagen",
      start: "2024-10",
      end: "heute",
    },
    {
      degree: "Software Developer Expert",
      institution: "IU",
      start: "2023-01",
      end: "2024-10",
    },
    {
      degree: "IT-Systemelektroniker",
      institution: "Telekom",
      start: "2011-01",
      end: "2014-01",
    },
  ],

  certifications: [
    "ITIL",
    "SINA CORE",
    "SINA BASICS",
    "DevOps",
    "Datenbanken",
    "Linux System Admin",
    "SAP ERP Grundkurs",
    "Qualitätssicherung im Softwareprozess",
    "Grundlagen der industriellen Softwaretechnik",
    "Fitness Trainer B",
    "Ernährungsberater",
    "LANCOM",
    "FTTH Glasfaser",
  ],

  volunteering: [
    {
      organization: "DBFV",
      role: "Software Entwickler",
      details: [
        "Entwicklung einer Wettkampfsoftware",
        "Bewertungssystem für Jury",
        "Verwaltung von Athleten- und Wettkampfdaten",
      ],
    },
  ],

  interests: [
    "Softwareentwicklung",
    "IT-Security",
    "Fitness",
    "Kochen",
    "Reisen",
  ],
};

export function getCvData(): CvData {
  return cvData;
}
