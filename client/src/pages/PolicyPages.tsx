import { ArrowLeft, Moon, Sun } from "lucide-react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { openCookiePreferences } from "@/components/CookieConsent";

function PolicyHeader() {
  const { theme, toggleTheme } = useTheme();
  return <header className="policy-header"><Link href="/" className="wordmark" aria-label="Torna alla home WASD"><img src="/assets/wasd-crown-logo.png" alt="WASD" /></Link><div className="policy-actions"><Link className="policy-home-link" href="/"><ArrowLeft size={15} /> HOME</Link><button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle light and dark mode">{theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}</button></div></header>;
}

function PolicyLayout({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return <main className="policy-page internal-page-entrance"><PolicyHeader /><div className="policy-inner"><p className="eyebrow"><span /> {eyebrow}</p><h1>{title}</h1><div className="policy-content">{children}</div></div></main>;
}

export function CookiePolicyPage() {
  return <PolicyLayout eyebrow="LEGAL / COOKIES" title={<>COOKIE<br /><em>POLICY.</em></>}>
    <p className="policy-updated">Last updated: 21 September 2026</p>
    <p>WASD uses a minimal technical setup. The site does not currently run Google Analytics, Meta Pixel, TikTok Pixel, advertising tags, profiling tools or embedded third-party players. Optional analytics are available only if the site owner configures the Umami environment variables and the visitor accepts analytics cookies.</p>
    <h2>Cookies and storage actually used</h2>
    <div className="policy-table-wrap"><table className="policy-table"><thead><tr><th>Name</th><th>Purpose</th><th>Duration</th><th>Party</th></tr></thead><tbody><tr><td><code>wasd-cookie-consent</code></td><td>Stores the visitor's consent version, date and category choices so the banner is not shown on every visit.</td><td>180 days</td><td>First party, localStorage. Not a browser cookie.</td></tr><tr><td><code>theme</code></td><td>Remembers the selected light or dark visual theme.</td><td>Persistent until cleared</td><td>First party, localStorage. Not a browser cookie.</td></tr><tr><td><code>app_session_id</code></td><td>Authentication session identifier, only if the inherited OAuth/authentication flow is activated.</td><td>Session/provider dependent</td><td>First party or runtime provider, conditional.</td></tr><tr><td><code>__Host-oauth_state</code></td><td>Short-lived OAuth state and CSRF protection during a login attempt.</td><td>Up to 10 minutes</td><td>First party, conditional.</td></tr><tr><td>Umami script</td><td>Optional anonymous analytics only when configured and accepted. No script is loaded before consent.</td><td>Provider dependent</td><td>Third party, only if enabled by the owner.</td></tr></tbody></table></div>
    <h2>External resources and links</h2><p>The stylesheet imports fonts from Google Fonts. Product images are requested from Fourthwall's image proxy. Links to TikTok, Discord and Fourthwall open external services only when the visitor activates them; the WASD site does not embed their tracking scripts or iframes.</p>
    <h2>Your choices</h2><p>Technical storage is always active because it is needed for the consent mechanism and basic preferences. Analytics and marketing/profiling are optional. There is currently no marketing or profiling technology configured.</p><button className="policy-manage-button" onClick={openCookiePreferences}>Manage cookie preferences</button>
  </PolicyLayout>;
}

export function PrivacyPolicyPage() {
  return <PolicyLayout eyebrow="LEGAL / PRIVACY" title={<>PRIVACY<br /><em>POLICY.</em></>}>
    <p className="policy-notice"><strong>Template to complete before publication.</strong> Replace every bracketed field with the controller's actual details and have this text reviewed for the applicable jurisdiction and services.</p>
    <p className="policy-updated">Last updated: 21 September 2026</p>
    <h2>Data controller</h2><p><strong>[NOME / RAGIONE SOCIALE DA COMPILARE]</strong><br />[INDIRIZZO COMPLETO DA COMPILARE]<br />Email: <strong>[EMAIL PRIVACY DA COMPILARE]</strong></p>
    <h2>Data we collect</h2><p>The feedback form collects the email address, the message and, if voluntarily attached, a file and its basic metadata. The site also stores the cookie-consent choice and the selected visual theme in the browser's local storage. The application does not contain a newsletter form, advertising pixel, profiling database or embedded analytics by default.</p>
    <h2>Purposes and legal bases</h2><p>Feedback data are processed to receive, review and respond to product feedback. The legal basis should be documented by the controller as the steps requested by the user before entering into a relationship and/or the controller's legitimate interest in managing communications. Optional analytics, if enabled, are processed only after consent. Technical security and service operation may rely on legitimate interest or another applicable legal basis.</p>
    <h2>Retention</h2><p>Feedback records and attachment references are stored in the configured database and object storage until the controller's documented retention period expires or deletion is requested where applicable. The current code does not automatically delete feedback. The controller must set and enforce a retention schedule. Consent records expire after 180 days and are then requested again.</p>
    <h2>Recipients and transfers</h2><p>Feedback is processed by the hosting/database provider and, when an attachment is supplied, the configured S3-compatible storage provider. Product images and optional fonts are requested from external providers. If analytics is enabled, Umami and its hosting location must be identified here. The controller must verify provider locations, data-processing agreements and any safeguards for transfers outside the European Economic Area.</p>
    <h2>User rights</h2><p>Subject to the applicable limits, users may request access, rectification, erasure, restriction, objection and portability under Articles 15–22 GDPR. They may also complain to the competent supervisory authority. Requests should be sent to <strong>[EMAIL PRIVACY DA COMPILARE]</strong>. The controller should add any identity-verification and response-time procedure required by its process.</p>
    <h2>Contact</h2><p>For privacy requests, contact the data controller at <strong>[EMAIL PRIVACY DA COMPILARE]</strong>. No data protection officer is identified in the current project; add one here if legally required.</p>
  </PolicyLayout>;
}
