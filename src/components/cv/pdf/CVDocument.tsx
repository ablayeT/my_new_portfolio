/* eslint-disable jsx-a11y/alt-text */
import React, { type ReactElement } from "react";
import {
  Document, Page, View, Text, Image, Link, type DocumentProps,
} from "@react-pdf/renderer";
import { styles } from "@/components/styles/CVDocument_styles";

export type CVData = {
  identity: {
    name: string;
    title: string;
    under_title?: string;
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
    security: string;
    red?: string;
    systems: string;
    dev: string;
    tools: string;
    ats: string;
    language: string;
  };
  education: Array<{
    title: string;
    school: string;
    period: string;
    note?: string;
  }>;
  personal: {
    langues: { francais: string; anglais: string; espagnol?: string };
    soft: string;
    hobbies: string;
  };
  meta?: { updatedAt?: string };
  kpis?: Array<{ value: string; label: string }> | null;
  topChips?: string[] | null;
};

type Props = { data: CVData; photoSrc?: string; badgeSrc?: string };

function toChips(str: string): string[] {
  return str.split(/[,·]/).map((s) => s.trim()).filter(Boolean);
}

function SectionHead({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionAccent} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export function CVDocument({ data, photoSrc, badgeSrc }: Props): ReactElement<DocumentProps> {
  const {
    identity,
    summary,
    experiences,
    education,
    skills,
    featuredProjects,
    personal,
  } = data;

  const skillSections: { label: string; chips: string[] }[] = [
    { label: "SOC & Blue Team",      chips: toChips(skills.security) },
    ...(skills.red
      ? [{ label: "Pentest & Red Team", chips: toChips(skills.red) }]
      : []),
    { label: "Systemes & Reseau",    chips: toChips(skills.systems) },
    { label: "Automatisation & Dev", chips: toChips(skills.dev) },
    { label: "Outils",               chips: toChips(skills.tools) },
    { label: "Langages",             chips: toChips(skills.language) },
  ];

  const navLinks = [
    { label: "Portfolio",  src: identity.links.portfolio },
    { label: "GitHub",     src: identity.links.github },
    { label: "LinkedIn",   src: identity.links.linkedin },
    { label: "TryHackMe",  src: identity.links.tryhackme },
  ] as const;
  const langs = [
    { name: "Francais",  level: personal.langues.francais },
    { name: "Anglais",   level: personal.langues.anglais },
    ...(personal.langues.espagnol
      ? [{ name: "Espagnol", level: personal.langues.espagnol }]
      : []),
  ];

  return (
    <Document
      title={`CV ${identity.name}`}
      author={identity.name}
      subject="Cybersecurite"
    >
      <Page size="A4" style={styles.page}>

        {/* ── Numéro de page ──────────────────────────────────────── */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} / ${totalPages}`
          }
          fixed
        />

        {/* ── Bande footer fixe ───────────────────────────────────── */}
        <View style={styles.footerBand} fixed />

        {/* ══════════════════════════════════════════════════════════
             HEADER
            ══════════════════════════════════════════════════════════ */}
        <View style={styles.headerBand}>

          {/* Photo */}
          {photoSrc ? <Image src={photoSrc} style={styles.avatar} /> : null}

          {/* Nom + titre + contact + liens */}
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{identity.name}</Text>
            <Text style={styles.role}>{identity.title}</Text>

            <View style={styles.headerMeta}>
              <Text style={styles.headerMetaItem}>{identity.local}</Text>
              <Text style={styles.headerMetaItem}>{identity.email}</Text>
              <Text style={styles.headerMetaItem}>{identity.phone}</Text>
              {identity.under_title
                ? <Text style={styles.headerMetaItem}>{identity.under_title}</Text>
                : null}
            </View>

            <View style={styles.linksInline}>
              {navLinks.map(({ label, src }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <Text style={styles.sep}> · </Text>}
                  <Link src={src} style={styles.linkSmall}>{label}</Link>
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* Badge Microsoft — coin haut droit */}
          {badgeSrc ? (
            <View style={styles.badgeWrapper}>
              <Image src={badgeSrc} style={styles.badge} />
              <Text style={styles.badgeLabel}>SC-900</Text>
            </View>
          ) : null}

        </View>

        {/* ══════════════════════════════════════════════════════════
             RÉSUMÉ
            ══════════════════════════════════════════════════════════ */}
        <View style={styles.summaryBand} wrap={false}>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>

        {/* ══════════════════════════════════════════════════════════
             BODY — Expériences (gauche) | Formations (droite)
            ══════════════════════════════════════════════════════════ */}
        <View style={styles.row1}>

          {/* ── Colonne gauche : Expériences ──────────────────────── */}
          <View style={styles.colLeft}>
            <SectionHead title="Experiences professionnelles" />
            <View style={styles.divider} />

            {experiences.map((exp, i) => (
              <View key={i} style={styles.expBlock} wrap={false}>
                <Text style={styles.expRole}>{exp.role}</Text>
                <Text style={styles.expCompany}>{exp.company}</Text>
                <Text style={styles.expPeriod}>{exp.period}</Text>
                {exp.bullets.map((b, k) => (
                  <Text key={k} style={styles.bullet}>{"• "}{b}</Text>
                ))}
              </View>
            ))}
          </View>

          {/* ── Colonne droite : Formations ───────────────────────── */}
          <View style={styles.colRight}>
            <SectionHead title="Formations" />
            <View style={styles.divider} />

            {education.map((e, i) => (
              <View key={i} style={styles.eduBlock} wrap={false}>
                <Text style={styles.eduTitle}>{e.title}</Text>
                <Text style={styles.eduSchool}>{e.school}</Text>
                <Text style={styles.eduPeriod}>{e.period}</Text>
                {e.note ? <Text style={styles.eduNote}>{e.note}</Text> : null}
              </View>
            ))}
          </View>

        </View>{/* ── fin row Expériences / Formations ── */}

        {/* ══════════════════════════════════════════════════════════
             COMPÉTENCES — pleine largeur
            ══════════════════════════════════════════════════════════ */}
        <View style={styles.skillsFullSection}>
          <SectionHead title="Competences" />
          <View style={styles.divider} />
          <View style={styles.skillsGrid}>
            {skillSections.map(({ label, chips }: { label: string; chips: string[] }) => (
              <View key={label} style={styles.skillsGridItem} wrap={false}>
                <Text style={styles.skillLabel}>{label}</Text>
                <View style={styles.chipRow}>
                  {chips.map((c: string, i: number) => (
                    <Text key={i} style={styles.chip}>{c}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
        {/* ══════════════════════════════════════════════════════════
             PROJETS (gauche) | LIENS & SOFT SKILLS (droite)
            ══════════════════════════════════════════════════════════ */}
        <View style={styles.row2}>

{/* ── Colonne gauche : Projets ───────────────────────────── */}
<View style={styles.colLeft}>
  <SectionHead title="Projets" />
  <View style={styles.divider} />

  {featuredProjects.map((p, i) => (
    <View key={i} style={styles.projectBlock} wrap={false}>
      <Text style={styles.projectName}>{p.name}</Text>
      {(p.tags ?? []).length > 0 && (
        <View style={[styles.chipRow, { marginBottom: 3 }]}>
          {(p.tags ?? []).map((t: string, idx: number) => (
            <Text key={idx} style={styles.chipAccent}>{t}</Text>
          ))}
        </View>
      )}
      {p.bullets.map((b: string, k: number) => (
        <Text key={k} style={styles.bullet}>{"• "}{b}</Text>
      ))}
    </View>
  ))}
</View>

{/* ── Colonne droite : Liens + Soft Skills ──────────────── */}
<View style={styles.colRight}>
  <SectionHead title="Liens" />
  <View style={styles.divider} />

  <View wrap={false} style={{ marginBottom: 8 }}>
    {navLinks.map(({ label, src }) => (
      <View key={label} style={styles.linkLine}>
        <Link src={src} style={styles.linkLabel}>{label}</Link>
        <Text style={styles.linkUrl}>
          {src.replace("https://", "").replace("http://", "")}
        </Text>
      </View>
    ))}
  </View>

  <SectionHead title="Soft Skills" />
  <View style={styles.divider} />
  <View style={styles.chipRow} wrap={false}>
    {toChips(personal.soft).map((s: string, i: number) => (
      <Text key={i} style={styles.chip}>{s}</Text>
    ))}
  </View>

  <SectionHead title="Langues" />
  <View style={styles.divider} />
  <View wrap={false}>
    {langs.map(({ name, level }, i) => (
      <View key={i} style={styles.langRow}>
        <Text style={styles.langName}>{name}</Text>
        <Text style={styles.langLevel}>{level}</Text>
      </View>
    ))}
  </View>

</View>
</View>

        {/* ── Footer note ───────────────────────────────────────────
        <Text style={styles.footerNote}>
          {"abdou-cyber.dev  —  Mis a jour "}
          {data.meta?.updatedAt ?? "2026"}
        </Text> */}

      </Page>
    </Document>
  );
}