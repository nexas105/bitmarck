import { Font, StyleSheet } from "@react-pdf/renderer";
import { join } from "path";

// Register Inter font at module level (before any component renders)
Font.register({
  family: "Inter",
  fonts: [
    {
      src: join(process.cwd(), "public/fonts/Inter-Regular.ttf"),
      fontWeight: 400,
    },
    {
      src: join(process.cwd(), "public/fonts/Inter-Medium.ttf"),
      fontWeight: 500,
    },
    {
      src: join(process.cwd(), "public/fonts/Inter-Bold.ttf"),
      fontWeight: 700,
    },
  ],
});

// Disable hyphenation for cleaner text rendering
Font.registerHyphenationCallback((word) => [word]);

// Design tokens matching website globals.css
export const colors = {
  accent: "#2563EB",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  surface: "#F9FAFB",
  white: "#FFFFFF",
} as const;

// Shared styles for PDF documents
export const sharedStyles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 9,
    color: colors.textPrimary,
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: colors.accent,
  },
  entryTitle: {
    fontSize: 9,
    fontWeight: 500,
  },
  entryMeta: {
    fontSize: 8,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  bulletPoint: {
    fontSize: 8,
    color: colors.textPrimary,
    marginLeft: 8,
    marginBottom: 1,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginVertical: 8,
  },
});
