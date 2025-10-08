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

export type CVData = {
  identity: {
    name: string;
    title: string;
    under_title?: string;
    phone: string;
    email: string;
    local: string; // ← localisation (ex: "Île-de-France")
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
    tags?: string[];
  }>;
  skills: {
    security: string;
    systems: string;
    dev: string;
    tools: string;
    ats: string;
  };
  education: Array<{ title: string; school: string; period: string }>;
  personal: { languages: string; soft: string; hobbies: string };
  meta?: { updatedAt?: string };
};

type Props = {
  data: CVData;
  photoSrc?: string; // data URL injectée par la route
};

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
  } = data;

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
              {identity.under_title ? (
                <Text style={styles.role}>{identity.under_title}</Text>
              ) : null}

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

        {/* ===== Profil (sous le header) ===== */}
        <Text style={styles.sectionTitle}>Profil</Text>
        <Text style={{ marginBottom: 6 }}>{summary}</Text>

        <View style={styles.row}>
          {/* ===== Colonne gauche : Expériences + Compétences ===== */}
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>
              Expériences professionnelles en cybersécurité
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

            {/* ===== Compétences (savoirs + savoir-être) ===== */}
            <View style={styles.ViewsCol}>
              <View style={{ gap: 6 }}>
                <Text style={styles.sectionTitle}>Compétences</Text>
                <Text style={{ marginBottom: 2 }}>
                  <Text style={{ fontWeight: 700 }}>
                    Domaines (savoirs)&nbsp;:{" "}
                  </Text>
                  {/* Utilise ton champ 'security' qui contient déjà des notions génériques ATS */}
                  <Text>{skills.security}</Text>
                </Text>
                <Text style={{ marginBottom: 6 }}>
                  <Text>
                    <Text style={{ fontWeight: 700 }}>Soft skills: </Text>
                    {personal.soft || skills.ats}
                  </Text>
                </Text>
              </View>
            </View>

            <View>
              <Text>
                <Text style={styles.sectionTitle}>Langues: </Text>
                <Text> {personal.languages}</Text>
              </Text>
            </View>
          </View>

          {/* ===== Colonne droite : Projets + Liens utiles + Formations + Infos ===== */}
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Projets</Text>
            {featuredProjects.map((p, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={{ fontWeight: 700 }}>{p.name}</Text>

                {p.tags?.length ? (
                  <View style={styles.chipRow}>
                    {p.tags.map((t, idx) => (
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

            {/* Liens utiles : cliquables + URL apparentes (impression) */}
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

            <Text style={styles.sectionTitle}>Formations</Text>
            {education.map((e, i) => (
              <View key={i} style={{ marginBottom: 2 }}>
                <Text style={{ fontWeight: 700 }}>{e.title}</Text>
                <Text style={{ color: "#718096", marginBottom: 5 }}>
                  {e.school} | {e.period}
                </Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>Centres d’intérêt:</Text>
            <Text>
              <Text>{personal.hobbies}</Text>
            </Text>
          </View>
        </View>

        {/* ===== Footer ===== */}
        <View style={styles.divider} />
      </Page>
    </Document>
  );
}
