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
    phone: "+49 173 19 480 45",
  },
  recipient: {
    company: "Bitmarck GmbH",
    department: "Personalwesen",
    city: "Essen",
  },
  de: {
    subject: "Bewerbung als Business Analyst IAM",
    salutation: "Sehr geehrte Damen und Herren,",
    paragraphs: [
      "mit großem Interesse bewerbe ich mich auf die Position als Business Analyst IAM bei Bitmarck. Die Verbindung aus technischem Verständnis und analytischer Anforderungsarbeit im Bereich Identity & Access Management entspricht genau meinem beruflichen Profil und meinen Ambitionen.",
      "In meiner bisherigen Laufbahn habe ich umfangreiche Erfahrung im IT-Service und Betrieb sicherheitskritischer Systeme gesammelt -- unter anderem bei der BWI GmbH im Rahmen von Infrastrukturprojekten für das BMVg sowie aktuell bei der Xecuro GmbH in der Administration von SINA-basierten Secure Clients. Dabei habe ich gelernt, komplexe technische Anforderungen zu analysieren, Sicherheitskonzepte mitzugestalten und mit verschiedenen Fachteams effizient zusammenzuarbeiten.",
      "Parallel habe ich mich durch eine Weiterbildung zum Software Developer Expert an der IU und mein laufendes Informatikstudium an der Fernuni Hagen gezielt weiterentwickelt. In eigenen Projekten -- von CRM-Systemen über Auth-Services bis hin zu einem eigenen CMS -- habe ich Anforderungen selbstständig erhoben, technisch umgesetzt und dokumentiert. Diese Kombination aus praktischer IT-Erfahrung und analytischer Softwareentwicklung ermöglicht es mir, die Brücke zwischen Fachbereich und Technik zu schlagen.",
      "Ich bin flexibel einsetzbar, bringe eine hohe Arbeitsmoral mit und freue mich darauf, das IAM-Team bei Bitmarck mit meinem analytischen Denken und meiner technischen Expertise zu verstärken. Meine Verfügbarkeit beträgt 1-3 Monate, und ich bin offen für verschiedene Standortmodelle.",
    ],
    closing: "Mit freundlichen Grüßen",
    signature: "Tobias Ludwig",
  },
  en: {
    subject: "Application as Business Analyst IAM",
    salutation: "Dear Sir or Madam,",
    paragraphs: [
      "I am writing to apply for the Business Analyst IAM position at Bitmarck with great interest. The combination of technical understanding and analytical requirements work in the field of Identity & Access Management aligns perfectly with my professional profile and ambitions.",
      "Throughout my career, I have gained extensive experience in IT service and the operation of security-critical systems -- including infrastructure projects for the German Ministry of Defence at BWI GmbH and currently in the administration of SINA-based Secure Clients at Xecuro GmbH. This experience has taught me to analyze complex technical requirements, contribute to security concepts, and collaborate efficiently with cross-functional teams.",
      "In parallel, I have systematically developed my skills through a Software Developer Expert certification at IU and my ongoing Computer Science degree at Fernuni Hagen. In personal projects -- from CRM systems and auth services to a custom CMS -- I have independently gathered requirements, implemented solutions, and documented results. This combination of hands-on IT experience and analytical software development enables me to bridge the gap between business stakeholders and technical teams.",
      "I am flexible, bring a strong work ethic, and look forward to strengthening the IAM team at Bitmarck with my analytical thinking and technical expertise. My availability is 1-3 months, and I am open to various location arrangements.",
    ],
    closing: "Kind regards",
    signature: "Tobias Ludwig",
  },
};

export function getCoverLetterContent(): CoverLetterData {
  return coverLetterData;
}
