import React from "react";

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export function LoadingSpinner({
  className,
  size = "md",
  color = "#3498db", // Default color (blue)
  ...props
}: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: { width: "16px", height: "16px", borderWidth: "2px" },
    md: { width: "32px", height: "32px", borderWidth: "4px" },
    lg: { width: "48px", height: "48px", borderWidth: "6px" },
  };

  const spinnerStyle = {
    ...sizeStyles[size],
    borderColor: `${color} transparent transparent transparent`,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...props.style,
      }}
      role="status"
      aria-label="Loading..."
      className={className}
    >
      <div
        style={{
          ...spinnerStyle,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}