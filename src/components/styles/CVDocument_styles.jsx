import { StyleSheet } from "@react-pdf/renderer";

const BRAND = "#2563eb"; // bleu pro
const TEXT = "#1a202c";
const TEXT_MUTED = "#4a5568";
const BORDER = "#e2e8f0";

export const styles = StyleSheet.create({
  page: {
    padding: 16,
    fontSize: 9.7, // + léger pour occuper un peu plus la page
    lineHeight: 1.24, // + aéré, sans faire déborder
    color: TEXT,
    fontFamily: "Helvetica",
  },

  // ==== Header ====
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
    paddingBottom: 4,
    marginBottom: 8, // +2 pour descendre légèrement le contenu
    borderBottom: `1 solid ${BORDER}`,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 6,
  },
  avatar: {
    width: 54,
    height: 64,
    marginRight: 10,
    borderRadius: 8,
    border: `1 solid ${BORDER}`,
  },
  name: { fontSize: 17.5, fontWeight: 700 },
  role: { fontSize: 10, color: TEXT_MUTED, marginTop: 1 },

  right: {
    textAlign: "left",
    flexDirection: "column",
    gap: 3,
    marginTop: "8",
  },

  // Liens en une seule ligne (wrap si trop long)
  linksInline: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  link: { color: BRAND, textDecoration: "none" },
  linkSmall: { fontSize: 9, color: BRAND, textDecoration: "none" },
  sep: { color: TEXT_MUTED, fontSize: 9 },
  linkLine: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginBottom: 4,
  },
  linkLabel: { color: "#2563eb", textDecoration: "none" },
  linkUrl: { fontSize: 8.6, color: "#4a5568" }, // petite URL grisée, lisible à l'impression

  // ==== Sections ====
  sectionTitle: {
    fontSize: 11.2,
    fontWeight: 700,
    marginTop: 9, // +1
    marginBottom: 4, // +1
    paddingBottom: 2,
    borderBottom: `1 solid ${BORDER}`,
    borderLeft: `3 solid ${BRAND}`,
    paddingLeft: 5,
  },
  bullet: { marginBottom: 1.2 }, // +0.2 pour respirer

  // ==== Layout 2 colonnes ====
  row: { flexDirection: "row", gap: 9 }, // +1
  col: { flex: 1, gap: 2 },

  // ==== Chips (tags) ====
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 3, marginTop: 2 },
  chip: {
    border: `1 solid ${BORDER}`,
    borderRadius: 4,
    paddingVertical: 1,
    paddingHorizontal: 3,
    fontSize: 8.6,
    color: TEXT_MUTED,
  },

  ViewsCol: {
    textAlign: "left",
    flexDirection: "column",
    gap: 9,
    marginBottom: 2,
  },

  // ==== Footer ====
  divider: {
    borderTop: `1 solid ${BORDER}`,
    marginTop: 10, // + pour “tirer” la page vers le bas
  },
});
