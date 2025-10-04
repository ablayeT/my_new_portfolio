// src/components/styles/CVDocument_styles.ts
import { StyleSheet } from "@react-pdf/renderer";

const BRAND = "#2563eb"; // bleu pro
const TEXT_MUTED = "#4a5568";
const BORDER = "#e2e8f0";

export const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10.5, // compact
    lineHeight: 1.28, // interligne resserré
    color: "#1a202c",
    fontFamily: "Helvetica",
  },

  // ==== Header ====
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingBottom: 6,
    marginBottom: 6,
    borderBottom: `1 solid ${BORDER}`,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 8,
  },
  avatar: {
    width: 68,
    height: 80,
    marginRight: 12,
    borderRadius: 10, // angle doux (évite la coupe d’oreille)
    border: `1 solid ${BORDER}`, // liseré propre
  },
  name: { fontSize: 19, fontWeight: 700 },
  role: { fontSize: 11, color: TEXT_MUTED, marginTop: 1 },
  right: {
    textAlign: "left",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 5,
  },
  link: { color: BRAND, textDecoration: "none" },
  linksRow: { flexDirection: "row", gap: 8, justifyContent: "flex-end" },
  ViewsCol: {
    textAlign: "left",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 3,
  },
  // ==== Sections ====
  sectionTitle: {
    fontSize: 12.5,
    fontWeight: 700,
    marginTop: 10,
    marginBottom: 4,
    paddingBottom: 3,
    borderBottom: `1 solid ${BORDER}`,
    borderLeft: `3 solid ${BRAND}`,
    paddingLeft: 6,
  },
  bullet: { marginBottom: 1.5 },

  // ==== Layout 2 colonnes ====
  row: { flexDirection: "row", gap: 10 },
  col: { flex: 1 },

  // ==== Chips (tags) ====
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 3 },
  chip: {
    border: `1 solid ${BORDER}`,
    borderRadius: 4,
    paddingVertical: 1,
    paddingHorizontal: 4,
    fontSize: 9.5,
    color: TEXT_MUTED,
  },

  // ==== Divider fin (footer) ====
  divider: {
    borderTop: `1 solid ${BORDER}`,
    marginTop: 6,
  },
});
