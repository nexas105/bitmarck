import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { getCoverLetterContent } from "@/data/cover-letter";
import { colors } from "./pdf-styles";
import "./pdf-styles";

const ACCENT = colors.accent;
const TEXT = colors.textPrimary;
const TEXT2 = colors.textSecondary;
const BORDER = colors.border;

const PAGE_H_PAD = 36;
const PAGE_V_PAD = 32;

const s = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 9.5,
    color: TEXT,
    paddingTop: PAGE_V_PAD,
    paddingBottom: PAGE_V_PAD,
    paddingHorizontal: PAGE_H_PAD,
    lineHeight: 1.55,
  },

  /* ---- HEADER (matching CV) ---- */
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
    marginBottom: 20,
  },
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

  /* ---- SENDER / RECIPIENT ---- */
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  recipientBlock: {},
  recipientText: {
    fontSize: 9,
    color: TEXT,
    lineHeight: 1.5,
  },
  dateBlock: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  dateText: {
    fontSize: 8.5,
    color: TEXT2,
  },

  /* ---- SUBJECT ---- */
  subject: {
    fontSize: 11,
    fontWeight: 700,
    color: TEXT,
    marginBottom: 14,
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
  },

  /* ---- BODY ---- */
  salutation: {
    fontSize: 9.5,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 9.5,
    marginBottom: 8,
    lineHeight: 1.65,
    textAlign: "justify",
    color: TEXT,
  },

  /* ---- CLOSING ---- */
  closing: {
    fontSize: 9.5,
    marginTop: 14,
    marginBottom: 4,
    color: TEXT,
  },
  signature: {
    fontSize: 9.5,
    fontWeight: 700,
    marginTop: 20,
    color: TEXT,
  },

  /* ---- FOOTER ---- */
  footer: {
    position: "absolute",
    bottom: PAGE_V_PAD,
    left: PAGE_H_PAD,
    right: PAGE_H_PAD,
    borderTopWidth: 0.5,
    borderTopColor: BORDER,
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7,
    color: TEXT2,
  },
});

function getFormattedDate(locale: "de" | "en"): string {
  const now = new Date();
  if (locale === "de") {
    const months = [
      "Januar", "Februar", "März", "April", "Mai", "Juni",
      "Juli", "August", "September", "Oktober", "November", "Dezember",
    ];
    return `Königswinter, den ${now.getDate()}. ${months[now.getMonth()]} ${now.getFullYear()}`;
  }
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `Königswinter, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

type CoverLetterDocumentProps = {
  locale: "de" | "en";
};

export function CoverLetterDocument({ locale }: CoverLetterDocumentProps) {
  const data = getCoverLetterContent();
  const content = data[locale];

  return (
    <Document
      title={`Tobias Ludwig - ${content.subject}`}
      author="Tobias Ludwig"
    >
      <Page size="A4" style={s.page}>
        {/* Accent bar — matching CV */}
        <View style={s.accentBar} />

        {/* Header — matching CV layout */}
        <View style={s.headerRow}>
          <View>
            <Text style={s.headerName}>{data.sender.name}</Text>
            <Text style={s.headerSubtitle}>Business Analyst IAM</Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.contactLine}>{data.sender.email}</Text>
            <Text style={s.contactLine}>{data.sender.phone}</Text>
            <Text style={s.contactLine}>{data.sender.street}</Text>
            <Text style={s.contactLine}>{data.sender.city}</Text>
          </View>
        </View>

        {/* Recipient + Date */}
        <View style={s.metaRow}>
          <View style={s.recipientBlock}>
            <Text style={s.recipientText}>{data.recipient.company}</Text>
            <Text style={s.recipientText}>{data.recipient.department}</Text>
            {data.recipient.street ? (
              <Text style={s.recipientText}>{data.recipient.street}</Text>
            ) : null}
            <Text style={s.recipientText}>{data.recipient.city}</Text>
          </View>
          <View style={s.dateBlock}>
            <Text style={s.dateText}>{getFormattedDate(locale)}</Text>
          </View>
        </View>

        {/* Subject */}
        <Text style={s.subject}>{content.subject}</Text>

        {/* Salutation */}
        <Text style={s.salutation}>{content.salutation}</Text>

        {/* Body */}
        {content.paragraphs.map((p, i) => (
          <Text key={i} style={s.paragraph}>
            {p}
          </Text>
        ))}

        {/* Closing */}
        <Text style={s.closing}>{content.closing}</Text>

        {/* Signature */}
        <Text style={s.signature}>{content.signature}</Text>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>Tobias Ludwig — Bewerbung Business Analyst IAM</Text>
          <Text style={s.footerText}>bitmarck-bewerbung.tjl-it.de</Text>
        </View>
      </Page>
    </Document>
  );
}
