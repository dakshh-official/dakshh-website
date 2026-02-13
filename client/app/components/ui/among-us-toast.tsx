"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  pushToast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function iconForType(type: ToastType): string {
  if (type === "success") return "✔";
  if (type === "error") return "✖";
  return "ℹ";
}

function colorForType(type: ToastType): string {
  if (type === "success") return "text-green-300 border-green-300/70";
  if (type === "error") return "text-red-300 border-red-300/70";
  return "text-cyan border-cyan/70";
}

export function AmongUsToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      setToasts((current) => [...current, { id, message, type }]);
      window.setTimeout(() => removeToast(id), 4200);
    },
    [removeToast]
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      pushToast,
      success: (message: string) => pushToast(message, "success"),
      error: (message: string) => pushToast(message, "error"),
      info: (message: string) => pushToast(message, "info"),
    }),
    [pushToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-100 flex w-[min(90vw,360px)] flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`hand-drawn-card p-3! rounded-2xl! bg-black/90 border-2 shadow-lg pointer-events-auto ${colorForType(
              toast.type
            )}`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-2">
              <span className="text-sm mt-0.5">{iconForType(toast.type)}</span>
              <p className="text-sm leading-snug text-white">{toast.message}</p>
              <button
                type="button"
                className="ml-auto text-white/70 hover:text-white text-xs"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useAmongUsToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useAmongUsToast must be used within AmongUsToastProvider");
  }
  return context;
}
