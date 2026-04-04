import type { NextRequest } from "next/server";
import * as React from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
import { CVDocument } from "@/components/cv/pdf/CVDocument";
import { CV_DATA } from "@/data/cv/cv";
import { CV_DATA_EN } from "@/data/cv/cv.en";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function loadImage(relativePath: string): Promise<string | undefined> {
  try {
    const ext = relativePath.split(".").pop()?.toLowerCase() ?? "jpeg";
    const mime = ext === "png" ? "image/png" : "image/jpeg";
    const buf = await readFile(join(process.cwd(), "public", relativePath));
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return undefined;
  }
}

async function toArrayBuffer(input: unknown): Promise<ArrayBuffer> {
  if (Buffer.isBuffer(input)) {
    const copy = new Uint8Array(input);
    return copy.buffer as ArrayBuffer;
  }
  const chunks: Uint8Array[] = [];
  await new Promise<void>((resolve, reject) => {
    const stream = input as NodeJS.ReadableStream;
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

export async function GET(req: NextRequest): Promise<Response> {
  const lang    = (req.nextUrl.searchParams.get("lang") ?? "fr") as "fr" | "en";
  const preview = req.nextUrl.searchParams.get("preview") === "1";

  const data =
    lang === "en"
      ? { ...CV_DATA_EN, lang: "en" as const }
      : { ...CV_DATA,    lang: "fr" as const };

  const filename =
    lang === "en"
      ? "CV_Abdoulaye_Toure_EN.pdf"
      : "CV_Abdoulaye_Toure_FR.pdf";

  const [photoDataUrl, badgeDataUrl] = await Promise.all([
    loadImage("cv/photo.jpeg"),
    loadImage("cv/microsoft-certified-fundamentals-badge.png"),
  ]);

  const element = React.createElement(CVDocument, {
    data,
    photoSrc: photoDataUrl,
    badgeSrc: badgeDataUrl,
  }) as React.ReactElement<DocumentProps>;

  try {
    const result      = await pdf(element).toBuffer();
    const arrayBuffer = await toArrayBuffer(result);

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // inline = aperçu dans le navigateur | attachment = téléchargement forcé
        "Content-Disposition": preview
          ? `inline; filename="${filename}"`
          : `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (err) {
    console.error("[CV route] PDF generation error:", err);
    return new Response("Erreur generation PDF", { status: 500 });
  }
}