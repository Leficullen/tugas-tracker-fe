"use client";
import { useState } from "react";

export default function usePopup() {
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );
  const [message, setMessage] = useState<string | null>(null);

  function showSuccess(msg: string) {
    setMessageType("success");
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  }

  function showError(msg: string) {
    setMessageType("error");
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  }

  return {
    message,
    messageType,
    showSuccess,
    showError,
  };
}
