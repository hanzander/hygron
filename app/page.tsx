"use client";

import { useState } from "react";
import {
  ArrowRight,
  Bell,
  ChevronDown,
  CircleHelp,
  CloudRain,
  Download,
  Home as HomeIcon,
  LayoutDashboard,
  LineChart,
  LockKeyhole,
  Menu,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";
import {
  ActivityIcon,
  BellRingingIcon,
  BroomIcon,
  ChartLineUpIcon,
  CpuIcon,
  UsersThreeIcon,
  WindIcon as PhosphorWind,
} from "@phosphor-icons/react";

type View = "landing" | "signin" | "dashboard";

const rooms = [
  { room: "118", humidity: "78%", voc: "642", trend: "Rising", risk: "High" },
  { room: "203", humidity: "71%", voc: "488", trend: "Rising", risk: "High" },
  { room: "305", humidity: "68%", voc: "361", trend: "Stable", risk: "Medium" },
  { room: "411", humidity: "82%", voc: "710", trend: "Rising", risk: "Critical" },
  { room: "214", humidity: "59%", voc: "184", trend: "Falling", risk: "Low" },
  { room: "110", humidity: "57%", voc: "176", trend: "Stable", risk: "Low" },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo ${light ? "logo-light" : ""}`}>
      Hygron<span>.</span>
    </span>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  return <span className={`risk risk-${risk.toLowerCase()}`}>{(risk === "High" || risk === "Critical") && <span aria-hidden="true">!</span>}{risk} risk{(risk === "High" || risk === "Critical") && <small>Action required</small>}</span>;
}

function SignatureIcon({ kind }: { kind: "sensor" | "forecast" | "staff" | "air" | "clean" | "signal" | "action" }) {
  const icons = {
    sensor: <CpuIcon weight="duotone" />,
    forecast: <ChartLineUpIcon weight="duotone" />,
    staff: <UsersThreeIcon weight="duotone" />,
    air: <PhosphorWind weight="duotone" />,
    clean: <BroomIcon weight="duotone" />,
    signal: <ActivityIcon weight="duotone" />,
    action: <BellRingingIcon weight="duotone" />,
  };
  return <span className={`signature-icon signature-${kind}`} aria-hidden="true">{icons[kind]}</span>;
}

function Landing({ onNavigate }: { onNavigate: (view: View) => void }) {
  return (
    <main className="landing">
      <nav className="site-nav shell">
        <a href="#" onClick={() => onNavigate("landing")}><Logo /></a>
        <div className="nav-links">
          <a href="#product">Product</a><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a><a href="#contact">Contact</a>
        </div>
        <button className="nav-signin" onClick={() => onNavigate("signin")}>Sign in <ArrowRight size={15} /></button>
        <button className="mobile-menu" aria-label="Open menu"><Menu size={21} /></button>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <h1>Know a room&apos;s mold risk <em>before</em> your guest does.</h1>
          <p className="hero-sub">Hygron monitors room conditions linked to mold growth and helps your team act before visible signs appear. When a room starts to drift, staff know where to look and why.</p>
          <div className="button-row"><button className="button button-primary" onClick={() => onNavigate("signin")}>Request a demo <ArrowRight size={17} /></button><a className="button button-outline" href="#how-it-works">See how it works <span>↘</span></a></div>
        </div>
        <div className="hero-visual">
          <div className="hero-dashboard-preview" aria-label="Hygron dashboard preview">
            <div className="preview-head"><div><span>TAGAYTAY BRANCH</span><strong>Room risk</strong></div><span className="preview-live"><i /> Live</span></div>
            <div className="preview-summary"><div><small>Rooms monitored</small><b>42</b></div><div className="preview-alert"><small>Needs attention</small><b>3 rooms</b></div></div>
            <div className="preview-section-label">CHECK FIRST</div>
            <div className="preview-room high"><span className="preview-room-dot" /><div><strong>Room 118</strong><small>Humidity 78% · rising</small></div><b>High</b></div>
            <div className="preview-room medium"><span className="preview-room-dot" /><div><strong>Room 203</strong><small>VOC 488 ppb · rising</small></div><b>Watch</b></div>
            <div className="preview-section-label">ROOM 118 · LAST 7 DAYS</div>
            <div className="preview-chart"><span className="preview-threshold">65% threshold</span><svg viewBox="0 0 360 74" preserveAspectRatio="none"><path d="M0 53 C30 48 42 42 70 47 S108 58 137 43 S176 39 205 45 S241 28 270 34 S315 21 360 25" fill="none" stroke="#d97748" strokeWidth="2.5" /></svg></div>
            <div className="preview-footer"><span><SignatureIcon kind="action" /> 24-hour outlook ready</span><span>Prototype model</span></div>
          </div>
        </div>
      </section>
      <section className="measurement-section shell" id="product"><div className="section-intro"><span className="eyebrow">WHAT HYGRON MEASURES</span><h2>Room-level context,<br /><em>not another air score.</em></h2><p>Hygron combines environmental readings with recent room trends to identify conditions that may support mold growth.</p></div><div className="measurement-grid"><Measurement name="Relative humidity" detail="Persistent moisture is the primary signal staff need to investigate." /><Measurement name="Temperature" detail="Read alongside humidity to understand how conditions may change over time." /><Measurement name="VOC-related readings" detail="Supporting context only. These readings can come from several sources and do not confirm mold." /><Measurement name="CO₂ and pressure" detail="Helps add room context and identify changes in ventilation or occupancy patterns." /></div></section>
      <section className="architecture-section"><div className="shell"><div className="section-intro"><span className="eyebrow">THE SYSTEM BEHIND THE DASHBOARD</span><h2>From room sensor<br /><em>to staff action.</em></h2><p>Each layer has a specific job. The dashboard is the last step, not the whole system.</p></div><div className="architecture-grid"><ArchitectureStep n="01" title="Room sensors" text="BME680 and MH-Z19C modules collect humidity, temperature, gas-related readings, and CO₂." /><ArchitectureStep n="02" title="ESP32 node" text="The room device polls the sensors and sends a compact reading over the property's Wi-Fi." /><ArchitectureStep n="03" title="Edge gateway" text="A Raspberry Pi validates readings, summarizes time windows, and prepares useful features locally." /><ArchitectureStep n="04" title="Cloud and dashboard" text="The model scores room risk and shows trends, forecasts, and alerts to staff." /></div></div></section>
      <section className="features shell"><div className="section-intro"><span className="eyebrow">BUILT FOR THE WORKDAY</span><h2>Useful when the<br /><em>next shift walks in.</em></h2></div><div className="feature-grid"><Feature icon={<SignatureIcon kind="sensor" />} title="See which rooms need attention" text="Room readings are organized by location, so staff can start with the rooms that need a closer look." num="01" /><Feature icon={<SignatureIcon kind="forecast" />} title="Spot conditions moving upward" text="The prototype highlights rising humidity and estimates whether risk may increase over the next 24 hours." num="02" /><Feature icon={<SignatureIcon kind="staff" />} title="Give staff a reason to act" text="Housekeeping and maintenance see the room, the signal, and a practical next step." num="03" /></div></section>
      <section className="how-section" id="how-it-works"><div className="shell"><div className="section-intro centered"><h2>How it works</h2><p>From sensor to staff notification.</p></div><div className="steps"><Step n="01" title="Sense" text="In-room sensors read the air every 30 seconds." icon={<SignatureIcon kind="air" />} /><Step n="02" title="Preprocess" text="An on-site gateway cleans and summarizes the data." icon={<SignatureIcon kind="clean" />} /><Step n="03" title="Predict" text="The model scores each room&apos;s mold risk in real time." icon={<SignatureIcon kind="signal" />} /><Step n="04" title="Act" text="Staff get a dashboard view and an alert for high-risk rooms." icon={<SignatureIcon kind="action" />} /></div></div></section>
      <section className="property-section shell"><div className="property-copy"><span className="eyebrow">FOR PHILIPPINE LODGING PROPERTIES</span><h2>Built for rooms that stay warm, wet, and in use.</h2><p>Hygron is designed for inns, lodges, resorts, bed-and-breakfast properties, and small-to-mid-sized hotels managing humid rooms, frequent guest turnover, and limited maintenance staff.</p></div><div className="property-list"><span>High humidity and rainfall</span><span>Wet linens, carpets, and furnishings</span><span>Rooms that need targeted intervention</span><span>Maintenance teams with limited time</span></div></section>
      <section className="pricing-section" id="pricing"><div className="shell"><div className="section-intro pricing-intro"><h2>Pricing that follows<br /><em>your property size.</em></h2><p>Indicative pricing in Philippine pesos. Each tier includes monitoring, risk scoring, and staff alerts.</p></div><div className="pricing-grid"><PriceCard tier="Starter" property="Small inns and B&Bs" rooms="1–15 rooms" install="₱3,800" monthly="₱150–200" /><PriceCard tier="Growth" property="Mid-sized hotels" rooms="16–40 rooms" install="₱3,500" monthly="₱120–150" featured /><PriceCard tier="Property-wide" property="Larger hotels and resorts" rooms="41+ rooms" install="₱3,200" monthly="₱90–120" /></div><p className="pricing-note">Installation is a one-time per-room fee. Monthly pricing is also calculated per room. Final pricing depends on site assessment, connectivity, and installation requirements.</p><p className="pricing-example"><strong>42-room example:</strong> ₱134,400 one-time installation, then approximately ₱3,780–5,040 per month.</p><button className="button button-primary pricing-cta" onClick={() => onNavigate("signin")}>Request a demo <ArrowRight size={17} /></button></div></section>
      <section className="limitations-section shell"><div className="section-intro"><span className="eyebrow">RESPONSIBLE USE</span><h2>A risk signal is<br /><em>not a diagnosis.</em></h2><p>Hygron supports inspection and maintenance decisions. It does not replace them.</p></div><div className="limitations-grid"><div><strong>Predictor, not mold detector</strong><p>Hygron identifies environmental conditions associated with mold risk. It does not visually confirm mold.</p></div><div><strong>Readings need context</strong><p>VOC-related readings may have several sources, and sensors require calibration before model results can be trusted.</p></div><div><strong>Staff remain in control</strong><p>Alerts help teams decide where to inspect, ventilate, dry, or deploy equipment next.</p></div></div></section>
      <footer className="site-footer shell" id="contact"><Logo /><span className="footer-place">Philippines <span>↗</span></span></footer>
    </main>
  );
}

function Feature({ icon, title, text, num }: { icon: React.ReactNode; title: string; text: string; num: string }) {
  const labels: Record<string, string> = { "01": "WATCH", "02": "FORECAST", "03": "RESPOND" };
  return <article className="feature-card"><div className="feature-card-top"><span className="feature-kicker">{num} / {labels[num]}</span><div className="feature-icon">{icon}</div></div><span className="feature-num">{num}</span><h3>{title}</h3><p>{text}</p><span className="feature-swoop" aria-hidden="true" /></article>;
}
function Measurement({ name, detail }: { name: string; detail: string }) {
  return <article className="measurement-item"><span className="measurement-mark" /><div><h3>{name}</h3><p>{detail}</p></div></article>;
}
function ArchitectureStep({ n, title, text }: { n: string; title: string; text: string }) {
  return <article className="architecture-step"><span>{n}</span><h3>{title}</h3><p>{text}</p></article>;
}
function PriceCard({ tier, property, rooms, install, monthly, featured = false }: { tier: string; property: string; rooms: string; install: string; monthly: string; featured?: boolean }) {
  return <article className={`price-card ${featured ? "price-featured" : ""}`}><div className="price-card-top"><span>{tier}</span>{featured && <b>16–40 rooms</b>}</div><h3>{property}</h3><p className="price-rooms">{rooms}</p><div className="price-row"><span>One-time installation</span><strong>{install}<small>/room</small></strong></div><div className="price-row"><span>Indicative monthly</span><strong>{monthly}<small>/room/month</small></strong></div></article>;
}
function Step({ n, title, text, icon }: { n: string; title: string; text: string; icon: React.ReactNode }) {
  return <article className="step"><span className="step-num">{n}</span><div className="step-icon">{icon}</div><h3>{title}</h3><p>{text}</p></article>;
}

function SignIn({ onNavigate }: { onNavigate: (view: View) => void }) {
  return <main className="auth-page"><section className="auth-quote"><a href="#" onClick={() => onNavigate("landing")}><Logo /></a><div className="quote-wrap"><div className="quote-mark">“</div><blockquote>We used to find out about mold from a guest review. Now we find out from a dashboard, three days earlier.</blockquote><p>Front office manager, Tagaytay property</p></div><span className="auth-location">MANILA / PHILIPPINES</span></section><section className="auth-form"><button className="back-link" onClick={() => onNavigate("landing")}>← Back to website</button><div className="form-wrap"><div className="mobile-auth-logo"><Logo light /></div><span className="eyebrow light-eyebrow">PROPERTY PORTAL</span><h1>Sign in</h1><p className="auth-sub">Check today&apos;s room risk levels.</p><label>Work email<input type="email" placeholder="you@yourproperty.com" /></label><label>Password<div className="password-input"><input type="password" placeholder="Enter your password" /><LockKeyhole size={16} /></div></label><div className="form-options"><label className="check-label"><input type="checkbox" defaultChecked /> <span>Stay signed in</span></label><a href="#">Forgot password?</a></div><button className="button button-primary full" onClick={() => onNavigate("dashboard")}>Sign in <ArrowRight size={17} /></button><div className="divider"><span>or</span></div><button className="google-button"><span>G</span> Sign in with Google Workspace</button><p className="access-link">New property? <a href="#">Request access</a></p></div></section></main>;
}

function Dashboard({ onNavigate }: { onNavigate: (view: View) => void }) {
  const [active, setActive] = useState("Overview");
  const [profileOpen, setProfileOpen] = useState(false);
  return <main className="dashboard"><aside className="sidebar"><a href="#" onClick={() => onNavigate("landing")}><Logo light /></a><div className="sidebar-nav"><span className="side-label">WORKSPACE</span>{[["Overview", <LayoutDashboard key="overview-icon" size={17} />], ["Rooms", <HomeIcon key="rooms-icon" size={17} />], ["Alerts", <Bell key="alerts-icon" size={17} />], ["Reports", <LineChart key="reports-icon" size={17} />]].map(([name, icon]) => <button key={String(name)} className={active === name ? "active" : ""} onClick={() => setActive(String(name))}>{icon}<span>{name}</span>{name === "Alerts" && <b>3</b>}</button>)}<span className="side-label property-label">PROPERTY</span><div className="property-name"><span className="property-avatar">TB</span><span>Tagaytay Branch<small>42 rooms</small></span><ChevronDown size={14} /></div><button><Settings size={17} /><span>Settings</span></button></div><div className="sidebar-bottom"><div className="support"><CircleHelp size={17} /><span>Help center</span></div><div className="profile-wrap"><button className="user" onClick={() => setProfileOpen(!profileOpen)} aria-expanded={profileOpen}><span className="user-avatar">LD</span><span><strong>Lorainne Diaz</strong><small>Property admin</small></span><ChevronDown size={14} /></button>{profileOpen && <div className="profile-menu"><button onClick={() => onNavigate("landing")}>Sign out</button></div>}</div></div></aside><section className="dash-main"><header className="dash-header"><div className="dashboard-heading"><span className="dash-date">Wednesday, September 24, 2025</span><h1>{active}</h1><div className="dashboard-context"><span className="context-property">Tagaytay Branch</span><span>42 rooms</span><span className="context-updated"><i /> Updated 2 min ago</span></div></div><div className="header-actions"><button className="icon-btn"><Search size={18} /></button><button className="export-button"><Download size={16} /> Export report</button></div></header><div className={`dash-content ${active.toLowerCase()}`}>{active !== "Overview" && <section className="active-view panel"><div className="panel-heading"><div><span className="eyebrow">{active === "Rooms" ? "ROOM DIRECTORY" : active === "Alerts" ? "ATTENTION CENTER" : "PROPERTY INSIGHTS"}</span><h2>{active === "Rooms" ? "All monitored rooms" : active === "Alerts" ? "Active alerts" : "Reports and trends"}</h2></div><span className="view-status">{active === "Rooms" ? "42 rooms" : active === "Alerts" ? "3 open" : "Updated today"}</span></div>{active === "Rooms" && <div className="table-wrap"><table><thead><tr><th>Room</th><th>Humidity</th><th>VOC</th><th>Trend</th><th>Risk</th></tr></thead><tbody>{rooms.map((row) => <tr key={`directory-${row.room}`}><td><strong>Room {row.room}</strong><small>{row.room === "118" ? "Pool Wing" : row.room === "214" ? "Garden Wing" : "Main Building"}</small></td><td>{row.humidity}</td><td>{row.voc} <small>ppb</small></td><td className={row.trend === "Rising" ? "trend-up" : row.trend === "Falling" ? "trend-down" : "trend-stable"}>{row.trend}</td><td><RiskBadge risk={row.risk} /></td></tr>)}</tbody></table></div>}{active === "Alerts" && <div className="alert-list standalone-alerts"><Alert room="118" title="Humidity above threshold for 6 hours" time="12 minutes ago" high /><Alert room="203" title="VOC levels trending upward" time="48 minutes ago" /><Alert room="305" title="Ventilation check recommended" time="2 hours ago" /></div>}{active === "Reports" && <div className="report-summary"><div className="report-stat"><span>Average humidity</span><strong>64%</strong><small>Down 2% from last week</small></div><div className="report-stat"><span>High-risk hours prevented</span><strong>18</strong><small>Across 42 monitored rooms</small></div><div className="report-chart"><span>7-day property humidity</span><svg viewBox="0 0 800 150" preserveAspectRatio="none"><path d="M0 112 C75 104 90 80 160 94 S255 100 325 70 S420 86 485 60 S590 78 650 41 S730 57 800 28" fill="none" stroke="#4e8c7c" strokeWidth="3" /></svg></div></div>}</section>}<div className="stat-grid"><Stat title="Rooms monitored" value="42" note="All sensors online" icon={<HomeIcon />} /><Stat title="High risk" value="3" note="Needs attention today" icon={<Bell />} alert /><Stat title="Avg. humidity" value="64%" note="↓ 2% from yesterday" icon={<CloudRain />} /><Stat title="Open alerts" value="3" note="1 new since yesterday" icon={<ShieldCheck />} alert /></div><div className="dash-columns"><section className="panel rooms-panel"><div className="panel-heading"><div><span className="eyebrow">PROPERTY HEALTH</span><h2>Rooms by risk</h2></div><button className="text-button">View all <ArrowRight size={14} /></button></div><div className="table-wrap"><table><thead><tr><th>Room</th><th>Humidity</th><th>VOC</th><th>Trend</th><th>Risk</th></tr></thead><tbody>{rooms.map((row) => <tr key={row.room}><td><strong>Room {row.room}</strong><small>{row.room === "118" ? "Pool Wing" : row.room === "214" ? "Garden Wing" : "Main Building"}</small></td><td>{row.humidity}</td><td>{row.voc} <small>ppb</small></td><td className={row.trend === "Rising" ? "trend-up" : row.trend === "Falling" ? "trend-down" : "trend-stable"}>{row.trend === "Rising" ? "↗" : row.trend === "Falling" ? "↘" : "→"} {row.trend}</td><td><RiskBadge risk={row.risk} /></td></tr>)}</tbody></table></div></section><section className="panel alerts-panel"><div className="panel-heading"><div><span className="eyebrow">REQUIRES ATTENTION</span><h2>Active alerts <b className="count-badge">3</b></h2></div><button className="more-button">•••</button></div><div className="alert-list"><Alert room="118" title="Humidity above threshold for 6 hours" time="12 minutes ago" high /><Alert room="203" title="VOC levels trending upward" time="48 minutes ago" /><Alert room="305" title="Ventilation check recommended" time="2 hours ago" /></div><button className="all-alerts">See all alerts <ArrowRight size={14} /></button></section></div><section className="forecast-panel panel"><div><span className="eyebrow">PROTOTYPE FORECAST</span><h2>Room 118 may reach high risk within 24 hours</h2><p>Humidity has stayed above the 65% working threshold for 6 hours and is still rising.</p></div><div className="forecast-action"><strong>Suggested next step</strong><span>Inspect ventilation and check whether the room needs drying support.</span><b>Not a mold diagnosis</b></div></section><section className="panel chart-panel"><div className="panel-heading"><div><span className="eyebrow">ROOM DETAIL</span>  <h2>Room 118, 7 day humidity trend</h2></div><button className="room-select">Room 118 <ChevronDown size={14} /></button></div><div className="large-chart"><div className="y-axis"><span>80%</span><span>75%</span><span>70%</span><span>65%</span><span>60%</span><span>55%</span></div><div className="chart-area"><div className="threshold"><span>65% threshold</span></div><svg viewBox="0 0 800 220" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#c75b3f" stopOpacity=".18" /><stop offset="100%" stopColor="#c75b3f" stopOpacity="0" /></linearGradient></defs><path d="M0 170 C55 165 70 140 115 151 S165 172 215 132 S266 109 315 124 S370 115 410 91 S470 83 510 102 S562 88 603 62 S660 49 700 70 S757 30 800 38 L800 220 L0 220 Z" fill="url(#area)" /><path d="M0 170 C55 165 70 140 115 151 S165 172 215 132 S266 109 315 124 S370 115 410 91 S470 83 510 102 S562 88 603 62 S660 49 700 70 S757 30 800 38" fill="none" stroke="#c75b3f" strokeWidth="3" /></svg><div className="x-axis"><span>Sep 18</span><span>Sep 19</span><span>Sep 20</span><span>Sep 21</span><span>Sep 22</span><span>Sep 23</span><span>Sep 24</span></div></div></div></section></div></section></main>;
}

function Stat({ title, value, note, icon, alert = false }: { title: string; value: string; note: string; icon: React.ReactNode; alert?: boolean }) {
  return <div className="stat-card"><div className={`stat-icon ${alert ? "stat-alert" : ""}`}>{icon}</div><span>{title}</span><strong>{value}</strong><small className={alert ? "note-alert" : ""}>{note}</small></div>;
}
function Alert({ room, title, time, high = false }: { room: string; title: string; time: string; high?: boolean }) {
  return <div className="alert-item"><div className={`alert-icon ${high ? "high" : ""}`}>{high ? "!" : "⌁"}</div><div><strong>Room {room}</strong><p>{title}</p><small>{time}</small></div><ArrowRight size={15} /></div>;
}

export default function Home() {
  const [view, setView] = useState<View>("landing");
  if (view === "signin") return <SignIn onNavigate={setView} />;
  if (view === "dashboard") return <Dashboard onNavigate={setView} />;
  return <Landing onNavigate={setView} />;
}
