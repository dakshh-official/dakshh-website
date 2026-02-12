import * as React from "react";

interface EmailTemplateProps {
  email: string;
}

const events = [
  "Hackathons and coding battles",
  "Robotics and hardware challenges",
  "Design sprints and UI/UX showcases",
  "Gaming and esports face-offs",
  "Technical quizzes and innovation talks",
];

export function EmailTemplate({ email }: EmailTemplateProps) {
  const handle = email.split("@")[0] || "Crewmate";
  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        margin: 0,
        padding: "28px 14px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: "#e2e8f0",
      }}
    >
      <div
        style={{
          maxWidth: "620px",
          margin: "0 auto",
          backgroundColor: "#111827",
          border: "1px solid #334155",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg, #ef4444, #3b82f6, #22c55e)",
            padding: "18px 24px",
            color: "#ffffff",
            fontWeight: 700,
            letterSpacing: "0.4px",
          }}
        >
          TECHFEST DAKSHH: AMONG US EDITION
        </div>

        <div style={{ padding: "28px 24px" }}>
          <p style={{ margin: 0, fontSize: "16px", color: "#cbd5e1" }}>
            Incoming transmission from the ship...
          </p>

          <h1
            style={{
              margin: "12px 0 14px",
              fontSize: "30px",
              lineHeight: "36px",
              color: "#f8fafc",
            }}
          >
            Welcome aboard, {handle}!
          </h1>

          <p
            style={{ margin: "0 0 16px", fontSize: "16px", lineHeight: "24px" }}
          >
            You are officially part of <strong>TechFest Dakshh</strong>, where
            this year&apos;s mission theme is <strong>Among Us</strong>. Suit
            up, gather your crewmates, and complete as many challenges as you
            can.
          </p>

          <div
            style={{
              border: "1px solid #334155",
              borderRadius: "12px",
              padding: "16px",
              backgroundColor: "#0b1220",
              margin: "0 0 18px",
            }}
          >
            <p
              style={{ margin: "0 0 10px", fontWeight: 700, color: "#f8fafc" }}
            >
              Mission Board
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                color: "#cbd5e1",
                lineHeight: "24px",
              }}
            >
              {events.map((event) => (
                <li key={event}>{event}</li>
              ))}
            </ul>
          </div>

          <p
            style={{ margin: "0 0 20px", fontSize: "16px", lineHeight: "24px" }}
          >
            Participate across events, earn recognition, and make your crew
            proud. The more tasks you complete, the closer you get to becoming a
            festival MVP.
          </p>

          <a
            href="https://dakshh-hitk.com"
            style={{
              display: "inline-block",
              padding: "12px 18px",
              borderRadius: "10px",
              backgroundColor: "#22c55e",
              color: "#06210e",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Start Your Mission
          </a>

          <p
            style={{
              margin: "20px 0 0",
              color: "#94a3b8",
              fontSize: "14px",
              lineHeight: "22px",
            }}
          >
            Stay alert. Stay curious. And remember: in TechFest Dakshh, every
            challenge is an opportunity to level up.
          </p>
        </div>
      </div>
    </div>
  );
}
