// src/app/cv/download/route.ts
import type { NextRequest } from "next/server";
import * as React from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
import { CVDocument } from "@/components/cv/pdf/CVDocument";
import { CV_DATA } from "@/data/cv/cv";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest): Promise<Response> {
  // 1) Photo optionnelle
  let photoDataUrl: string | undefined;
  try {
    const img = await readFile(
      join(process.cwd(), "public", "cv", "photo.jpeg")
    );
    photoDataUrl = `data:image/jpeg;base64,${img.toString("base64")}`;
  } catch {
    // pas bloquant si la photo n'existe pas
  }

  // 2) Élément React du Document PDF
  const element = React.createElement(CVDocument, {
    data: CV_DATA,
    photoSrc: photoDataUrl,
  }) as React.ReactElement<DocumentProps>;

  // 3) Solution : traiter le ReadableStream correctement
  try {
    const pdfStream = await pdf(element).toBuffer();

    // Vérifier si c'est déjà un Buffer (versions anciennes)
    if (Buffer.isBuffer(pdfStream)) {
      const body = new Uint8Array(pdfStream);
      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="cv_Abdou_cyber.pdf"',
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      });
    }

    // Si c'est un ReadableStream, le convertir en Buffer
    const stream = pdfStream as NodeJS.ReadableStream;
    const chunks: Buffer[] = [];

    return new Promise<Response>((resolve, reject) => {
      stream.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      stream.on("end", () => {
        try {
          const buffer = Buffer.concat(chunks);
          const body = new Uint8Array(buffer);

          resolve(
            new Response(body, {
              status: 200,
              headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition":
                  'attachment; filename="cv_Abdou_cyber.pdf"',
                "Cache-Control":
                  "no-store, no-cache, must-revalidate, max-age=0",
              },
            })
          );
        } catch (error) {
          reject(error);
        }
      });

      stream.on("error", (error) => {
        reject(error);
      });
    });
  } catch (error) {
    // Fallback : utiliser toBlob() si toBuffer() ne fonctionne pas
    try {
      const pdfBlob = await pdf(element).toBlob();
      const arrayBuffer = await pdfBlob.arrayBuffer();
      const body = new Uint8Array(arrayBuffer);

      return new Response(body, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="cv_Abdou_cyber.pdf"',
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      });
    } catch (blobError) {
      console.error("Erreur lors de la génération du PDF:", error, blobError);
      return new Response("Erreur lors de la génération du PDF", {
        status: 500,
      });
    }
  }
}
