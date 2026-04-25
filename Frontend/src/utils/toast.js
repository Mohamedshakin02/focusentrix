import toast from "react-hot-toast";

// Customized toast notifications for different purposes in the site.
const baseStyle = {
  background: "#0e0b1e",
  color: "#ffffff",
  border: "1px solid #2a1a40",
  padding: "12px 14px",
  borderRadius: "12px",
  fontSize: "13px",
};

export const CustomizedToast = {
  success: (msg) =>
    toast.success(msg, {
      style: {
        ...baseStyle,
        border: "1px solid #2e7d32",
      },
      iconTheme: {
        primary: "#22c55e",
        secondary: "#0e0b1e",
      },
    }),

  error: (msg) =>
    toast.error(msg, {
      style: {
        ...baseStyle,
        border: "1px solid #ef4444",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#0e0b1e",
      },
    }),

  warning: (msg) =>
    toast(msg, {
      icon: "⚠️",
      style: {
        ...baseStyle,
        border: "1px solid #f59e0b",
      },
    }),

  info: (msg) =>
    toast(msg, {
      icon: "💡",
      style: baseStyle,
    }),

  focus: (msg) =>
    toast(msg, {
      icon: "🎯",
      style: {
        ...baseStyle,
        border: "1px solid #9b59f5",
        boxShadow: "0 0 20px rgba(155, 89, 245, 0.25)",
      },
    }),
};