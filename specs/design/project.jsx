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

const PROJECTS = [
  { icon: "⚡", title: "CI/CD Pipeline Tool", desc: "Hệ thống tự động hóa deployment với Docker, GitHub Actions và AWS. Giảm 80% thời gian deploy, zero-downtime rolling updates.", tags: ["Docker", "Node.js", "AWS", "GitHub Actions"], github: "github.com/you/cicd-tool", demo: "cicd-tool.dev", featured: true },
  { icon: "🛒", title: "E-commerce Platform", desc: "Full-stack e-commerce với Vue + Supabase. Tích hợp Stripe payment, real-time inventory, admin dashboard.", tags: ["Vue", "Supabase", "Stripe", "Tailwind"], github: "github.com/you/ecommerce", demo: "shop.yourname.dev", featured: true },
  { icon: "📊", title: "Monitoring Dashboard", desc: "Real-time infrastructure monitoring với custom metrics, alerting qua Slack/Email, Grafana dashboards.", tags: ["Grafana", "Prometheus", "K8s", "Go"], github: "github.com/you/monitor", demo: null, featured: true },
  { icon: "🔐", title: "Auth Microservice", desc: "JWT-based authentication service với OAuth2, rate limiting, session management. Dùng cho nhiều projects.", tags: ["Node.js", "Redis", "PostgreSQL", "Docker"], github: "github.com/you/auth-ms", demo: null, featured: false },
  { icon: "📝", title: "Markdown Editor", desc: "Live preview editor với syntax highlighting, export PDF, auto-save. Built với Vue 3 Composition API.", tags: ["Vue", "TypeScript", "Marked", "PDF"], github: "github.com/you/md-editor", demo: "editor.yourname.dev", featured: false },
  { icon: "🌐", title: "URL Shortener", desc: "Serverless URL shortener với analytics, QR code gen, custom slugs. Deploy trên Cloudflare Workers.", tags: ["Cloudflare", "TypeScript", "D1", "Workers"], github: "github.com/you/shorturl", demo: "s.yourname.dev", featured: false },
];

const ALL_TAGS = [...new Set(PROJECTS.flatMap(p => p.tags))].sort();

