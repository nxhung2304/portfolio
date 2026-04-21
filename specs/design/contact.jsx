import { useState, useEffect, useRef } from "react";

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s` }}>{children}</div>;
}

const SOCIALS = [
  { name: "GitHub", handle: "@yourname", desc: "Open source & side projects", color: "#333", icon: "⬡" },
  { name: "LinkedIn", handle: "in/yourname", desc: "Professional network", color: "#0a66c2", icon: "◆" },
  { name: "Twitter", handle: "@yourname", desc: "Tech thoughts & threads", color: "#1d9bf0", icon: "◇" },
  { name: "Email", handle: "hello@yourname.dev", desc: "Liên hệ trực tiếp", color: "#06b6d4", icon: "✉" },
];

export default function ContactPage() {
  const [dark, setDark] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  const root = {
    "--bg": dark ? "#0a0e17" : "#fafbfc",
    "--bg2": dark ? "#111827" : "#f1f3f6",
    "--text": dark ? "#e2e8f0" : "#1a202c",
    "--text2": dark ? "#94a3b8" : "#64748b",
    "--border": dark ? "rgba(148,163,184,0.12)" : "rgba(0,0,0,0.08)",
    "--accent": "#3b82f6",
    "--accent2": "#06b6d4",
  };

  const inputStyle = (field) => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "0.5px solid " + (focused === field ? "var(--accent)" : "var(--border)"),
    background: "transparent",
    color: "var(--text)",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxShadow: focused === field ? (dark ? "0 0 0 3px rgba(59,130,246,0.12)" : "0 0 0 3px rgba(59,130,246,0.08)") : "none",
  });

  return (
    <div style={{ ...root, background: "var(--bg)", color: "var(--text)", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", transition: "background 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { margin:0;padding:0;box-sizing:border-box; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes checkmark { 0% { transform: scale(0) rotate(-45deg); opacity: 0; } 50% { transform: scale(1.2) rotate(-45deg); } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
      `}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(20px)", background: dark ? "rgba(10,14,23,0.8)" : "rgba(250,251,252,0.85)", borderBottom: "0.5px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: -0.8, background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your.name</span>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {["about", "projects", "blog", "contact"].map(l => (
              <span key={l} style={{ fontSize: 13, color: l === "contact" ? "var(--accent)" : "var(--text2)", cursor: "pointer", fontWeight: l === "contact" ? 600 : 500 }}>{l}</span>
            ))}
            <button onClick={() => setDark(!dark)} style={{ width: 32, height: 32, borderRadius: "50%", border: "0.5px solid var(--border)", background: "transparent", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)" }}>{dark ? "☀" : "☾"}</button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
        <Reveal>
          <div style={{ padding: "60px 0 40px", textAlign: "center" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, marginBottom: 8 }}>Liên hệ</h1>
            <p style={{ fontSize: 14, color: "var(--text2)", maxWidth: 440, margin: "0 auto" }}>Có dự án muốn hợp tác? Hay chỉ muốn nói chuyện về tech? Mình luôn sẵn sàng.</p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 60 }}>
          <Reveal>
            <div>
              {sent ? (
                <div style={{ padding: "80px 32px", borderRadius: 16, border: "0.5px solid var(--border)", background: dark ? "rgba(17,24,39,0.5)" : "rgba(255,255,255,0.7)", textAlign: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #22c55e, #06b6d4)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", animation: "checkmark 0.5s ease" }}>
                    <span style={{ fontSize: 28, color: "#fff" }}>✓</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Đã gửi thành công!</h3>
                  <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, marginBottom: 20 }}>Cảm ơn bạn đã liên hệ. Mình sẽ phản hồi trong vòng 24 giờ.</p>
                  <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }} style={{ fontSize: 13, padding: "8px 20px", borderRadius: 8, border: "0.5px solid var(--border)", background: "transparent", color: "var(--accent)", cursor: "pointer", fontWeight: 500 }}>Gửi tin nhắn khác</button>
                </div>
              ) : (
                <div style={{ padding: "28px 32px", borderRadius: 16, border: "0.5px solid var(--border)", background: dark ? "rgba(17,24,39,0.5)" : "rgba(255,255,255,0.7)" }}>
                  <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 24 }}>Gửi tin nhắn</h2>

                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text2)", display: "block", marginBottom: 6 }}>Tên</label>
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="Tên của bạn" style={inputStyle("name")} />
                  </div>

                  <div style={{ marginBottom: 18 }}>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text2)", display: "block", marginBottom: 6 }}>Email</label>
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="email@example.com" style={inputStyle("email")} />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "var(--text2)", display: "block", marginBottom: 6 }}>Nội dung</label>
                    <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} placeholder="Mình muốn hợp tác về..." rows={5} style={{ ...inputStyle("message"), resize: "vertical", minHeight: 120 }} />
                  </div>

                  <button onClick={handleSubmit} disabled={sending || !form.name || !form.email || !form.message} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: (form.name && form.email && form.message) ? "linear-gradient(135deg, var(--accent), var(--accent2))" : "var(--bg2)", color: (form.name && form.email && form.message) ? "#fff" : "var(--text2)", fontSize: 14, fontWeight: 600, cursor: (form.name && form.email && form.message) ? "pointer" : "not-allowed", transition: "all 0.3s", fontFamily: "'DM Sans', sans-serif", opacity: sending ? 0.7 : 1 }}
                    onMouseEnter={e => { if (form.name && form.email && form.message && !sending) { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(59,130,246,0.3)"; } }}
                    onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}>
                    {sending ? (
                      <span style={{ animation: "pulse 1s infinite" }}>Đang gửi...</span>
                    ) : "Gửi tin nhắn"}
                  </button>
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Kết nối</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                {SOCIALS.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 12, border: "0.5px solid var(--border)", cursor: "pointer", transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.transform = "translateX(4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color + "14", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: s.color, flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 1 }}>{s.name}</p>
                      <p style={{ fontSize: 12, color: "var(--text2)" }}>{s.desc}</p>
                    </div>
                    <span style={{ fontSize: 12, color: s.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>{s.handle}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: "24px", borderRadius: 14, background: dark ? "rgba(59,130,246,0.06)" : "rgba(59,130,246,0.03)", border: "0.5px solid var(--border)" }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Response time</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ fontSize: 13, color: "var(--text2)" }}>Thường phản hồi trong 24 giờ</span>
                </div>
                <p style={{ fontSize: 12, color: "var(--text2)", marginTop: 8, lineHeight: 1.6 }}>Timezone: GMT+7 (Việt Nam). Mình check email và messages hàng ngày.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div style={{ padding: "40px", borderRadius: 16, background: "linear-gradient(135deg, var(--accent), var(--accent2))", marginBottom: 60, textAlign: "center" }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Đang tìm Full Stack / DevOps Engineer?</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginBottom: 20, maxWidth: 400, margin: "0 auto 20px" }}>Mình luôn open cho các cơ hội thú vị. Hãy kết nối nhé!</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <span style={{ fontSize: 13, padding: "10px 24px", borderRadius: 8, background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)" }}>Xem CV ↓</span>
              <span style={{ fontSize: 13, padding: "10px 24px", borderRadius: 8, background: "#fff", color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}>LinkedIn ↗</span>
            </div>
          </div>
        </Reveal>

        <footer style={{ padding: "40px 0", borderTop: "0.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text2)" }}>© 2026 your.name</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["GitHub", "LinkedIn", "Twitter"].map(s => (<span key={s} style={{ fontSize: 12, color: "var(--text2)", cursor: "pointer" }}>{s}</span>))}
          </div>
        </footer>
      </div>
    </div>
  );
}
