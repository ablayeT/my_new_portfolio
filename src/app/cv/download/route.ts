import type { NextRequest } from "next/server";
import * as React from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
import { CVDocument } from "@/components/cv/pdf/CVDocument";
import { CV_DATA } from "@/data/cv/cv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function loadImage(relativePath: string): Promise<string | undefined> {
  try {
    const ext = relativePath.split(".").pop()?.toLowerCase();
    const mime = ext === "png" ? "image/png" : "image/jpeg";
    const buf = await readFile(join(process.cwd(), "public", relativePath));
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return undefined;
  }
}

async function toArrayBuffer(result: unknown): Promise<ArrayBuffer> {
  if (Buffer.isBuffer(result)) {
    // Copie propre du buffer pour obtenir un ArrayBuffer standalone
    const copy = new Uint8Array(result);
    return copy.buffer as ArrayBuffer;
  }
  // Fallback ReadableStream
  const chunks: Uint8Array[] = [];
  await new Promise<void>((resolve, reject) => {
    const stream = result as NodeJS.ReadableStream;
    stream.on("data", (c: Buffer) => chunks.push(new Uint8Array(c)));
    stream.on("end", resolve);
    stream.on("error", reject);
  });
  const total = chunks.reduce((acc, c) => acc + c.byteLength, 0);
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return merged.buffer as ArrayBuffer;
}

export async function GET(_req: NextRequest): Promise<Response> {
  const [photoDataUrl, badgeDataUrl] = await Promise.all([
    loadImage("cv/photo.jpeg"),
    loadImage("cv/microsoft-certified-fundamentals-badge.png"),
  ]);

  const element = React.createElement(CVDocument, {
    data:     CV_DATA,
    photoSrc: photoDataUrl,
    badgeSrc: badgeDataUrl,
  }) as React.ReactElement<DocumentProps>;

  try {
    const result      = await pdf(element).toBuffer();
    const arrayBuffer = await toArrayBuffer(result);

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": 'attachment; filename="CV_Abdoulaye_Toure.pdf"',
        "Cache-Control":       "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (err) {
    console.error("[CV route] PDF generation error:", err);
    return new Response("Erreur generation PDF", { status: 500 });
  }
}