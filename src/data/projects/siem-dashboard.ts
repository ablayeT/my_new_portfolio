import type { ProjectDetail } from "./types";

export const siemDashboard: ProjectDetail = {
  id: "siem-dashboard",
  title: "Dashboard SIEM Personnalisé (ELK + Beats)",
  short:
    "Supervision & détection centralisées ELK, collectes Filebeat/Winlogbeat, enrichissements GeoIP et User-Agent, dashboards Windows/Linux/App et alertes SOC.",
  tags: ["SIEM", "ELK", "Beats", "Alerting", "GeoIP", "MITRE ATT&CK"],
  lastUpdated: "2025-09-17",
  kpis: [
    { label: "Sources de logs", value: "3+", hint: "Windows, Linux, App" },
    {
      label: "Règles d’alerte",
      value: "15+",
      hint: "Brute-force, 5xx, privilèges",
    },
    { label: "Dashboards", value: "4", hint: "Windows, Linux, App, Global" },
    { label: "Enrichissements", value: "2", hint: "GeoIP, User-Agent" },
  ],
  sections: [
    { type: "h2", text: "Objectif & Contexte" },
    {
      type: "p",
      text: "Concevoir un SIEM opérationnel fondé sur ELK (Elasticsearch, Logstash, Kibana) avec Beats (Filebeat/Winlogbeat). Cible : visibilité temps réel, détection d’événements critiques et accélération de l’investigation SOC sur systèmes hétérogènes.",
    },

    { type: "h2", text: "Architecture (vue d’ensemble)" },
    {
      type: "ul",
      items: [
        "Sources : Windows (Security/Sysmon via Winlogbeat), Linux (/var/log via Filebeat), Application (logs HTTP).",
        "Pipeline : Beats → Logstash (enrichissements GeoIP & User-Agent) → Elasticsearch → Kibana.",
        "Dashboards : Vue globale + vues dédiées Windows / Linux / Application.",
        "Alertes : échecs d’authentification, élévations de privilèges, erreurs HTTP 5xx, brute-force SSH.",
      ],
    },

    { type: "h2", text: "Configuration (extraits reproductibles)" },
    {
      type: "code",
      lang: "yaml",
      code:
        "# filebeat.yml (Linux)\n" +
        "filebeat.inputs:\n" +
        "  - type: log\n" +
        "    paths:\n" +
        "      - /var/log/syslog\n" +
        "      - /var/log/auth.log\n" +
        "processors:\n" +
        "  - add_fields:\n" +
        "      target: project\n" +
        "      fields:\n" +
        "        name: siem-dashboard\n" +
        "output.logstash:\n" +
        '  hosts: ["localhost:5044"]',
    },
    {
      type: "code",
      lang: "yaml",
      code:
        "# winlogbeat.yml (Windows)\n" +
        "winlogbeat.event_logs:\n" +
        "  - name: Security\n" +
        "  - name: System\n" +
        "  - name: Application\n" +
        "output.logstash:\n" +
        '  hosts: ["localhost:5044"]',
    },
    {
      type: "code",
      lang: "conf",
      code:
        "# logstash.conf (pipeline enrichi)\n" +
        "input { beats { port => 5044 } }\n" +
        "filter {\n" +
        '  geoip { source => "[source][ip]" }\n' +
        '  useragent { source => "user_agent.original" }\n' +
        "}\n" +
        "output {\n" +
        "  elasticsearch {\n" +
        '    hosts => ["http://localhost:9200"]\n' +
        '    index => "siem-%{+YYYY.MM.dd}"\n' +
        "  }\n" +
        "}",
    },

    { type: "h2", text: "Docker Compose (démo locale rapide)" },
    {
      type: "code",
      lang: "yaml",
      code:
        'version: "3.9"\n' +
        "services:\n" +
        "  elasticsearch:\n" +
        "    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.4\n" +
        "    environment:\n" +
        "      - discovery.type=single-node\n" +
        "      - xpack.security.enabled=false\n" +
        '    ports: ["9200:9200"]\n' +
        "  kibana:\n" +
        "    image: docker.elastic.co/kibana/kibana:8.13.4\n" +
        "    environment:\n" +
        "      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200\n" +
        "    depends_on: [elasticsearch]\n" +
        '    ports: ["5601:5601"]\n' +
        "  logstash:\n" +
        "    image: docker.elastic.co/logstash/logstash:8.13.4\n" +
        "    volumes:\n" +
        "      - ./pipeline:/usr/share/logstash/pipeline\n" +
        "    depends_on: [elasticsearch]\n" +
        '    ports: ["5044:5044"]',
    },

    { type: "h2", text: "Résultats attendus" },
    {
      type: "ul",
      items: [
        "Collecte unifiée Windows / Linux / App.",
        "Détections validées (SSH brute-force, 5xx burst, privilèges).",
        "Dashboards clairs pour investigations rapides et audits.",
      ],
    },
  ],
};
