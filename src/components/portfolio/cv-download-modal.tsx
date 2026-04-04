"use client";

import { useCallback, useState } from "react";
import { Download, Eye, X, Globe, FileText, Check } from "lucide-react";

export interface CVDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

type Lang = "fr" | "en";

const LANGS = [
  {
    id: "fr" as Lang,
    flag: "🇫🇷",
    label: "Français",
    sublabel: "Version française",
    filename: "CV_Abdoulaye_Toure_FR.pdf",
  },
  {
    id: "en" as Lang,
    flag: "🇬🇧",
    label: "English",
    sublabel: "English version",
    filename: "CV_Abdoulaye_Toure_EN.pdf",
  },
];

export const CVDownloadModal = ({ isOpen, onClose }: CVDownloadModalProps) => {
  const [selectedLang, setSelectedLang] = useState<Lang>("fr");
  const [downloading, setDownloading]   = useState(false);

  // ── Aperçu : ouvre le PDF inline dans un nouvel onglet (pas de téléchargement)
  const handlePreview = useCallback(() => {
    window.open(
      `/cv/download?lang=${selectedLang}&preview=1`,
      "_blank",
      "noopener,noreferrer"
    );
  }, [selectedLang]);

  // ── Téléchargement : force le download via Content-Disposition attachment
  const handleDownload = useCallback(async () => {
    setDownloading(true);
    try {
      const lang = LANGS.find((l) => l.id === selectedLang)!;
      const a = document.createElement("a");
      a.href = `/cv/download?lang=${selectedLang}`;
      a.download = lang.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(onClose, 800);
    } finally {
      setDownloading(false);
    }
  }, [selectedLang, onClose]);

  if (!isOpen) return null;

  const selected = LANGS.find((l) => l.id === selectedLang)!;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-[101] w-[92vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl overflow-hidden
        bg-white border border-slate-200
        dark:bg-slate-900 dark:border-slate-700">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4
          border-b border-slate-200 dark:border-slate-700
          bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg
              bg-blue-50 dark:bg-blue-900/30">
              <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Télécharger le CV
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Choisissez la langue
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors
              text-slate-400 hover:text-slate-600 hover:bg-slate-100
              dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-700"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-5 space-y-4">

          {/* ── Sélection langue ────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3">
            {LANGS.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={[
                  "relative flex flex-col items-center gap-2.5 rounded-xl border-2 p-4 transition-all text-center",
                  selectedLang === lang.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400"
                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:border-blue-500 dark:hover:bg-slate-800",
                ].join(" ")}
              >
                {selectedLang === lang.id && (
                  <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500">
                    <Check size={11} className="text-white" />
                  </span>
                )}
                <span className="text-3xl">{lang.flag}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {lang.label}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang.sublabel}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* ── Info fichier ────────────────────────────────────── */}
          <div className="flex items-center gap-2.5 rounded-lg px-3 py-2.5
            border border-slate-200 bg-slate-50
            dark:border-slate-700 dark:bg-slate-800/50">
            <FileText size={14} className="shrink-0 text-slate-400 dark:text-slate-500" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                {selected.filename}
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">
                Généré en temps réel · Format PDF
              </p>
            </div>
          </div>

          {/* ── Actions ─────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3">

            {/* Aperçu — ouvre dans l'onglet, pas de téléchargement */}
            <button
              onClick={handlePreview}
              className="flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors
                border-slate-200 text-slate-700 hover:bg-slate-100
                dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Eye size={14} />
              Aperçu
            </button>

            {/* Télécharger — force le download */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors
                bg-blue-600 text-white hover:bg-blue-700
                dark:bg-blue-500 dark:hover:bg-blue-600
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloading ? (
                <>
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Génération…
                </>
              ) : (
                <>
                  <Download size={14} />
                  Télécharger
                </>
              )}
            </button>
          </div>

          {/* ── Footer ──────────────────────────────────────────── */}
          <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
            Mis à jour : Avril 2026 · abdou-cyber.dev
          </p>

        </div>
      </div>
    </>
  );
};