import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { getCvData } from "@/lib/pdf-data";
import { colors } from "./pdf-styles";
// Importing pdf-styles triggers Font.register at module level
import "./pdf-styles";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 9,
    color: colors.textPrimary,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 36,
    lineHeight: 1.4,
  },
  headerBar: {
    backgroundColor: colors.accent,
    height: 4,
    marginBottom: 12,
    marginHorizontal: -36,
    marginTop: -32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.accent,
  },
  headerName: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.accent,
    marginTop: 3,
    fontWeight: 500,
  },
  contactBlock: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  contactText: {
    fontSize: 8,
    color: colors.textSecondary,
    marginBottom: 1,
  },
  twoColumn: {
    flexDirection: "row",
    flexGrow: 1,
  },
  leftColumn: {
    width: "33%",
    paddingRight: 14,
  },
  rightColumn: {
    width: "67%",
    paddingLeft: 14,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.accent,
    marginBottom: 5,
    marginTop: 10,
  },
  sectionTitleFirst: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.accent,
    marginBottom: 5,
    marginTop: 0,
  },
  profileText: {
    fontSize: 8,
    color: colors.textSecondary,
    lineHeight: 1.5,
  },
  skillGroup: {
    marginBottom: 4,
  },
  skillLabel: {
    fontSize: 8,
    fontWeight: 500,
    color: colors.textPrimary,
  },
  skillValue: {
    fontSize: 8,
    color: colors.textSecondary,
  },
  certItem: {
    fontSize: 8,
    color: colors.textSecondary,
    marginBottom: 1,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  langLabel: {
    fontSize: 8,
    color: colors.textPrimary,
  },
  langLevel: {
    fontSize: 8,
    color: colors.textSecondary,
  },
  expEntry: {
    marginBottom: 6,
  },
  expRole: {
    fontSize: 9,
    fontWeight: 700,
    color: colors.textPrimary,
  },
  expMeta: {
    fontSize: 8,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  bullet: {
    fontSize: 8,
    color: colors.textPrimary,
    marginLeft: 6,
    marginBottom: 1,
  },
  eduEntry: {
    marginBottom: 4,
  },
  eduDegree: {
    fontSize: 9,
    fontWeight: 500,
    color: colors.textPrimary,
  },
  eduMeta: {
    fontSize: 8,
    color: colors.textSecondary,
  },
  projEntry: {
    marginBottom: 4,
  },
  projName: {
    fontSize: 9,
    fontWeight: 500,
    color: colors.textPrimary,
  },
  projType: {
    fontSize: 8,
    color: colors.accent,
  },
  projDetail: {
    fontSize: 8,
    color: colors.textSecondary,
    marginLeft: 6,
    marginBottom: 1,
  },
  volEntry: {
    marginBottom: 4,
  },
  volRole: {
    fontSize: 9,
    fontWeight: 500,
  },
  volOrg: {
    fontSize: 8,
    color: colors.textSecondary,
  },
  strengthItem: {
    fontSize: 8,
    color: colors.textSecondary,
    marginBottom: 1,
  },
});

