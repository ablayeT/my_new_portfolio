// src/data/blog/posts/threat-hunting.ts
import type { BlogPostInput } from "../types";

export const postHunting: BlogPostInput = {
  id: 6,
  slug: "introduction-threat-hunting",
  title: "Introduction au Threat Hunting",
  excerpt:
    "Formuler des hypothèses basées sur ATT&CK, exploiter des sources de vérité robustes et capitaliser en règles et playbooks.",
  date: "20 novembre 2024",
  isoDate: "2024-11-20",
  category: "Detection",
  tags: ["Threat Hunting", "SOC", "KQL", "Hypothèses"],
  featured: false,
  content: [
    {
      type: "p",
      text: "Le hunting comble l’écart entre signaux faibles et règles de détection. On part d’une hypothèse, on collecte des preuves, on conclut, puis on transforme en règle.",
    },
    { type: "h2", text: "Sources de vérité" },
    {
      type: "ul",
      items: [
        "EDR telemetry",
        "DNS/Proxy",
        "Windows Security + Sysmon",
        "Netflow/PCAP",
      ],
    },
    { type: "h2", text: "Exemple d’hypothèse (ATT&CK T1047 WMI)" },
    {
      type: "quote",
      text: "Des acteurs utilisent WMI pour exécuter des commandes à distance sans outils externes.",
    },
    {
      type: "code",
      lang: "kql",
      code: `// Exécutions WMI suspectes
DeviceProcessEvents
| where ProcessCommandLine has "wmic"
| where ProcessCommandLine has "process call create"
| summarize count() by InitiatingProcessAccountName, bin(Timestamp, 1h)`,
    },
    { type: "h2", text: "Playbook (extrait)" },
    {
      type: "steps",
      items: [
        {
          title: "Collecte",
          detail: "Récupérer événements 4688/4104 + telemetry EDR 7 jours.",
        },
        {
          title: "Filtrage",
          detail: "Isoler les comptes/hosts administratifs attendus.",
        },
        {
          title: "Triangulation",
          detail: "Corréler avec authent (4624/4625), DNS, proxy.",
        },
        {
          title: "Conclusion",
          detail: "Documenter IOC/IOA; convertir en règle SIEM + runbook.",
        },
      ],
    },
  ],
};
