type CoverLetterContent = {
  subject: string;
  salutation: string;
  paragraphs: string[];
  closing: string;
  signature: string;
};

type CoverLetterData = {
  sender: {
    name: string;
    street: string;
    city: string;
    email: string;
    phone: string;
  };
  recipient: {
    company: string;
    department: string;
    street: string;
    city: string;
  };
  de: CoverLetterContent;
  en: CoverLetterContent;
};

const coverLetterData: CoverLetterData = {
  sender: {
    name: "Tobias Ludwig",
    street: "Lauterbachstr. 37",
    city: "53639 Königswinter",
    email: "Ludwig.tobias105@t-online.de",
    phone: "+49 173 1948 945",
  },
  recipient: {
    company: "BITMARCK Holding GmbH",
    department: "Recruiting — Benedikt Kölsch",
    street: "",
    city: "Essen",
  },
  de: {
    subject: "Bewerbung als Business Analyst IAM (m/w/d)",
    salutation: "Sehr geehrter Herr Kölsch,",
    paragraphs: [
      "mit dieser Bewerbung möchte ich Ihnen zeigen, warum ich die richtige Besetzung für die Position als Business Analyst IAM bei BITMARCK bin — nicht nur auf dem Papier, sondern durch eine eigens für diese Stelle entwickelte Bewerbungswebsite unter bitmarck-bewerbung.tjl-it.de.",
      "Identity & Access Management ist für mich kein abstraktes Thema. Bei der BWI GmbH habe ich über zwei Jahre mit SINA-Systemen gearbeitet — Rollouts koordiniert, Incidents eigenständig bearbeitet und mit secunet bei Tamper-Fällen zusammengearbeitet. Aktuell vertiefe ich diese Expertise bei der Xecuro GmbH, wo ich SINA-basierte Secure Clients administriere, an Sicherheitskonzepten mitarbeite und die interne Prozessoptimierung eigenständig vorantreibe. Dass SINA auch in der Telematikinfrastruktur des Gesundheitswesens zum Einsatz kommt, macht diese Erfahrung direkt übertragbar auf die Arbeit an bitIAM.",
      "Was mich von einem reinen Techniker unterscheidet: Ich habe in jedem meiner Jobs die analytische Seite gesucht und gefunden. Bei der Telekom wurde ich vom Bautrupp ins Messteam geholt, bei Media.com vom Standardtechniker zum Expertentechniker für Schwerfälle befördert, bei Biermann vom Monteur zum Messbauführer. Bei der BHF Group habe ich erstmals eigenständig Geschäftsprozesse analysiert, Anforderungen erhoben und in Software übersetzt. In meinen eigenen Projekten — einem Auth-Service mit RBAC, einem mandantenfähigen CMS, einer Privacy-by-Design App — habe ich Use Cases definiert, Datenmodelle entworfen und Zugriffskonzepte erarbeitet.",
      "Die Rolle bei BITMARCK reizt mich, weil sie genau an dieser Schnittstelle liegt: Anforderungen von Krankenkassen und Telematik verstehen, fachliche Spezifikationen für bitIAM erstellen, Use Cases und Epics entwickeln. Mein technisches Verständnis ermöglicht mir dabei, auf Augenhöhe mit der Entwicklung zu kommunizieren — und meine praktische SINA-Erfahrung gibt mir einen Vorsprung beim Einstieg in den IAM-Kontext.",
      "Ich bin sicherheitsüberprüft, studiere berufsbegleitend Informatik an der FernUniversität Hagen und bin bereit, in die Region Essen umzuziehen. Meine Kündigungsfrist beträgt drei Monate.",
      "Ich freue mich auf ein persönliches Gespräch.",
    ],
    closing: "Mit freundlichen Grüßen",
    signature: "Tobias Ludwig",
  },
  en: {
    subject: "Application as Business Analyst IAM (m/f/d)",
    salutation: "Dear Mr. Kölsch,",
    paragraphs: [
      "With this application, I want to show you why I am the right fit for the Business Analyst IAM position at BITMARCK — not just on paper, but through a dedicated application website built specifically for this role at bitmarck-bewerbung.tjl-it.de.",
      "Identity & Access Management is not an abstract topic for me. At BWI GmbH, I worked with SINA systems for over two years — coordinating rollouts, independently handling incidents, and collaborating with secunet on tamper cases. Currently, I'm deepening this expertise at Xecuro GmbH, where I administer SINA-based Secure Clients, contribute to security concepts, and independently drive internal process optimization. The fact that SINA is also used in the healthcare telematics infrastructure makes this experience directly transferable to working on bitIAM.",
      "What sets me apart from a pure technician: In every job, I sought out and found the analytical side. At Telekom, I was moved from the construction crew to the measurement team. At Media.com, I was promoted from standard technician to expert technician for complex cases. At Biermann, from installer to construction lead. At BHF Group, I independently analyzed business processes, gathered requirements, and translated them into software. In my own projects — an auth service with RBAC, a multi-tenant CMS, a privacy-by-design app — I defined use cases, designed data models, and developed access concepts.",
      "The role at BITMARCK excites me because it sits exactly at this intersection: understanding requirements from health insurers and telematics, creating technical specifications for bitIAM, developing use cases and epics. My technical understanding allows me to communicate at eye level with development — and my practical SINA experience gives me a head start in the IAM context.",
      "I hold a security clearance, am studying Computer Science part-time at FernUniversität Hagen, and am ready to relocate to the Essen area. My notice period is three months.",
      "I look forward to a personal conversation.",
    ],
    closing: "Kind regards",
    signature: "Tobias Ludwig",
  },
};

export function getCoverLetterContent(): CoverLetterData {
  return coverLetterData;
}
