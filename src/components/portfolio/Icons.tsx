import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

// Icons/* - Security and general icons
export const Shield: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Terminal: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <polyline
      points="4,17 10,11 4,5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="12"
      y1="19"
      x2="20"
      y2="19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Radar: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="12"
      cy="12"
      r="6"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="m12 2 0 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Loader2: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M21 12a9 9 0 1 1-6.219-8.56"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Network: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect
      x="16"
      y="16"
      width="6"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="2"
      y="16"
      width="6"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="9"
      y="2"
      width="6"
      height="6"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="m5 16 0-4 5-5" stroke="currentColor" strokeWidth="2" />
    <path d="m19 16 0-4-5-5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const GitHub: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Download: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="7,10 12,15 17,10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="12"
      y1="15"
      x2="12"
      y2="3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const External: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="15,3 21,3 21,9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="10"
      y1="14"
      x2="21"
      y2="3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Mail: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect
      width="20"
      height="16"
      x="2"
      y="4"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="m22 7-10 5L2 7" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Send: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="m22 2-7 20-4-9-9-4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 2 11 13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Check: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M20 6 9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LinkedIn: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      width="4"
      height="12"
      x="2"
      y="9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="4"
      cy="4"
      r="2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MapPin: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Eye: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const X: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="m18 6-12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m6 6 12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowLeft: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="m12 19-7-7 7-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 12H5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Dashboard: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect
      width="7"
      height="9"
      x="3"
      y="3"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      width="7"
      height="5"
      x="14"
      y="3"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      width="7"
      height="9"
      x="14"
      y="12"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      width="7"
      height="5"
      x="3"
      y="16"
      rx="1"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const Server: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect
      width="20"
      height="8"
      x="2"
      y="2"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      width="20"
      height="8"
      x="2"
      y="14"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="6"
      y1="6"
      x2="6.01"
      y2="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="6"
      y1="18"
      x2="6.01"
      y2="18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const TrendingUp: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <polyline
      points="22,7 13.5,15.5 8.5,10.5 2,17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="16,7 22,7 22,13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AlertTriangle: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 9v4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12 17h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const PhishingHook: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      width="4"
      height="12"
      x="2"
      y="9"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Firewall: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M9 9l6 6" stroke="currentColor" strokeWidth="2" />
    <path d="M15 9l-6 6" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Log: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
    <line
      x1="16"
      y1="13"
      x2="8"
      y2="13"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="16"
      y1="17"
      x2="8"
      y2="17"
      stroke="currentColor"
      strokeWidth="2"
    />
    <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Maximize2: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <polyline
      points="15,3 21,3 21,9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="9,21 3,21 3,15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="21"
      y1="3"
      x2="14"
      y2="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="3"
      y1="21"
      x2="10"
      y2="14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Minimize2: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <polyline
      points="4,14 10,14 10,20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <polyline
      points="20,10 14,10 14,4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="14"
      y1="10"
      x2="21"
      y2="3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="3"
      y1="21"
      x2="10"
      y2="14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowRight: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="m9 18 6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Calendar: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
    <line
      x1="3"
      y1="10"
      x2="21"
      y2="10"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const Clock: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const User: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Phone: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const Award: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <circle cx="12" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
    <polyline
      points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const GraduationCap: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M22 10v6M2 10l10-5 10 5-10 5z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M6 12v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Briefcase: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <rect
      x="2"
      y="7"
      width="20"
      height="14"
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const FileText: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" />
    <line
      x1="16"
      y1="13"
      x2="8"
      y2="13"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="16"
      y1="17"
      x2="8"
      y2="17"
      stroke="currentColor"
      strokeWidth="2"
    />
    <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Code: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <polyline points="16,18 22,12 16,6" stroke="currentColor" strokeWidth="2" />
    <polyline points="8,6 2,12 8,18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Globe: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <line
      x1="2"
      y1="12"
      x2="22"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const Book: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const Sun: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" />
    <line
      x1="12"
      y1="21"
      x2="12"
      y2="23"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="4.22"
      y1="4.22"
      x2="5.64"
      y2="5.64"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="18.36"
      y1="18.36"
      x2="19.78"
      y2="19.78"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" />
    <line
      x1="21"
      y1="12"
      x2="23"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="4.22"
      y1="19.78"
      x2="5.64"
      y2="18.36"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="18.36"
      y1="5.64"
      x2="19.78"
      y2="4.22"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const Moon: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const ChevronDown: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <polyline points="6,9 12,15 18,9" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const Menu: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" />
    <line
      x1="3"
      y1="12"
      x2="21"
      y2="12"
      stroke="currentColor"
      strokeWidth="2"
    />
    <line
      x1="3"
      y1="18"
      x2="21"
      y2="18"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const Filter: React.FC<IconProps> = ({
  className = "",
  size = 24,
  style,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    <polygon
      points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
