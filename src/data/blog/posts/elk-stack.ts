// src/data/blog/posts/elk-stack.ts
import type { BlogPostInput } from "../types";

export const postElk: BlogPostInput = {
  id: 4,
  slug: "analyse-logs-elk-stack",
  title: "Analyse de Logs avec ELK Stack",
  excerpt:
    "Pipelines Logstash prêts à l’emploi, champs ECS, dashboards Kibana, et corrélations pour des détections fiables.",
  date: "1 décembre 2024",
  isoDate: "2024-12-01",
  category: "SIEM",
  tags: ["ELK", "ECS", "Kibana", "Logstash", "Suricata"],
  featured: false,
  content: [
    {
      type: "p",
      text: "Standardisez vos logs avec ECS pour corréler facilement événements réseau, système et application. Utilisez des pipelines Logstash simples et testables.",
    },
    { type: "h2", text: "Pipeline Logstash (nginx + syslog)" },
    {
      type: "code",
      lang: "conf",
      code: `input { beats { port => 5044 } }
filter {
  if [fileset][module] == "nginx" {
    grok { match => { "message" => "%{NGINXACCESS}" } }
    mutate { add_field => { "event.dataset" => "nginx.access" } }
  }
  if [event][module] == "system" {
    # syslog → ECS
    mutate { add_field => { "event.dataset" => "system.syslog" } }
  }
}
output {
  elasticsearch { hosts => ["http://elasticsearch:9200"] index => "logs-%{+YYYY.MM.dd}" }
}`,
    },
    { type: "h2", text: "Exemple de corrélation (KQL Kibana)" },
    {
      type: "code",
      lang: "kql",
      code: `event.dataset: "nginx.access" and url.path: "/wp-login.php" and http.response.status_code: 401`,
    },
    { type: "h3", text: "Suricata → ELK" },
    {
      type: "code",
      lang: "yaml",
      code: `# filebeat suricata.yml
- type: log
  enabled: true
  paths: ["/var/log/suricata/eve.json"]
  json.keys_under_root: true
  processors:
    - add_fields: { target: "", fields: { event.module: "suricata" } }`,
    },
    {
      type: "callout",
      intent: "info",
      text: "Versionnez vos dashboards Kibana (export NDJSON), nommez vos règles et corrélations avec un préfixe explicite (SEC_, DET_, LAB_).",
    },
  ],
};
