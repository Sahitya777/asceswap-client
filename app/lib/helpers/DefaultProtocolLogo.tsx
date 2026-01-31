// DefaultProtocolLogo.tsx
import React from "react";

export const DefaultProtocolLogo: React.FC<{ size?: number }> = ({
  size = 16,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #64748b, #334155)",
      color: "white",
      fontSize: size * 0.6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
    }}
  >
    ?
  </div>
);
