"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import type {
  Hunt,
  HuntStatus,
} from "@/data/projects/threatHuntingData/theatHunting";

function StatusBadge({ status }: { status: HuntStatus }) {
  if (status === "Running") return <Badge>Running</Badge>;
  if (status === "Done") return <Badge variant="outline">Done</Badge>;
  return <Badge variant="secondary">Draft</Badge>;
}

export function HuntTable({
  hunts,
  query,
  onQuery,
}: {
  hunts: Hunt[];
  query: string;
  onQuery: (q: string) => void;
}) {
  const filtered = React.useMemo(
    () =>
      hunts.filter(
        (h) =>
          h.title.toLowerCase().includes(query.toLowerCase()) ||
          h.hypothesis.toLowerCase().includes(query.toLowerCase()) ||
          h.technique.toLowerCase().includes(query.toLowerCase())
      ),
    [hunts, query]
  );

  return (
    <>
      <div className="mb-3 flex w-full items-center gap-2">
        <Input
          placeholder="Rechercher (technique, titre, hypothèse)"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          className="w-full md:w-72"
        />
      </div>

      <div className="overflow-x-auto rounded-md border bg-background">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Hypothèse</TableHead>
              <TableHead>ATT&CK</TableHead>
              <TableHead>Sources</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((h) => (
              <TableRow key={h.id}>
                <TableCell className="font-medium">{h.title}</TableCell>
                <TableCell className="max-w-[360px] text-sm text-muted-foreground">
                  {h.hypothesis}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{h.tactic}</Badge>{" "}
                  <Badge variant="secondary">{h.technique}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {h.sources.join(", ")}
                </TableCell>
                <TableCell>
                  <StatusBadge status={h.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