function formatDate(d: string): string {
  if (d === "heute" || d === "present") return "heute";
  const [year, month] = d.split("-");
  const months = [
    "Jan",
    "Feb",
    "Mär",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dez",
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export function CvDocument() {
  const cv = getCvData();
  const { contact } = cv.personalInformation;

  // Split experience: first 4 on page 1, rest on page 2
  const page1Experience = cv.professionalExperience.slice(0, 4);
  const page2Experience = cv.professionalExperience.slice(4);

  return (
    <Document title="Tobias Ludwig - CV" author="Tobias Ludwig">
      {/* Page 1: Header + Profile + Skills + Top Experience */}
      <Page size="A4" style={styles.page}>
        {/* Accent bar */}
        <View style={styles.headerBar} />
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerName}>{cv.personalInformation.name}</Text>
            <Text style={styles.headerSubtitle}>Business Analyst IAM</Text>
          </View>
          <View style={styles.contactBlock}>
            <Text style={styles.contactText}>{contact.email}</Text>
            <Text style={styles.contactText}>{contact.phone}</Text>
            <Text style={styles.contactText}>{contact.website}</Text>
            <Text style={styles.contactText}>{contact.github}</Text>
          </View>
        </View>

        {/* Two-column layout */}
        <View style={styles.twoColumn}>
          {/* Left column: Profile, Skills, Languages, Certifications */}
          <View style={styles.leftColumn}>
            {/* Profile */}
            <Text style={styles.sectionTitleFirst}>Profil</Text>
            <Text style={styles.profileText}>{cv.profile.summary}</Text>

            {/* Strengths */}
            <Text style={styles.sectionTitle}>Stärken</Text>
            {cv.profile.strengths.map((s, i) => (
              <Text key={i} style={styles.strengthItem}>
                {s}
              </Text>
            ))}

            {/* Technical Skills */}
            <Text style={styles.sectionTitle}>Technische Skills</Text>
            {Object.entries(cv.technicalSkills).map(([group, skills]) => (
              <View key={group} style={styles.skillGroup}>
                <Text style={styles.skillLabel}>
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </Text>
                <Text style={styles.skillValue}>{skills.join(", ")}</Text>
              </View>
            ))}

            {/* Languages */}
            <Text style={styles.sectionTitle}>Sprachen</Text>
            {Object.entries(cv.spokenLanguages).map(([lang, level]) => (
              <View key={lang} style={styles.langRow}>
                <Text style={styles.langLabel}>
                  {lang === "German" ? "Deutsch" : "Englisch"}
                </Text>
                <Text style={styles.langLevel}>{level}</Text>
              </View>
            ))}

            {/* Certifications */}
            <Text style={styles.sectionTitle}>Zertifikate</Text>
            {cv.certifications.map((cert, i) => (
              <Text key={i} style={styles.certItem}>
                {cert}
              </Text>
            ))}
          </View>

          {/* Right column: Professional Experience */}
          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitleFirst}>Berufserfahrung</Text>
            {page1Experience.map((exp, i) => (
              <View key={i} style={styles.expEntry}>
                <Text style={styles.expRole}>{exp.role}</Text>
                <Text style={styles.expMeta}>
                  {exp.company}
                  {exp.location ? `, ${exp.location}` : ""} |{" "}
                  {formatDate(exp.start)} - {formatDate(exp.end)}
                </Text>
                {exp.details.slice(0, 4).map((d, j) => (
                  <Text key={j} style={styles.bullet}>
                    {"• "}
                    {d}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>

      {/* Page 2: Remaining Experience + Education + Projects + Volunteering */}
      <Page size="A4" style={styles.page} break>
        <View style={styles.twoColumn}>
          {/* Left column: Education + Volunteering */}
          <View style={styles.leftColumn}>
            {/* Education */}
            <Text style={styles.sectionTitleFirst}>Ausbildung</Text>
            {cv.education.map((edu, i) => (
              <View key={i} style={styles.eduEntry}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduMeta}>
                  {edu.institution} | {formatDate(edu.start)} -{" "}
                  {formatDate(edu.end)}
                </Text>
              </View>
            ))}

            {/* Volunteering */}
            <Text style={styles.sectionTitle}>Ehrenamt</Text>
            {cv.volunteering.map((vol, i) => (
              <View key={i} style={styles.volEntry}>
                <Text style={styles.volRole}>{vol.role}</Text>
                <Text style={styles.volOrg}>{vol.organization}</Text>
                {vol.details.map((d, j) => (
                  <Text key={j} style={styles.bullet}>
                    {"• "}
                    {d}
                  </Text>
                ))}
              </View>
            ))}

            {/* Interests */}
            <Text style={styles.sectionTitle}>Interessen</Text>
            <Text style={styles.certItem}>{cv.interests.join(", ")}</Text>
          </View>

          {/* Right column: Remaining experience + Projects */}
          <View style={styles.rightColumn}>
            {/* Remaining experience */}
            <Text style={styles.sectionTitleFirst}>
              Berufserfahrung (Fortsetzung)
            </Text>
            {page2Experience.map((exp, i) => (
              <View key={i} style={styles.expEntry}>
                <Text style={styles.expRole}>{exp.role}</Text>
                <Text style={styles.expMeta}>
                  {exp.company}
                  {exp.location ? `, ${exp.location}` : ""} |{" "}
                  {formatDate(exp.start)} - {formatDate(exp.end)}
                </Text>
                {exp.details.map((d, j) => (
                  <Text key={j} style={styles.bullet}>
                    {"• "}
                    {d}
                  </Text>
                ))}
              </View>
            ))}

            {/* Projects */}
            <Text style={styles.sectionTitle}>Projekte</Text>
            {cv.projects.map((proj, i) => (
              <View key={i} style={styles.projEntry}>
                <Text style={styles.projName}>
                  {proj.name}{" "}
                  <Text style={styles.projType}>({proj.type})</Text>
                </Text>
                {proj.details.map((d, j) => (
                  <Text key={j} style={styles.projDetail}>
                    {"• "}
                    {d}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
