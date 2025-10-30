/* eslint-disable jsx-a11y/alt-text */ // Image de @react-pdf/renderer n'a pas d'alt
import React, { type ReactElement } from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
  type DocumentProps,
} from "@react-pdf/renderer";
import { styles } from "@/components/styles/CVDocument_styles";

// ===== Types =====
export type CVData = {
  identity: {
    name: string;
    title: string;
    under_title?: string; // ex: dispo/localisation/modalité
    phone: string;
    email: string;
    local: string;
    links: {
      linkedin: string;
      github: string;
      tryhackme: string;
      portfolio: string;
    };
  };
  summary: string;
  experiences: Array<{
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }>;
  featuredProjects: Array<{
    name: string;
    bullets: string[];
    tags?: string[] | null;
  }>;
  skills: {
    security: string; // SOC/Blue Team
    red?: string; // Pentest/Red Team (optionnel)
    systems: string;
    dev: string;
    tools: string; // "ELK, Suricata, Wireshark, ..."
    ats: string;
  };
  education: Array<{
    title: string;
    school: string;
    period: string;
    note?: string;
  }>;
  personal: {
    langues: {
      francais: string; // "courant"
      anglais: string; // "courant"
      espagnol?: string; // "intermédiaire"
    };
    soft: string;
    hobbies: string;
  };
  meta?: { updatedAt?: string };

  // Optionnels
  kpis?: Array<{ value: string; label: string }> | null;
  topChips?: string[] | null;
};

type Props = {
  data: CVData;
  photoSrc?: string; // data URL injectée par la route
};

// Utilitaire pour obtenir des chips lisibles depuis "skills.tools"
function deriveChipsFromTools(tools: string | undefined, max = 6): string[] {
  if (!tools) return [];
  return tools
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max);
}

