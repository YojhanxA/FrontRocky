import React from "react";

export const BadgeNovedad = ({ value }) => (
  <span className={`af-badge-nov ${value === "3" ? "danger" : "neutral"}`}>
    {value}
  </span>
);
