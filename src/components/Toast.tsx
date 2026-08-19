"use client";

import { useEffect, useState } from "react";

export function Toast({
  message,
  onClose,
}: {
  message: string | null;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const t = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 2600);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`toast ${visible ? "toast-in" : ""}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
