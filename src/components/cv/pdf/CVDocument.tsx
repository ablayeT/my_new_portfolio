// src/components/cv/pdf/CVDocument.tsx
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
    links: { linkedin: string; github: string; tryhackme: string };
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
            </View>
          </View>

          <View style={styles.right}>
            <Text>{identity.phone}</Text>
            <Text>{identity.email}</Text>
            <View style={styles.linksRow}>
              <Link src={identity.links.linkedin} style={styles.link}>
                LinkedIn
              </Link>
              <Text>·</Text>
              <Link src={identity.links.github} style={styles.link}>
                GitHub
              </Link>
              <Text>·</Text>
              <Link src={identity.links.tryhackme} style={styles.link}>
                TryHackMe
              </Link>
            </View>
          </View>
        </View>

        {/* ===== Profil ===== */}
        <Text style={styles.sectionTitle}>Profil</Text>
        <Text style={{ marginBottom: 6 }}>{summary}</Text>

        <View style={styles.row}>
          {/* ===== Colonne gauche : Expériences + Compétences ===== */}
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>
              Expériences professionnelles
            </Text>

            {experiences.map((exp, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
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

            <View style={styles.ViewsCol}>
              <View>
                <Text style={styles.sectionTitle}>Compétences</Text>
                <Text style={{ marginBottom: 3 }}>
                  <Text style={{ fontWeight: 700 }}>Cybersécurité: </Text>
                  <Text>{skills.security}</Text>
                </Text>
              </View>
              <View>
                <Text style={{ marginBottom: 3 }}>
                  <Text style={{ fontWeight: 700 }}>Systèmes: </Text>
                  <Text>{skills.systems}</Text>
                </Text>
              </View>
              <View>
                <Text style={{ marginBottom: 3 }}>
                  <Text style={{ fontWeight: 700 }}>Dev: </Text>
                  <Text>{skills.dev}</Text>
                </Text>
              </View>
              <View style={{ marginBottom: 8 }}>
                <Text>
                  <Text style={{ fontWeight: 700 }}>Outils/ATS: </Text>
                  <Text>
                    {skills.tools} • {skills.ats}
                  </Text>
                </Text>
              </View>
            </View>

            <View>
              <Text>
                <Text style={styles.sectionTitle}>Centres d’intérêt: </Text>
                <Text>{personal.hobbies}</Text>
              </Text>
            </View>
          </View>

          {/* ===== Colonne droite : Projets + Formations + Infos ===== */}
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Projets</Text>
            {featuredProjects.map((p, i) => (
              <View key={i} style={{ marginBottom: 5 }}>
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

            <Text style={styles.sectionTitle}>Formations</Text>
            {education.map((e, i) => (
              <View key={i} style={{ marginBottom: 1 }}>
                <Text style={{ fontWeight: 700 }}>{e.title}</Text>
                <Text style={{ color: "#718096" }}>
                  {e.school} | {e.period}
                </Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>Infos personnelles</Text>
            <Text>
              <Text style={{ fontWeight: 700 }}>Langues: </Text>
              {personal.languages}
            </Text>
            <Text style={{ marginBottom: 2 }}>
              <Text style={{ fontWeight: 700 }}>Soft skills: </Text>
              {personal.soft}
            </Text>
          </View>
        </View>

        {/* ===== Footer ===== */}
        <View style={styles.divider} />
      </Page>
    </Document>
  );
}
