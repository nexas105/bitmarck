import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { getCoverLetterContent } from "@/data/cover-letter";
import { colors } from "./pdf-styles";
// Importing pdf-styles triggers Font.register at module level
import "./pdf-styles";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    color: colors.textPrimary,
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 50,
    lineHeight: 1.6,
  },
  senderBlock: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  senderText: {
    fontSize: 9,
    color: colors.textSecondary,
  },
  dateText: {
    fontSize: 10,
    textAlign: "right",
    marginBottom: 20,
    color: colors.textSecondary,
  },
  recipientBlock: {
    marginBottom: 24,
  },
  recipientText: {
    fontSize: 10,
    color: colors.textPrimary,
  },
  subject: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  salutation: {
    fontSize: 10,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 10,
    lineHeight: 1.6,
    textAlign: "justify",
  },
  closing: {
    fontSize: 10,
    marginTop: 16,
    marginBottom: 4,
  },
  signature: {
    fontSize: 10,
    fontWeight: 500,
    marginTop: 24,
  },
});

function getFormattedDate(locale: "de" | "en"): string {
  const now = new Date();
  if (locale === "de") {
    const months = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];
    return `Königswinter, den ${now.getDate()}. ${months[now.getMonth()]} ${now.getFullYear()}`;
  }
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
      <Page size="A4" style={styles.page}>
        {/* Sender block */}
        <View style={styles.senderBlock}>
          <Text style={styles.senderText}>{data.sender.name}</Text>
          <Text style={styles.senderText}>{data.sender.street}</Text>
          <Text style={styles.senderText}>{data.sender.city}</Text>
          <Text style={styles.senderText}>{data.sender.email}</Text>
          <Text style={styles.senderText}>{data.sender.phone}</Text>
        </View>

        {/* Date */}
        <Text style={styles.dateText}>{getFormattedDate(locale)}</Text>

        {/* Recipient */}
        <View style={styles.recipientBlock}>
          <Text style={styles.recipientText}>{data.recipient.company}</Text>
          <Text style={styles.recipientText}>{data.recipient.department}</Text>
          <Text style={styles.recipientText}>{data.recipient.city}</Text>
        </View>

        {/* Subject */}
        <Text style={styles.subject}>{content.subject}</Text>

        {/* Salutation */}
        <Text style={styles.salutation}>{content.salutation}</Text>

        {/* Body */}
        {content.paragraphs.map((p, i) => (
          <Text key={i} style={styles.paragraph}>
            {p}
          </Text>
        ))}

        {/* Closing */}
        <Text style={styles.closing}>{content.closing}</Text>

        {/* Signature */}
        <Text style={styles.signature}>{content.signature}</Text>
      </Page>
    </Document>
  );
}
