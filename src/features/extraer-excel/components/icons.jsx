import React from "react";

export const Icon = {
  home: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path fill="currentColor" d="M12 3l9 7h-2v9h-5v-6H10v6H5v-9H3z" />
    </svg>
  ),
  upload: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M5 20h14v-2H5v2zM12 2l5 5h-3v6h-4V7H7l5-5z"
      />
    </svg>
  ),
  file: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12V8z"
      />
      <path fill="currentColor" d="M14 2v6h6" />
    </svg>
  ),
  building: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M3 22h18v-2H3v2zm2-4h14V3H5v15zm2-2V5h10v11H7z"
      />
    </svg>
  ),
  calendar: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 8H4v10h16V10z"
      />
    </svg>
  ),
  sheet: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M4 3h11l5 5v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
      />
      <path fill="currentColor" d="M15 3v6h6" />
    </svg>
  ),
  bell: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
      <path
        fill="currentColor"
        d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2z"
      />
    </svg>
  ),
};
