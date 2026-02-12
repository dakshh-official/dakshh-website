import * as React from "react";

interface OtpEmailTemplateProps {
  otp: string;
}

export function OtpEmailTemplate({ otp }: OtpEmailTemplateProps) {
  return (
    <div
      style={{
        backgroundColor: "#020617",
        margin: 0,
        padding: "24px 14px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: "#e2e8f0",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          backgroundColor: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "14px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg, #3b82f6, #06b6d4)",
            padding: "16px 20px",
            color: "#ffffff",
            fontWeight: 700,
          }}
        >
          DAKSHH OTP VERIFICATION
        </div>

        <div style={{ padding: "22px 20px" }}>
          <h1 style={{ margin: "0 0 12px", fontSize: "24px", color: "#f8fafc" }}>
            Confirm your account
          </h1>
          <p style={{ margin: "0 0 14px", lineHeight: "24px" }}>
            Use this one-time code to verify your account and complete your onboarding mission.
          </p>

          <div
            style={{
              borderRadius: "12px",
              border: "1px solid #475569",
              backgroundColor: "#020617",
              padding: "14px 16px",
              textAlign: "center",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                letterSpacing: "6px",
                fontSize: "28px",
                fontWeight: 800,
                color: "#22d3ee",
              }}
            >
              {otp}
            </span>
          </div>

          <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8", lineHeight: "20px" }}>
            This code expires in 10 minutes. If you did not request this, you can safely ignore
            this email.
          </p>
        </div>
      </div>
    </div>
  );
}