export function CVDocument({
  data,
  photoSrc,
}: Props): ReactElement<DocumentProps> {
  const {
    identity,
    summary,
    experiences,
    featuredProjects,
    skills,
    education,
    personal,
    meta,
    // kpis, // si besoin plus tard
    topChips,
  } = data;

  // Chips : jamais null avant itération
  const CHIP_LIMIT = 5;
  const chipsSource: string[] =
    (topChips && topChips.length > 0
      ? topChips
      : deriveChipsFromTools(skills?.tools, CHIP_LIMIT)) ?? [];
  const chips = chipsSource.slice(0, CHIP_LIMIT);

  // Rendu compact des langues
  const languesParts = [
    ["Français", personal.langues.francais] as [string, string],
    ["Anglais", personal.langues.anglais] as [string, string],
    personal.langues.espagnol
      ? (["Espagnol", personal.langues.espagnol] as [string, string])
      : null,
  ].filter(Boolean) as Array<[string, string]>;
  const languesLine = languesParts
    .map(([n, lvl]) => `${n} (${lvl})`)
    .join(" · ");

  return (
    <Document
      title={`CV ${identity.name}`}
      author={identity.name}
      subject="Cybersécurité"
    >
      <Page size="A4" style={styles.page}>
        {/* ===== Header ===== */}
        <View style={styles.header}>
          <View style={styles.left}>
            {photoSrc ? <Image src={photoSrc} style={styles.avatar} /> : null}
            <View style={styles.ViewsCol}>
              <Text style={styles.name}>{identity.name}</Text>
              <Text style={styles.role}>{identity.title}</Text>

              {/* Liens visibles (une ligne, wrap auto) */}
              <View style={styles.linksInline}>
                <Link src={identity.links.portfolio} style={styles.linkSmall}>
                  Portfolio
                </Link>
                <Text style={styles.sep}>·</Text>
                <Link src={identity.links.github} style={styles.linkSmall}>
                  GitHub
                </Link>
                <Text style={styles.sep}>·</Text>
                <Link src={identity.links.tryhackme} style={styles.linkSmall}>
                  TryHackMe
                </Link>
                <Text style={styles.sep}>·</Text>
                <Link src={identity.links.linkedin} style={styles.linkSmall}>
                  LinkedIn
                </Link>
              </View>
            </View>
          </View>

          <View style={styles.right}>
            <Text>{identity.phone}</Text>
            <Text>{identity.email}</Text>
            <Text>{identity.local}</Text>
          </View>
        </View>

        {/* ===== Bannière INLINE : under_title, chips ===== */}
        <View style={styles.banner}>
          <View style={styles.bannerRow}>
            <View style={styles.bannerLeft}>
              {identity.under_title ? (
                <Text style={styles.bannerText}>{identity.under_title}</Text>
              ) : null}
            </View>

            <View style={styles.bannerRight}>
              {chips.length > 0
                ? chips.map((t, idx) => (
                    <Text key={idx} style={styles.chip}>
                      {t}
                    </Text>
                  ))
                : null}
            </View>
          </View>
        </View>

        {/* ===== Profil ===== */}
        <Text style={styles.sectionTitle}>Profil</Text>
        <Text style={{ marginBottom: 6 }}>{summary}</Text>

        <View style={styles.row}>
          {/* ===== Colonne gauche : Expériences -> Formations -> Compétences ===== */}
          <View style={styles.colLeft}>
            <Text style={styles.sectionTitle}>
              Expériences et réalisations sélectionnées
            </Text>

            {experiences.map((exp, i) => (
              <View key={i} style={{ marginBottom: 6, gap: 6 }}>
                <Text style={{ fontWeight: 700 }}>
                  {exp.role} | {exp.company}
                </Text>
                <Text
                  style={{
                    color: "#718096",
                    fontStyle: "italic",
                    marginBottom: 2,
                  }}
                >
                  {exp.period}
                </Text>
                {exp.bullets.map((b, k) => (
                  <Text key={k} style={styles.bullet}>
                    • {b}
                  </Text>
                ))}
              </View>
            ))}

            {/* ===== Formations (avec note ADVENS) ===== */}
            <Text style={styles.sectionTitle}>Formations</Text>
            {education.map((e, i) => (
              <View key={i} style={{ marginBottom: 2 }}>
                <Text style={{ fontWeight: 700 }}>{e.title}</Text>
                <Text style={{ color: "#718096" }}>
                  {e.school} | {e.period}
                </Text>
                {e.note ? <Text style={styles.eduNote}>{e.note}</Text> : null}
              </View>
            ))}

            {/* ===== Compétences ===== */}
            <View style={styles.ViewsCol}>
              <View style={{ gap: 6 }}>
                <Text style={styles.sectionTitle}>Compétences</Text>
                <Text style={{ marginBottom: 2 }}>
                  <Text style={{ fontWeight: 700 }}>
                    SOC & Blue Team&nbsp;:{" "}
                  </Text>
                  <Text>{skills.security}</Text>
                </Text>

                {skills.red ? (
                  <Text style={{ marginBottom: 2 }}>
                    <Text style={{ fontWeight: 700 }}>
                      Pentest & Red Team&nbsp;:{" "}
                    </Text>
                    <Text>{skills.red}</Text>
                  </Text>
                ) : null}

                <Text style={{ marginBottom: 2 }}>
                  <Text style={{ fontWeight: 700 }}>
                    Systèmes / Réseau&nbsp;:{" "}
                  </Text>
                  <Text>{skills.systems}</Text>
                </Text>
                <Text style={{ marginBottom: 2 }}>
                  <Text style={{ fontWeight: 700 }}>
                    Automatisation / Dev&nbsp;:{" "}
                  </Text>
                  <Text>{skills.dev}</Text>
                </Text>
                <Text style={{ marginBottom: 6 }}>
                  <Text style={{ fontWeight: 700 }}>Outils&nbsp;: </Text>
                  <Text>{skills.tools}</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* ===== Colonne droite : Projets -> Liens utiles -> Centres d’intérêt -> Langues ===== */}
          <View style={styles.colRight}>
            <Text style={styles.sectionTitle}>Projets</Text>
            {featuredProjects.map((p, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={{ fontWeight: 700 }}>{p.name}</Text>

                {(p.tags ?? []).length > 0 ? (
                  <View style={styles.chipRow}>
                    {(p.tags ?? []).map((t, idx) => (
                      <Text key={idx} style={styles.chip}>
                        {t}
                      </Text>
                    ))}
                  </View>
                ) : null}

                {p.bullets.map((b, k) => (
                  <Text key={k} style={styles.bullet}>
                    • {b}
                  </Text>
                ))}
              </View>
            ))}

            {/* Liens utiles */}
            <Text style={styles.sectionTitle}>Liens utiles</Text>
            <View style={styles.linkLine}>
              <Link src={identity.links.portfolio} style={styles.linkLabel}>
                Portfolio
              </Link>
              <Text style={styles.linkUrl}>{identity.links.portfolio}</Text>
            </View>
            <View style={styles.linkLine}>
              <Link src={identity.links.github} style={styles.linkLabel}>
                GitHub
              </Link>
              <Text style={styles.linkUrl}>{identity.links.github}</Text>
            </View>
            <View style={styles.linkLine}>
              <Link src={identity.links.linkedin} style={styles.linkLabel}>
                LinkedIn
              </Link>
              <Text style={styles.linkUrl}>{identity.links.linkedin}</Text>
            </View>
            <View style={styles.linkLine}>
              <Link src={identity.links.tryhackme} style={styles.linkLabel}>
                TryHackMe
              </Link>
              <Text style={styles.linkUrl}>{identity.links.tryhackme}</Text>
            </View>

            <Text style={styles.sectionTitle}>Centres d’intérêt</Text>
            <Text>{personal.hobbies}</Text>

            {/* ===== Langues ===== */}
            <Text style={styles.sectionTitle}>Langues</Text>
            <Text>{languesLine}</Text>
          </View>
        </View>

        {/* ===== Footer ===== */}
        <View style={styles.divider} />
        <Text style={styles.footerNote}>
          Mis à jour : {meta?.updatedAt || "—"}
        </Text>
      </Page>
    </Document>
  );
}
