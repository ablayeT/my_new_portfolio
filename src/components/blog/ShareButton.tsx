// "use client";

// import * as React from "react";
// import { Share2 } from "lucide-react";

// export function ShareButton({ className = "" }: { className?: string }) {
//   const onClick = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href);
//     } catch {
//       // fallback très large
//       const ta = document.createElement("textarea");
//       ta.value = window.location.href;
//       ta.style.position = "fixed";
//       ta.style.opacity = "0";
//       document.body.appendChild(ta);
//       ta.select();
//       document.execCommand("copy");
//       document.body.removeChild(ta);
//     }
//   };

//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={
//         "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground " +
//         className
//       }
//       aria-label="Copier le lien de l’article"
//     >
//       <Share2 className="h-4 w-4" />
//       Partager
//     </button>
//   );
// }
