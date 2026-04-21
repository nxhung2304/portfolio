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

const TIMELINE = [
  { year: "2024 — nay", role: "Senior DevOps Engineer", company: "Tech Corp", desc: "Thiết kế CI/CD pipeline, quản lý Kubernetes clusters, tối ưu infrastructure cost 40%.", type: "work" },
  { year: "2022 — 2024", role: "Full Stack Developer", company: "Startup XYZ", desc: "Phát triển SaaS platform với Vue + Node.js, phục vụ 50K+ users.", type: "work" },
  { year: "2020 — 2022", role: "Backend Developer", company: "Agency ABC", desc: "Xây dựng REST APIs, microservices, database optimization.", type: "work" },
  { year: "2016 — 2020", role: "Computer Science", company: "Đại học Bách Khoa", desc: "Tốt nghiệp loại giỏi, chuyên ngành Công nghệ phần mềm.", type: "edu" },
];

const SKILLS = [
  { cat: "Frontend", items: ["Vue.js", "React", "TypeScript", "Tailwind CSS", "Nuxt.js"], color: "#3b82f6" },
  { cat: "Backend", items: ["Node.js", "Python", "Go", "PostgreSQL", "Redis"], color: "#06b6d4" },
  { cat: "DevOps", items: ["Docker", "Kubernetes", "Terraform", "AWS", "GCP"], color: "#8b5cf6" },
  { cat: "Tools", items: ["Git", "CI/CD", "Grafana", "Prometheus", "Linux"], color: "#f59e0b" },
];

const STATS = [
  { num: "5+", label: "Năm kinh nghiệm" },
  { num: "30+", label: "Dự án hoàn thành" },
  { num: "50K+", label: "Users phục vụ" },
  { num: "99.9%", label: "Uptime đạt được" },
];

export default function AboutPage() {
  const [dark, setDark] = useState(false);

  const root = {
    "--bg": dark ? "#0a0e17" : "#fafbfc",
    "--bg2": dark ? "#111827" : "#f1f3f6",
    "--text": dark ? "#e2e8f0" : "#1a202c",
    "--text2": dark ? "#94a3b8" : "#64748b",
    "--border": dark ? "rgba(148,163,184,0.12)" : "rgba(0,0,0,0.08)",
    "--accent": "#3b82f6",
    "--accent2": "#06b6d4",
  };

  return (
    <div style={{ ...root, background: "var(--bg)", color: "var(--text)", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", transition: "background 0.4s, color 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        * { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(20px)", background: dark ? "rgba(10,14,23,0.8)" : "rgba(250,251,252,0.85)", borderBottom: "0.5px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: -0.8, background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your.name</span>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {["about", "projects", "blog", "contact"].map((l, i) => (
              <span key={l} style={{ fontSize: 13, color: l === "about" ? "var(--accent)" : "var(--text2)", cursor: "pointer", fontWeight: l === "about" ? 600 : 500 }}>{l}</span>
            ))}
            <button onClick={() => setDark(!dark)} style={{ width: 32, height: 32, borderRadius: "50%", border: "0.5px solid var(--border)", background: "transparent", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)", transition: "all 0.3s" }}>
              {dark ? "☀" : "☾"}
            </button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>

        <Reveal>
          <div style={{ padding: "60px 0 48px", display: "flex", gap: 40, alignItems: "center" }}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg, var(--accent), var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, color: "#fff", fontWeight: 700, flexShrink: 0, position: "relative" }}>
              YN
              <div style={{ position: "absolute", bottom: 4, right: 4, width: 20, height: 20, borderRadius: "50%", background: "#22c55e", border: "3px solid var(--bg)" }} />
            </div>
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: -1 }}>About me</h1>
              <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8, maxWidth: 520 }}>
                Full Stack Developer & DevOps Engineer với hơn 5 năm kinh nghiệm. Mình tin vào việc xây dựng hệ thống đơn giản nhưng mạnh mẽ, tự động hóa mọi thứ có thể, và chia sẻ kiến thức với cộng đồng.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginBottom: 60 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ padding: "20px 16px", borderRadius: 12, background: dark ? "rgba(59,130,246,0.06)" : "rgba(59,130,246,0.03)", border: "0.5px solid var(--border)", textAlign: "center", transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
                <p style={{ fontSize: 26, fontWeight: 700, background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.num}</p>
                <p style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 24 }}>Kinh nghiệm</h2>
        </Reveal>

        <div style={{ position: "relative", marginBottom: 60 }}>
          <div style={{ position: "absolute", left: 15, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom, var(--accent), var(--accent2), transparent)", borderRadius: 1 }} />
          {TIMELINE.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ display: "flex", gap: 24, marginBottom: 28, position: "relative" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid " + (t.type === "work" ? "var(--accent)" : "var(--accent2)"), background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0, zIndex: 1 }}>
                  {t.type === "work" ? "💼" : "🎓"}
                </div>
                <div style={{ flex: 1, padding: "16px 20px", borderRadius: 12, border: "0.5px solid var(--border)", background: dark ? "rgba(17,24,39,0.5)" : "rgba(255,255,255,0.7)", transition: "all 0.3s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <p style={{ fontSize: 15, fontWeight: 600 }}>{t.role}</p>
                    <span style={{ fontSize: 11, color: "var(--text2)", fontFamily: "'JetBrains Mono', monospace" }}>{t.year}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--accent)", fontWeight: 500, marginBottom: 6 }}>{t.company}</p>
                  <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 24 }}>Kỹ năng</h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, marginBottom: 60 }}>
          {SKILLS.map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ padding: 22, borderRadius: 14, border: "0.5px solid var(--border)", background: dark ? "rgba(17,24,39,0.5)" : "rgba(255,255,255,0.7)", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                  <p style={{ fontSize: 14, fontWeight: 600 }}>{s.cat}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.items.map(item => (
                    <span key={item} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 6, background: dark ? s.color + "18" : s.color + "10", color: s.color, fontWeight: 500 }}>{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ padding: "32px", borderRadius: 14, background: "linear-gradient(135deg, var(--accent), var(--accent2))", marginBottom: 60, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Download CV</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>Tải CV đầy đủ dạng PDF</p>
            </div>
            <button style={{ padding: "10px 24px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", backdropFilter: "blur(8px)" }}
              onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.2)"; e.target.style.borderColor = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.borderColor = "rgba(255,255,255,0.4)"; }}>
              Tải xuống ↓
            </button>
          </div>
        </Reveal>

        <footer style={{ padding: "40px 0", borderTop: "0.5px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text2)" }}>© 2026 your.name</span>
          <div style={{ display: "flex", gap: 20 }}>
            {["GitHub", "LinkedIn", "Twitter"].map(s => (
              <span key={s} style={{ fontSize: 12, color: "var(--text2)", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--accent)"} onMouseLeave={e => e.target.style.color = "var(--text2)"}>{s}</span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
