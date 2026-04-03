import { StyleSheet } from "@react-pdf/renderer";

const C = {
  brand:     "#2563eb",
  dark:      "#0f172a",
  lightBlue: "#eff6ff",
  text:      "#1e293b",
  muted:     "#64748b",
  border:    "#e2e8f0",
  bg:        "#f8fafc",
  white:     "#ffffff",
  chipBg:    "#f1f5f9",
  chipText:  "#475569",
};

export const styles = StyleSheet.create({

  // ── Page ──────────────────────────────────────────────────────────────
  page: {
    fontSize:          9,
    lineHeight:        1.35,
    color:             C.text,
    fontFamily:        "Helvetica",
    backgroundColor:   C.white,
    paddingBottom:     36,
    paddingTop:        0,
    paddingHorizontal: 0,
  },

  // ── Header dark band ──────────────────────────────────────────────────
  headerBand: {
    backgroundColor: C.dark,
    flexDirection:   "row",
    alignItems:      "center",
    paddingLeft:     24,
    paddingRight:    20,
    paddingTop:      18,
    paddingBottom:   16,
    gap:             14,
  },
  // legacy alias
  header: {
    backgroundColor: C.dark,
    flexDirection:   "row",
    alignItems:      "center",
    paddingLeft:     24,
    paddingRight:    20,
    paddingTop:      18,
    paddingBottom:   16,
    gap:             14,
  },

  // ── Photo ─────────────────────────────────────────────────────────────
  avatar: {
    width:        58,
    height:       58,
    borderRadius: 29,
    border:       "2 solid #3b82f6",
  },

  // ── Badge Microsoft ───────────────────────────────────────────────────
  badgeWrapper: {
    alignSelf:  "flex-start",
    alignItems: "center",
    gap:        3,
  },
  badge: {
    width:  42,
    height: 42,
  },
  badgeLabel: {
    fontSize:  8,
    color:     "#93c5fd",
    textAlign: "center",
  },

  // ── Header text ───────────────────────────────────────────────────────
  name: {
    fontSize:     18,
    fontFamily:   "Helvetica-Bold",
    color:        C.white,     // ✅ blanc sur fond sombre
    marginBottom: 2,
    lineHeight:   1.2,
  },
  role: {
    fontSize:     10,
    color:        "#93c5fd",   // ✅ bleu clair sur fond sombre
    marginBottom: 5,
    lineHeight:   1.3,
  },
  headerMeta: {
    flexDirection: "row",
    flexWrap:      "wrap",
    gap:           10,
    marginBottom:  4,
  },
  headerMetaItem: {
    fontSize: 8.5,
    color:    "#94a3b8",       // ✅ gris clair sur fond sombre
  },
  linksInline: {
    flexDirection: "row",
    flexWrap:      "wrap",
    alignItems:    "center",
    gap:           5,
  },
  linkSmall: {
    fontSize:       8.5,
    color:          "#60a5fa", // ✅ bleu clair sur fond sombre
    textDecoration: "none",
  },
  sep: {
    fontSize: 7.5,
    color:    "#475569",
  },

  // ── Legacy keys ───────────────────────────────────────────────────────
  left:    { flexDirection: "row", alignItems: "center", gap: 14, flex: 1 },
  right:   { flexDirection: "column", alignItems: "flex-end", gap: 3 },
  ViewsCol:{ flexDirection: "column", gap: 0 },

  // ── Summary ───────────────────────────────────────────────────────────
  summaryBand: {
    backgroundColor:   C.lightBlue,
    borderLeft:        "3 solid #2563eb",
    marginHorizontal:  22,
    marginTop:         10,
    marginBottom:      6,
    borderRadius:      4,
    paddingHorizontal: 10,
    paddingVertical:   8,
  },
  summaryText: {
    fontSize:   10,
    color:      C.text,
    lineHeight: 1.55,
  },
  // legacy
  banner:      { fontSize: 8.5, color: C.text, lineHeight: 1.55 },
  bannerRow:   { flexDirection: "row" },
  bannerLeft:  { flex: 1 },
  bannerRight: { flexDirection: "row", flexWrap: "wrap", gap: 3 },
  bannerText:  { fontSize: 8.5, color: C.muted },

  // ── Body layout ───────────────────────────────────────────────────────
  row1: {
    flexDirection:     "row",
    paddingHorizontal: 22,
    paddingTop:        4,
    paddingBottom:     16,
    marginBottom:       32,
    marginTop:           4,
    gap:               14,
  },
  row2: {
    flexDirection:     "row",
    paddingHorizontal: 22,
    paddingTop:        4,
    paddingBottom:     2,
    marginBottom:       4,
    marginTop:          20,
    gap:               14,
  },
  colLeft:  { flex: 58 },
  colRight: { flex: 42 },

  // ── Section header ────────────────────────────────────────────────────
  section:       { marginBottom: 8 },
  sectionHeader: {
    flexDirection: "row",
    alignItems:   "center",
    gap:          5,
    marginBottom: 4,
    marginTop:    8,
  },
  sectionAccent: {
    width:           3,
    height:          10,
    backgroundColor: C.brand,
    borderRadius:    2,
  },
  sectionTitle: {
    fontSize:      10,
    fontFamily:    "Helvetica-Bold",
    color:         C.dark,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  divider: {
    borderTop:    "1 solid #e2e8f0",
    marginBottom: 5,
  },

  // ── Skills — pleine largeur ───────────────────────────────────────────
  skillsFullSection: {
    marginTop:         32,
    marginHorizontal:  22,
    paddingTop:        16,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap:      "wrap",
    gap:           8,
    marginTop:     4,
  },
  skillsGridItem: {
    width:           "30%",   // ~3 colonnes
    marginBottom:    6,
  },

  // ── Skills legacy ─────────────────────────────────────────────────────
  skillBlock: { marginBottom: 5 },
  skillLabel: {
    fontSize:      8,
    fontFamily:    "Helvetica-Bold",
    color:         C.dark,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom:  3,
  },

  // ── Chips ─────────────────────────────────────────────────────────────
  chipRow: {
    flexDirection: "row",
    flexWrap:      "wrap",
    gap:           2,
    marginTop:     1,
  },
  chip: {
    fontSize:          8,
    color:             C.chipText,
    backgroundColor:   C.chipBg,
    paddingHorizontal: 4,
    paddingVertical:   1.5,
    borderRadius:      3,
    border:            "0.5 solid #cbd5e1",
  },
  chipAccent: {
    fontSize:          8,
    color:             "#1d4ed8",
    backgroundColor:   "#dbeafe",
    paddingHorizontal: 4,
    paddingVertical:   1.5,
    borderRadius:      3,
  },

  // ── Experience ────────────────────────────────────────────────────────
  expBlock: {
    marginBottom: 8,
    paddingLeft:  7,
    borderLeft:   "2 solid #bfdbfe",
  },
  expRole: {
    fontSize:     9,
    fontFamily:   "Helvetica-Bold",
    color:        C.dark,
    marginBottom: 1,
  },
  expCompany: {
    fontSize:     10,
    color:        C.brand,
    fontFamily:   "Helvetica-Oblique",
    marginBottom: 1,
  },
  expPeriod: {
    fontSize:     9,
    color:        C.muted,
    marginBottom: 3,
  },
  bullet: {
    fontSize:     8,
    color:        C.text,
    marginBottom: 2,
    lineHeight:   1.4,
    paddingLeft:  5,
  },

  // ── Education ─────────────────────────────────────────────────────────
  eduBlock: {
    marginBottom:    4,
    paddingLeft:     7,
    paddingTop:      4,
    paddingBottom:   4,
    paddingRight:    5,
    backgroundColor: C.bg,
    borderRadius:    3,
    borderLeft:      "2 solid #bfdbfe",
  },
  eduTitle: {
    fontSize:     9,
    fontFamily:   "Helvetica-Bold",
    color:        C.dark,
    marginBottom: 1,
  },
  eduSchool: {
    fontSize:     10,
    color:        C.brand,
    marginBottom: 1,
  },
  eduPeriod: {
    fontSize:     9,
    color:        C.muted,
    marginBottom: 1,
  },
  eduNote: {
    fontSize:   9,
    color:      C.muted,
    lineHeight: 1.35,
    marginTop:  1,
  },

  // ── Projects ──────────────────────────────────────────────────────────
  projectBlock: {
    marginBottom:    7,
    padding:         6,
    backgroundColor: C.bg,
    borderRadius:    3,
    borderLeft:      "2 solid #bfdbfe",
  },
  projectName: {
    fontSize:     7,
    fontFamily:   "Helvetica-Bold",
    color:        C.dark,
    marginBottom: 2,
  },

  // ── Side cards ────────────────────────────────────────────────────────
  sideCard: {
    backgroundColor:   C.bg,
    borderRadius:      4,
    paddingHorizontal: 7,
    paddingVertical:   6,
    marginBottom:      6,
    border:            "1 solid #e2e8f0",
  },
  sideCardTitle: {
    fontSize:      8,
    fontFamily:    "Helvetica-Bold",
    color:         C.dark,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom:  4,
  },

  // ── Links ─────────────────────────────────────────────────────────────
  link:     { color: C.brand, textDecoration: "none" },
  linkLine: {
    flexDirection: "row",
    alignItems:   "baseline",
    gap:          5,
    marginBottom: 3,
  },
  linkLabel: {
    fontSize:       9,
    fontFamily:     "Helvetica-Bold",
    color:          C.brand,
    textDecoration: "none",
    minWidth:       50,
  },
  linkUrl: {
    fontSize: 8,
    color:    C.muted,
  },

  // ── Languages ─────────────────────────────────────────────────────────
  langList:  { flexDirection: "column", gap: 3, marginBottom: 4 },
  langItem:  { fontSize: 8, color: C.text },
  langRow: {
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems:     "center",
    marginBottom:   3,
  },
  langName:  { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.dark },
  langLevel: { fontSize: 8, color: C.muted },

  // ── KPI ───────────────────────────────────────────────────────────────
  kpiRow: { flexDirection: "row", gap: 6, marginBottom: 8, marginTop: 2 },
  kpi: {
    flex: 1, backgroundColor: C.bg,
    border: "1 solid #e2e8f0", borderRadius: 5, padding: 7,
  },
  kpiValue: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 2, color: C.text },
  kpiLabel: { fontSize: 8, color: C.muted },

  // ── Page 2 mini-header ────────────────────────────────────────────────
  page2Header: {
    backgroundColor:   C.dark,
    paddingHorizontal: 24,
    paddingVertical:   10,
    flexDirection:     "row",
    alignItems:        "center",
    justifyContent:    "space-between",
  },
  page2HeaderName: {
    fontSize:   11,
    fontFamily: "Helvetica-Bold",
    color:      C.white,
  },
  page2HeaderRole: {
    fontSize: 8,
    color:    "#93c5fd",
  },
// ── Page number ───────────────────────────────────────────────────────
pageNumber: {
  position:  "absolute",
  bottom:    18,        // au-dessus de la bande footer (hauteur 14)
  right:     22,
  fontSize:  8,
  color:     C.white,   // blanc pour être visible sur la bande sombre
},

// ── Footer ────────────────────────────────────────────────────────────
footerBand: {
  position:        "absolute",
  bottom:          0,
  left:            0,
  right:           0,
  height:          22,  // un peu plus haute pour englober le numéro
  backgroundColor: C.dark,
},

  footerNote: {
    fontSize:     7,
    color:        "#94a3b8",
    textAlign:    "center",
    marginTop:    6,
    marginBottom: 16,
  },
  dividerFull: {
    borderTop:        "1 solid #e2e8f0",
    marginTop:        10,
    marginHorizontal: 22,
  },
});