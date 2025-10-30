import { StyleSheet } from "@react-pdf/renderer";

const BRAND = "#2563eb"; // bleu pro
const TEXT = "#1a202c";
const TEXT_MUTED = "#4a5568";
const BORDER = "#e2e8f0";
const SUBTLE_BG = "#F3F4F6";

export const styles = StyleSheet.create({
  page: {
    padding: 16,
    fontSize: 9.5, // compact pour tenir sur 1 page
    lineHeight: 1.24,
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
    marginBottom: 8,
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
    marginTop: 8,
  },

  // ==== Bannière d’accroche (INLINE) ====
  banner: {
    backgroundColor: SUBTLE_BG,
    border: `1 solid ${BORDER}`,
    borderRadius: 6,
    paddingVertical: 6, // ↓ padding pour gagner de la hauteur
    paddingHorizontal: 8,
    marginTop: 4, // ↓ marges pour éviter le débordement
    marginBottom: 6,
  },
  bannerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // wrap de secours si très étroit, tout en restant visuellement "en ligne"
    flexWrap: "wrap",
  },
  bannerLeft: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "55%", // l’accroche prend ~la moitié gauche
    paddingRight: 6,
  },
  bannerRight: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "45%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end", // chips à droite
  },
  bannerText: {
    fontSize: 9.2, // un tout petit peu plus compact
    color: TEXT_MUTED,
  },

  // Liens compacts
  linksInline: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 6,
  },
  link: { color: BRAND, textDecoration: "none" },
  linkSmall: { fontSize: 9, color: BRAND, textDecoration: "none" },
  sep: { color: TEXT_MUTED, fontSize: 9 },

  // Liens “apparents” (impression)
  linkLine: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
    marginBottom: 4,
  },
  linkLabel: { color: BRAND, textDecoration: "none" },
  linkUrl: { fontSize: 8.6, color: TEXT_MUTED },

  // ==== Sections ====
  sectionTitle: {
    fontSize: 11.2,
    fontWeight: 700,
    marginTop: 9,
    marginBottom: 4,
    paddingBottom: 2,
    borderBottom: `1 solid ${BORDER}`,
    borderLeft: `3 solid ${BRAND}`,
    paddingLeft: 5,
  },
  bullet: { marginBottom: 1.05 },

  // ==== Layout 2 colonnes ====
  row: { flexDirection: "row", gap: 9 },
  colLeft: { flex: 1.15, gap: 2 }, // Formations à gauche
  colRight: { flex: 0.85, gap: 2 },

  // ==== Chips ====
  chipRow: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    border: `1 solid ${BORDER}`,
    borderRadius: 4,
    paddingVertical: 1,
    paddingHorizontal: 3,
    fontSize: 8.3, // un brin plus petit
    color: TEXT_MUTED,
    marginLeft: 3, // on évite "gap" ici pour assurer la compatibilité
    marginBottom: 3,
  },

  // ==== KPI Row (optionnel) ====
  kpiRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 8,
    marginTop: 2,
  },
  kpi: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    border: `1 solid ${BORDER}`,
    borderRadius: 6,
    padding: 8,
  },
  kpiValue: { fontSize: 11, fontWeight: 700, marginBottom: 2, color: TEXT },
  kpiLabel: { fontSize: 9, color: TEXT_MUTED },

  ViewsCol: {
    textAlign: "left",
    flexDirection: "column",
    gap: 9,
    marginBottom: 2,
  },

  // ==== Education note (stage ADVENS) ====
  eduNote: {
    color: TEXT_MUTED,
    fontSize: 9,
    marginTop: -1,
    marginBottom: 5,
  },

  // ==== Footer ====
  divider: {
    borderTop: `1 solid ${BORDER}`,
    marginTop: 8,
  },
  footerNote: {
    color: "#9CA3AF",
    fontSize: 9,
    textAlign: "right",
    marginTop: 4,
  },
});
