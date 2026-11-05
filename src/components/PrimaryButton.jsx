import React from "react";
import { Link } from "react-router-dom";

export default function PrimaryButton({
  children,
  to,
  href,
  onClick,
  variant = "darkest",
  className = "",
  style = {},
  ...props
}) {
  const combinedClass = `primary-button ${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClass} style={style} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClass} style={style} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClass} style={style} {...props}>
      {children}
    </button>
  );
}
