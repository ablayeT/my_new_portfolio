// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

function bool(v: string | undefined, fallback = false) {
  if (v == null) return fallback;
  return v === "true" || v === "1";
}

export async function POST(req: NextRequest) {
  const isProd = process.env.NODE_ENV === "production";

  try {
    const { name, email, subject, message, consent } = await req.json();

    if (!name || !email || !message || !consent) {
      return NextResponse.json(
        { error: "Champs requis manquants." },
        { status: 400 }
      );
    }

    // --- Transport SMTP principal (ex: Gmail ou Mailtrap) ---
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: bool(process.env.SMTP_SECURE, false), // true pour 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      requireTLS: true,
      tls: { minVersion: "TLSv1.2" },
      logger: !isProd,
      debug: !isProd,
    });

    // Vérifie la connexion
    try {
      await transporter.verify();
    } catch (e: any) {
      console.error("SMTP verify failed:", {
        message: e?.message,
        code: e?.code,
        command: e?.command,
        response: e?.response,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        userHint: process.env.SMTP_USER ? "(présent)" : "(manquant)",
      });

      // Fallback uniquement en DEV : compte de test Nodemailer (Ethereal)
      if (!isProd) {
        const test = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: test.user,
            pass: test.pass,
          },
        });
        console.log("Fallback Ethereal activé (DEV). Identifiants générés.");
      } else {
        return NextResponse.json(
          {
            error:
              "Erreur SMTP: vérifiez host/port/secure et les identifiants (voir logs serveur).",
          },
          { status: 500 }
        );
      }
    }

    // Pour Gmail : le FROM doit être l’adresse authentifiée
    const fromEmail = process.env.SMTP_USER!;
    const fromName = process.env.MAIL_FROM_NAME || "Portfolio Contact";
    const to = process.env.CONTACT_TO || fromEmail;

    const html = `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      ${subject ? `<p><strong>Sujet :</strong> ${subject}</p>` : ""}
      <p><strong>Message :</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
      <hr />
      <p>Consentement RGPD : ${consent ? "Oui" : "Non"}</p>
      <p>Reçu le : ${new Date().toLocaleString()}</p>
    `;

    const info = await transporter.sendMail({
      to,
      from: `"${fromName}" <${fromEmail}>`,
      replyTo: email,
      subject: subject ? `Contact: ${subject}` : "Nouveau message de contact",
      html,
    });

    // En DEV avec Ethereal, affiche l’URL de prévisualisation
    if (!isProd && nodemailer.getTestMessageUrl(info)) {
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
      return NextResponse.json({
        ok: true,
        preview: nodemailer.getTestMessageUrl(info),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact API error:", err?.message || err);
    return NextResponse.json(
      { error: "Impossible d'envoyer l'e-mail." },
      { status: 500 }
    );
  }
}
