// src/data/blog/posts/python-automation.ts
import type { BlogPostInput } from "../types";

export const postPython: BlogPostInput = {
  id: 3,
  slug: "automatisation-tests-securite-python",
  title: "Automatisation des Tests de Sécurité avec Python",
  excerpt:
    "Inventaire d’hôtes, scans, parsing de résultats, génération de rapports et intégration SIEM : une boîte à outils Python prête à l’emploi.",
  date: "5 décembre 2024",
  isoDate: "2024-12-05",
  category: "Développement",
  tags: ["Python", "Automatisation", "Pentest", "API", "Rapports"],
  featured: false,
  content: [
    {
      type: "p",
      text: "Des scripts concis peuvent accélérer vos audits et réduisent les erreurs manuelles. Voici des snippets réutilisables et patterns testés en production.",
    },
    { type: "h2", text: "Découverte réseau (async)" },
    {
      type: "code",
      lang: "python",
      code: `# Découverte ICMP/TCP en async (extrait)
import asyncio, ipaddress, socket

async def ping(host: str) -> bool:
    proc = await asyncio.create_subprocess_exec(
        "ping", "-c", "1", "-W", "1", host, stdout=asyncio.subprocess.DEVNULL
    )
    await proc.communicate()
    return proc.returncode == 0

async def scan_cidr(cidr: str):
    net = ipaddress.ip_network(cidr, strict=False)
    tasks = [ping(str(ip)) for ip in net.hosts()]
    results = await asyncio.gather(*tasks)
    return [str(ip) for ip, ok in zip(net.hosts(), results) if ok]

if __name__ == "__main__":
    alive = asyncio.run(scan_cidr("10.10.0.0/24"))
    print(alive)`,
    },
    { type: "h2", text: "Parsing Nmap XML → dict" },
    {
      type: "code",
      lang: "python",
      code: `import xml.etree.ElementTree as ET

def parse_nmap_xml(path: str):
    root = ET.parse(path).getroot()
    hosts = []
    for h in root.findall("host"):
        addr = h.find("address").get("addr")
        open_ports = []
        for p in h.findall(".//port"):
            if p.find("state").get("state") == "open":
                open_ports.append(int(p.get("portid")))
        hosts.append({"ip": addr, "open_ports": open_ports})
    return hosts`,
    },
    { type: "h2", text: "Générer un rapport Markdown" },
    {
      type: "code",
      lang: "python",
      code: `def to_markdown(hosts: list[dict]) -> str:
    lines = ["# Rapport Nmap", ""]
    for h in hosts:
        lines.append(f"## {h['ip']}")
        if h["open_ports"]:
            ports = ", ".join(map(str, h["open_ports"]))
            lines.append(f"Ports ouverts: **{ports}**")
        else:
            lines.append("Aucun port ouvert")
        lines.append("")
    return "\\n".join(lines)`,
    },
    { type: "h2", text: "Envoi vers SIEM (Elasticsearch)" },
    {
      type: "code",
      lang: "python",
      code: `from elasticsearch import Elasticsearch
es = Elasticsearch("http://localhost:9200")

def send_to_es(index: str, doc: dict):
    es.index(index=index, document=doc)

# send_to_es("nmap-hosts", {"ip": "10.10.0.15", "open_ports": [22,80]})`,
    },
    {
      type: "callout",
      intent: "warning",
      title: "Sécurité",
      text: "Gérez vos secrets avec un vault ou variables d’environnement. Loggez les erreurs, versionnez vos requêtes et rapports.",
    },
  ],
};
