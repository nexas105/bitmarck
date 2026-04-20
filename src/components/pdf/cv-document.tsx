import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { join } from "path";
import { getCvData } from "@/lib/pdf-data";
import { colors } from "./pdf-styles";
// Importing pdf-styles triggers Font.register at module level
import "./pdf-styles";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */
const ACCENT = colors.accent;
const TEXT = colors.textPrimary;
const TEXT2 = colors.textSecondary;
const BORDER = colors.border;
const SURFACE = colors.surface;

const PAGE_H_PAD = 30;
const PAGE_V_PAD = 32;
const LEFT_COL = "30%";
const RIGHT_COL = "70%";
const GUTTER = 12;

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */
const s = StyleSheet.create({
  /* Page */
  page: {
    fontFamily: "Inter",
    fontSize: 8.5,
    color: TEXT,
    lineHeight: 1.45,
    paddingTop: PAGE_V_PAD,
    paddingBottom: PAGE_V_PAD,
    paddingHorizontal: PAGE_H_PAD,
  },

  /* ---- HEADER ---- */
  headerWrap: {
    marginBottom: 14,
  },
  accentBar: {
    height: 3,
    backgroundColor: ACCENT,
    marginHorizontal: -PAGE_H_PAD,
    marginTop: -PAGE_V_PAD,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: ACCENT,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  profilePhoto: {
    width: 56,
    height: 56,
    borderRadius: 28,
    objectFit: "cover",
    objectPosition: "center top",
  },
  headerNameBlock: {},
  headerName: {
    fontSize: 20,
    fontWeight: 700,
    color: TEXT,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: 500,
    color: ACCENT,
    marginTop: 3,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  contactLine: {
    fontSize: 7.5,
    color: TEXT2,
    marginBottom: 1.5,
  },

  /* ---- TWO-COLUMN LAYOUT ---- */
  columns: {
    flexDirection: "row",
    flexGrow: 1,
  },
  colLeft: {
    width: LEFT_COL,
    paddingRight: GUTTER,
  },
  colRight: {
    width: RIGHT_COL,
    paddingLeft: GUTTER,
    borderLeftWidth: 0.75,
    borderLeftColor: BORDER,
  },

  /* ---- SECTION HEADINGS ---- */
  sectionHead: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: ACCENT,
    marginTop: 12,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
  },
  sectionHeadFirst: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: ACCENT,
    marginTop: 0,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
  },

  /* ---- PROFILE ---- */
  profileText: {
    fontSize: 8,
    color: TEXT2,
    lineHeight: 1.55,
  },

  /* ---- STRENGTHS ---- */
  strengthRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 1.5,
  },
  strengthDot: {
    fontSize: 6,
    color: ACCENT,
    marginRight: 4,
    marginTop: 1,
  },
  strengthText: {
    fontSize: 8,
    color: TEXT,
  },

  /* ---- SKILLS ---- */
  skillGroup: {
    marginBottom: 4,
  },
  skillLabel: {
    fontSize: 7.5,
    fontWeight: 700,
    color: TEXT,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  skillValue: {
    fontSize: 7.5,
    color: TEXT2,
    lineHeight: 1.4,
  },

  /* ---- LANGUAGES ---- */
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  langLabel: {
    fontSize: 8,
    color: TEXT,
  },
  langLevel: {
    fontSize: 8,
    color: TEXT2,
    fontWeight: 500,
  },

  /* ---- CERTIFICATIONS ---- */
  certItem: {
    fontSize: 7.5,
    color: TEXT2,
    marginBottom: 1.5,
  },

  /* ---- EXPERIENCE ---- */
  expEntry: {
    marginBottom: 7,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },
  expRole: {
    fontSize: 9,
    fontWeight: 700,
    color: TEXT,
    flexShrink: 1,
    maxWidth: "76%",
  },
  expDate: {
    fontSize: 7.5,
    color: TEXT2,
    fontWeight: 500,
    textAlign: "right",
  },
  expCompany: {
    fontSize: 8,
    color: ACCENT,
    fontWeight: 500,
    marginBottom: 2,
  },
  bullet: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 1,
    paddingLeft: 2,
  },
  bulletDot: {
    fontSize: 7,
    color: TEXT2,
    marginRight: 4,
    marginTop: 0.5,
  },
  bulletText: {
    fontSize: 8,
    color: TEXT,
    flexShrink: 1,
  },

  /* ---- EDUCATION ---- */
  eduEntry: {
    marginBottom: 5,
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 700,
    color: TEXT,
  },
  eduMeta: {
    fontSize: 7.5,
    color: TEXT2,
  },

  /* ---- PROJECTS ---- */
  projEntry: {
    marginBottom: 5,
  },
  projHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
  },
  projName: {
    fontSize: 8.5,
    fontWeight: 700,
    color: TEXT,
  },
  projBadge: {
    fontSize: 6.5,
    color: ACCENT,
    fontWeight: 500,
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
    marginLeft: 5,
  },
  projDetail: {
    fontSize: 7.5,
    color: TEXT2,
    marginLeft: 2,
    marginBottom: 0.5,
  },

  /* ---- VOLUNTEERING ---- */
  volEntry: {
    marginBottom: 4,
  },
  volRole: {
    fontSize: 8.5,
    fontWeight: 700,
    color: TEXT,
  },
  volOrg: {
    fontSize: 7.5,
    color: TEXT2,
    marginBottom: 1,
  },

  /* ---- INTERESTS ---- */
  interestsText: {
    fontSize: 8,
    color: TEXT2,
    lineHeight: 1.5,
  },

  /* ---- PAGE 2 HEADER STRIP ---- */
  page2Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: ACCENT,
  },
  page2Name: {
    fontSize: 11,
    fontWeight: 700,
    color: TEXT,
  },
  page2Label: {
    fontSize: 8,
    color: TEXT2,
  },
  page2Content: {
    flexDirection: "column",
  },
  page2SubsectionGap: {
    marginTop: 6,
  },
});

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function formatDate(d: string): string {
  if (d === "heute" || d === "present") return "heute";
  const [year, month] = d.split("-");
  const months = [
    "Jan", "Feb", "Mär", "Apr", "Mai", "Jun",
    "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                            */
/* ------------------------------------------------------------------ */
function SectionTitle({ children, first = false }: { children: string; first?: boolean }) {
  return <Text style={first ? s.sectionHeadFirst : s.sectionHead}>{children}</Text>;
}

function BulletItem({ text }: { text: string }) {
  return (
    <View style={s.bullet}>
      <Text style={s.bulletDot}>{"--"}</Text>
      <Text style={s.bulletText}>{text}</Text>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/*  Document                                                           */
/* ------------------------------------------------------------------ */
export function CvDocument() {
  const cv = getCvData();
  const { contact } = cv.personalInformation;

  // Split experience across pages — 5 on page 1, rest on page 2
  const page1Experience = cv.professionalExperience.slice(0, 5);
  const page2Experience = cv.professionalExperience.slice(5);

  return (
    <Document title="Tobias Ludwig - CV" author="Tobias Ludwig">
      {/* ========== PAGE 1 ========== */}
      <Page size="A4" style={s.page}>
        {/* Accent top bar */}
        <View style={s.accentBar} />

        {/* Header */}
        <View style={s.headerWrap}>
          <View style={s.headerRow}>
            <View style={s.headerLeft}>
              <Image
                src={join(process.cwd(), "public/tobias-ludwig.jpg")}
                style={s.profilePhoto}
              />
              <View>
                <Text style={s.headerName}>{cv.personalInformation.name}</Text>
              </View>
            </View>
            <View style={s.headerRight}>
              <Text style={s.contactLine}>{contact.email}</Text>
              <Text style={s.contactLine}>{contact.phone}</Text>
              <Text style={s.contactLine}>{contact.website}</Text>
              <Text style={s.contactLine}>{contact.github}</Text>
            </View>
          </View>
        </View>

        {/* Two-column body */}
        <View style={s.columns}>
          {/* ---- LEFT COLUMN ---- */}
          <View style={s.colLeft}>
            {/* Profile */}
            <SectionTitle first>Profil</SectionTitle>
            <Text style={s.profileText}>{cv.profile.summary}</Text>

            {/* Strengths */}
            <SectionTitle>Stärken</SectionTitle>
            {cv.profile.strengths.map((str, i) => (
              <View key={i} style={s.strengthRow}>
                <Text style={s.strengthDot}>{"●"}</Text>
                <Text style={s.strengthText}>{str}</Text>
              </View>
            ))}

            {/* Technical Skills */}
            <SectionTitle>Technische Skills</SectionTitle>
            {Object.entries(cv.technicalSkills).map(([group, skills]) => (
              <View key={group} style={s.skillGroup}>
                <Text style={s.skillLabel}>
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </Text>
                <Text style={s.skillValue}>{skills.join(", ")}</Text>
              </View>
            ))}

            {/* Languages */}
            <SectionTitle>Sprachen</SectionTitle>
            {Object.entries(cv.spokenLanguages).map(([lang, level]) => (
              <View key={lang} style={s.langRow}>
                <Text style={s.langLabel}>
                  {lang === "German" ? "Deutsch" : "Englisch"}
                </Text>
                <Text style={s.langLevel}>{level}</Text>
              </View>
            ))}

            {/* Certifications */}
            <SectionTitle>Zertifikate</SectionTitle>
            {cv.certifications.map((cert, i) => (
              <Text key={i} style={s.certItem}>
                {"·  "}{cert}
              </Text>
            ))}
          </View>

          {/* ---- RIGHT COLUMN ---- */}
          <View style={s.colRight}>
            <SectionTitle first>Berufserfahrung</SectionTitle>
            {page1Experience.map((exp, i) => (
              <View key={i} style={s.expEntry}>
                <View style={s.expHeader}>
                  <Text style={s.expRole}>{exp.role}</Text>
                  <Text style={s.expDate}>
                    {formatDate(exp.start)} – {formatDate(exp.end)}
                  </Text>
                </View>
                <Text style={s.expCompany}>
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ""}
                </Text>
                {exp.details.slice(0, 5).map((d, j) => (
                  <BulletItem key={j} text={d} />
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>

      {/* ========== PAGE 2 ========== */}
      <Page size="A4" style={s.page}>
        {/* Slim continuation header */}
        <View style={s.page2Header}>
          <Text style={s.page2Name}>Tobias Ludwig</Text>
          <Text style={s.page2Label}>Seite 2 / 2</Text>
        </View>

        {/* Page 2 should continue with primary content first (no sidebar split). */}
        <View style={s.page2Content}>
          <SectionTitle first>Berufserfahrung (Forts.)</SectionTitle>
          {page2Experience.map((exp, i) => (
            <View key={i} style={s.expEntry}>
              <View style={s.expHeader}>
                <Text style={s.expRole}>{exp.role}</Text>
                <Text style={s.expDate}>
                  {formatDate(exp.start)} – {formatDate(exp.end)}
                </Text>
              </View>
              <Text style={s.expCompany}>
                {exp.company}
                {exp.location ? ` · ${exp.location}` : ""}
              </Text>
              {exp.details.map((d, j) => (
                <BulletItem key={j} text={d} />
              ))}
            </View>
          ))}

          <SectionTitle>Projekte</SectionTitle>
          {cv.projects.map((proj, i) => (
            <View key={i} style={s.projEntry}>
              <View style={s.projHeader}>
                <Text style={s.projName}>{proj.name}</Text>
                <Text style={s.projBadge}>{proj.type}</Text>
              </View>
              {proj.details.map((d, j) => (
                <Text key={j} style={s.projDetail}>
                  {"·  "}{d}
                </Text>
              ))}
            </View>
          ))}

          <View style={s.page2SubsectionGap}>
            <SectionTitle>Ausbildung</SectionTitle>
            {cv.education.map((edu, i) => (
              <View key={i} style={s.eduEntry}>
                <Text style={s.eduDegree}>{edu.degree}</Text>
                <Text style={s.eduMeta}>
                  {edu.institution} · {formatDate(edu.start)} – {formatDate(edu.end)}
                </Text>
              </View>
            ))}
          </View>

          <SectionTitle>Ehrenamt</SectionTitle>
          {cv.volunteering.map((vol, i) => (
            <View key={i} style={s.volEntry}>
              <Text style={s.volRole}>{vol.role}</Text>
              <Text style={s.volOrg}>{vol.organization}</Text>
              {vol.details.map((d, j) => (
                <BulletItem key={j} text={d} />
              ))}
            </View>
          ))}

          <SectionTitle>Interessen</SectionTitle>
          <Text style={s.interestsText}>{cv.interests.join(", ")}</Text>
        </View>
      </Page>
    </Document>
  );
}
