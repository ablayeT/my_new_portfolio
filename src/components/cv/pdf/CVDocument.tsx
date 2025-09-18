// src/components/cv/pdf/CVDocument.tsx
import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { ReactNode } from "react";

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 11,
    color: "#1a202c",
    fontFamily: "Helvetica",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottom: "1 solid #e2e8f0",
  },
  left: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    objectFit: "contain",
  },
  name: { fontSize: 20, fontWeight: 700 },
  role: { fontSize: 12, color: "#4a5568", marginTop: 2 },
  right: { textAlign: "right" },
  link: { color: "#2563eb", textDecoration: "none" },
  linksRow: { flexDirection: "row", gap: 4, justifyContent: "flex-end" },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginTop: 12,
    marginBottom: 6,
    borderBottom: "1 solid #e2e8f0",
    paddingBottom: 4,
  },
  bullet: { marginBottom: 2 },
  row: { display: "flex", flexDirection: "row", gap: 10 },
  col: { flex: 1 },
});

type Props = {
  data: any;
  photoSrc?: string; // data URL
};

export function CVDocument({ data, photoSrc }: Props) {
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.left}>
            {photoSrc ? <Image src={photoSrc} style={styles.avatar} /> : null}
            <View>
              <Text style={styles.name}>{identity.name}</Text>
              <Text style={styles.role}>{identity.title}</Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text>{identity.phone}</Text>
            <Text>{identity.email}</Text>
            <View style={styles.linksRow}>
              <Link src={identity.links.linkedin} style={styles.link}>
                LinkedIn
              </Link>
              <Text> • </Text>
              <Link src={identity.links.github} style={styles.link}>
                GitHub
              </Link>
              <Text> • </Text>
              <Link src={identity.links.tryhackme} style={styles.link}>
                TryHackMe
              </Link>
            </View>
          </View>
        </View>

        {/* Profil */}
        <Text style={styles.sectionTitle}>Profil</Text>
        <Text style={{ marginBottom: 6 }}>{summary}</Text>

        <View style={styles.row}>
          {/* Col gauche : Expériences + Projets */}
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>
              Expériences professionnelles
            </Text>
            {experiences.map((exp: any, i: number) => (
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
                {exp.bullets.map((b: string, k: number) => (
                  <Text key={k} style={styles.bullet}>
                    • {b}
                  </Text>
                ))}
              </View>
            ))}
            <Text style={styles.sectionTitle}>Compétences</Text>
            <Text style={{ marginBottom: 4 }}>
              <Text style={{ fontWeight: 700 }}>Cybersécurité: </Text>
              {skills.security}
            </Text>
            <Text style={{ marginBottom: 4 }}>
              <Text style={{ fontWeight: 700 }}>Systèmes: </Text>
              {skills.systems}
            </Text>
            <Text style={{ marginBottom: 4 }}>
              <Text style={{ fontWeight: 700 }}>Développement: </Text>
              {skills.dev}
            </Text>
            <Text style={{ marginBottom: 4 }}>
              <Text style={{ fontWeight: 700 }}>Outils: </Text>
              {skills.tools}
            </Text>
            <Text style={{ marginBottom: 8, color: "#4a5568" }}>
              <Text style={{ fontWeight: 700 }}>Mots-clés ATS: </Text>
              {skills.ats}
            </Text>
          </View>

          {/* Col droite : Compétences + Formations + Infos */}
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Projets sélectionnés</Text>
            {featuredProjects.map((p: any, i: number) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontWeight: 700 }}>{p.name}</Text>
                {p.bullets.map((b: string, k: number) => (
                  <Text key={k} style={styles.bullet}>
                    • {b}
                  </Text>
                ))}
              </View>
            ))}

            <Text style={styles.sectionTitle}>Formations</Text>
            {education.map((e: any, i: number) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={{ fontWeight: 700 }}>{e.title}</Text>
                <Text style={{ color: "#718096" }}>
                  {e.school} | {e.period}
                </Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>Infos personnelles</Text>
            <Text style={{ marginBottom: 2 }}>
              <Text style={{ fontWeight: 700 }}>Langues: </Text>
              {personal.languages}
            </Text>
            <Text style={{ marginBottom: 2 }}>
              <Text style={{ fontWeight: 700 }}>Soft skills: </Text>
              {personal.soft}
            </Text>
            <Text>
              <Text style={{ fontWeight: 700 }}>Centres d’intérêt: </Text>
              {personal.hobbies}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