export default function ProjectsPage() {
  const [dark, setDark] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const [view, setView] = useState("list");
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeTag ? PROJECTS.filter(p => p.tags.includes(activeTag)) : PROJECTS;

  const root = {
    "--bg": dark ? "#0a0e17" : "#fafbfc",
    "--bg2": dark ? "#111827" : "#f1f3f6",
    "--text": dark ? "#e2e8f0" : "#1a202c",
    "--text2": dark ? "#94a3b8" : "#64748b",
    "--border": dark ? "rgba(148,163,184,0.12)" : "rgba(0,0,0,0.08)",
    "--accent": "#3b82f6",
    "--accent2": "#06b6d4",
  };

  if (selectedProject) {
    const p = selectedProject;
    return (
      <div style={{ ...root, background: "var(--bg)", color: "var(--text)", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", transition: "background 0.4s" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap'); * { margin:0;padding:0;box-sizing:border-box; }`}</style>
        <nav style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(20px)", background: dark ? "rgba(10,14,23,0.8)" : "rgba(250,251,252,0.85)", borderBottom: "0.5px solid var(--border)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: -0.8, background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your.name</span>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {["about", "projects", "blog", "contact"].map(l => (
                <span key={l} style={{ fontSize: 13, color: l === "projects" ? "var(--accent)" : "var(--text2)", cursor: "pointer", fontWeight: l === "projects" ? 600 : 500 }}>{l}</span>
              ))}
              <button onClick={() => setDark(!dark)} style={{ width: 32, height: 32, borderRadius: "50%", border: "0.5px solid var(--border)", background: "transparent", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)" }}>{dark ? "☀" : "☾"}</button>
            </div>
          </div>
        </nav>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ padding: "32px 0 16px" }}>
            <span onClick={() => setSelectedProject(null)} style={{ fontSize: 13, color: "var(--accent)", cursor: "pointer", fontWeight: 500 }}>← Tất cả dự án</span>
          </div>

          <div style={{ width: "100%", height: 240, borderRadius: 16, background: dark ? "rgba(59,130,246,0.06)" : "rgba(59,130,246,0.03)", border: "0.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, marginBottom: 32 }}>{p.icon}</div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              {p.featured && <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: dark ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 500, marginBottom: 8, display: "inline-block" }}>Featured</span>}
              <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8, marginTop: 4 }}>{p.title}</h1>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {p.github && <span style={{ fontSize: 12, padding: "8px 16px", borderRadius: 8, border: "0.5px solid var(--border)", color: "var(--text2)", fontWeight: 500, cursor: "pointer" }}>GitHub ↗</span>}
              {p.demo && <span style={{ fontSize: 12, padding: "8px 16px", borderRadius: 8, background: "linear-gradient(135deg, var(--accent), var(--accent2))", color: "#fff", fontWeight: 500, cursor: "pointer" }}>Live Demo ↗</span>}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 32 }}>
            {p.tags.map(t => <span key={t} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 6, background: dark ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.08)", color: "var(--accent)", fontWeight: 500 }}>{t}</span>)}
          </div>

          <div style={{ padding: "32px", borderRadius: 14, border: "0.5px solid var(--border)", background: dark ? "rgba(17,24,39,0.5)" : "rgba(255,255,255,0.7)", marginBottom: 32 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Mô tả dự án</h2>
            <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8 }}>{p.desc}</p>
            <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8, marginTop: 16 }}>
              Dự án được phát triển từ nhu cầu thực tế trong quá trình làm việc. Áp dụng clean architecture, comprehensive testing và CI/CD pipeline tự động. Source code được tổ chức rõ ràng với documentation đầy đủ.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, marginBottom: 32 }}>
            {["Architecture", "Key Features", "Lessons Learned"].map((s, i) => (
              <div key={i} style={{ padding: 20, borderRadius: 12, border: "0.5px solid var(--border)", background: dark ? "rgba(17,24,39,0.5)" : "rgba(255,255,255,0.7)" }}>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{s}</p>
                <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6 }}>
                  {i === 0 && "Microservices, Event-driven, Docker Compose orchestration."}
                  {i === 1 && "Auto-scaling, health checks, rollback strategy, monitoring."}
                  {i === 2 && "Infrastructure as Code, observability-first, cost optimization."}
                </p>
              </div>
            ))}
          </div>

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

  return (
    <div style={{ ...root, background: "var(--bg)", color: "var(--text)", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", transition: "background 0.4s" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap'); * { margin:0;padding:0;box-sizing:border-box; }`}</style>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(20px)", background: dark ? "rgba(10,14,23,0.8)" : "rgba(250,251,252,0.85)", borderBottom: "0.5px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: -0.8, background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>your.name</span>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {["about", "projects", "blog", "contact"].map(l => (
              <span key={l} style={{ fontSize: 13, color: l === "projects" ? "var(--accent)" : "var(--text2)", cursor: "pointer", fontWeight: l === "projects" ? 600 : 500 }}>{l}</span>
            ))}
            <button onClick={() => setDark(!dark)} style={{ width: 32, height: 32, borderRadius: "50%", border: "0.5px solid var(--border)", background: "transparent", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text2)" }}>{dark ? "☀" : "☾"}</button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
        <Reveal>
          <div style={{ padding: "60px 0 12px" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, marginBottom: 8 }}>Projects</h1>
            <p style={{ fontSize: 14, color: "var(--text2)" }}>Những dự án mình đã xây dựng và đóng góp</p>
          </div>
        </Reveal>

        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 24px", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              <span onClick={() => setActiveTag(null)} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 20, border: "0.5px solid " + (!activeTag ? "var(--accent)" : "var(--border)"), background: !activeTag ? (dark ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.06)") : "transparent", color: !activeTag ? "var(--accent)" : "var(--text2)", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>Tất cả</span>
              {ALL_TAGS.map(tag => (
                <span key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 20, border: "0.5px solid " + (activeTag === tag ? "var(--accent)" : "var(--border)"), background: activeTag === tag ? (dark ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.06)") : "transparent", color: activeTag === tag ? "var(--accent)" : "var(--text2)", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 4, padding: 3, borderRadius: 8, background: "var(--bg2)" }}>
              {["grid", "list"].map(v => (
                <span key={v} onClick={() => setView(v)} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 6, background: view === v ? "var(--bg)" : "transparent", color: view === v ? "var(--text)" : "var(--text2)", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", border: view === v ? "0.5px solid var(--border)" : "0.5px solid transparent" }}>{v === "grid" ? "▦" : "☰"}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {view === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, marginBottom: 60 }}>
            {filtered.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div onClick={() => setSelectedProject(p)} style={{ border: "0.5px solid var(--border)", borderRadius: 14, padding: 22, background: dark ? "rgba(17,24,39,0.5)" : "rgba(255,255,255,0.7)", cursor: "pointer", transition: "all 0.35s", height: "100%" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = dark ? "0 12px 32px rgba(59,130,246,0.1)" : "0 12px 32px rgba(59,130,246,0.06)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: dark ? "rgba(59,130,246,0.08)" : "rgba(59,130,246,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{p.icon}</div>
                    {p.featured && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: dark ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 500 }}>Featured</span>}
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{p.title}</p>
                  <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, marginBottom: 14 }}>{p.desc.slice(0, 80)}...</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {p.tags.slice(0, 3).map(t => <span key={t} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 5, background: dark ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.08)", color: "var(--accent)", fontWeight: 500 }}>{t}</span>)}
                    {p.tags.length > 3 && <span style={{ fontSize: 11, padding: "3px 9px", color: "var(--text2)" }}>+{p.tags.length - 3}</span>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 60 }}>
            {filtered.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div onClick={() => setSelectedProject(p)} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: 12, border: "0.5px solid var(--border)", cursor: "pointer", transition: "all 0.3s", background: dark ? "rgba(17,24,39,0.3)" : "transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.paddingLeft = "24px"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.paddingLeft = "20px"; }}>
                  <span style={{ fontSize: 22 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <p style={{ fontSize: 14, fontWeight: 600 }}>{p.title}</p>
                      {p.featured && <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4, background: dark ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.08)", color: "#22c55e", fontWeight: 500 }}>Featured</span>}
                    </div>
                    <p style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{p.desc.slice(0, 60)}...</p>
                  </div>
                  <div style={{ display: "flex", gap: 5 }}>
                    {p.tags.slice(0, 2).map(t => <span key={t} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 5, background: dark ? "rgba(59,130,246,0.1)" : "rgba(59,130,246,0.06)", color: "var(--accent)", fontWeight: 500 }}>{t}</span>)}
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text2)" }}>→</span>
                </div>
              </Reveal>
            ))}
          </div>
        )}

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
