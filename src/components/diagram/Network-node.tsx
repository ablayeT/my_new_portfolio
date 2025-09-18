// import React from "react";
// import { cn } from "../ui/utils";

// export interface NetworkNodeProps {
//   icon: React.ReactNode;
//   label: string;
//   description: string;
//   nodeType: "attacker" | "phishing" | "victim" | "surveillance" | "portfolio";
//   className?: string;
//   size?: "sm" | "md" | "lg";
// }

// const nodeTypeStyles = {
//   attacker:
//     "border-[var(--color-feedback-danger)] bg-[var(--color-feedback-danger)]/10",
//   phishing:
//     "border-[var(--color-feedback-warning)] bg-[var(--color-feedback-warning)]/10",
//   victim: "border-[var(--color-neutral-500)] bg-[var(--color-neutral-100)]",
//   surveillance:
//     "border-[var(--color-feedback-info)] bg-[var(--color-feedback-info)]/10",
//   portfolio:
//     "border-[var(--color-brand-security-green)] bg-[var(--color-brand-security-green)]/10",
// };

// const sizeStyles = {
//   sm: "w-24 h-20 p-2",
//   md: "w-32 h-28 p-3",
//   lg: "w-40 h-32 p-4",
// };

// export const NetworkNode: React.FC<NetworkNodeProps> = ({
//   icon,
//   label,
//   description,
//   nodeType,
//   className = "",
//   size = "md",
// }) => {
//   return (
//     <div
//       className={cn(
//         "border-2 rounded-[var(--radius-12)] flex flex-col items-center justify-center text-center transition-all hover:shadow-[var(--shadow-md)]",
//         "dark:bg-opacity-20",
//         nodeTypeStyles[nodeType],
//         sizeStyles[size],
//         className
//       )}
//     >
//       <div className="mb-2">{icon}</div>
//       <div className="text-xs font-semibold text-[var(--color-neutral-950)] dark:text-[var(--color-neutral-0)] mb-1">
//         {label}
//       </div>
//       <div className="text-xs text-[var(--color-neutral-500)] dark:text-[var(--color-neutral-400)] leading-tight">
//         {description}
//       </div>
//     </div>
//   );
// };
