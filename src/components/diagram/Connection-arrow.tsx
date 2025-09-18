// "use client";

// import React from "react";
// import { cn } from "@/lib/utils";

// export interface ConnectionArrowProps {
//   from: { x: number; y: number };
//   to: { x: number; y: number };
//   label: string;
//   flowType: "red-team" | "blue-team" | "shared";
//   bidirectional?: boolean;
//   className?: string;
// }

// const flowColors = {
//   "red-team": "stroke-[var(--color-feedback-danger)]",
//   "blue-team": "stroke-[var(--color-feedback-info)]",
//   shared: "stroke-[var(--color-brand-purple)]",
// };

// export const ConnectionArrow: React.FC<ConnectionArrowProps> = ({
//   from,
//   to,
//   label,
//   flowType,
//   bidirectional = false,
//   className,
// }) => {
//   const dx = to.x - from.x;
//   const dy = to.y - from.y;
//   const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

//   // Milieu pour le label
//   const midX = from.x + dx / 2;
//   const midY = from.y + dy / 2;

//   return (
//     <g className={className}>
//       <line
//         x1={from.x}
//         y1={from.y}
//         x2={to.x}
//         y2={to.y}
//         className={cn("stroke-2", flowColors[flowType])}
//         strokeDasharray={flowType === "shared" ? "5,5" : "0"}
//       />
//       <polygon
//         points="0,-6 12,0 0,6"
//         className={cn("fill-current", flowColors[flowType])}
//         transform={`translate(${to.x},${to.y}) rotate(${angle})`}
//       />
//       {bidirectional && (
//         <polygon
//           points="0,-6 -12,0 0,6"
//           className={cn("fill-current", flowColors[flowType])}
//           transform={`translate(${from.x},${from.y}) rotate(${angle})`}
//         />
//       )}
//       <text
//         x={midX}
//         y={midY - 8}
//         className="text-xs font-medium fill-[var(--color-neutral-700)] dark:fill-[var(--color-neutral-300)]"
//         textAnchor="middle"
//       >
//         {label}
//       </text>
//     </g>
//   );
// };
