// src/app/cv/download/route.ts
import * as React from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pdf } from "@react-pdf/renderer";
import { CVDocument } from "@/components/cv/pdf/CVDocument";
import { CV_DATA, CV_ASSET } from "@/data/cv/cv";

export const runtime = "nodejs";

export async function GET() {
  let photoDataUrl: string | undefined;
  try {
    const img = await readFile(
      join(process.cwd(), "public", "cv", "photo.jpeg")
    );
    photoDataUrl = `data:image/jpeg;base64,${img.toString("base64")}`;
  } catch {}

  const element = React.createElement(CVDocument as any, {
    data: CV_DATA,
    photoSrc: photoDataUrl,
  });

  const bytes = (await pdf(element as any).toBuffer()) as unknown as Uint8Array;

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${CV_ASSET.filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
