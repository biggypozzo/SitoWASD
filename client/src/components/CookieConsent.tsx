import { useEffect, useState } from "react";
import { Link } from "wouter";

const CONSENT_KEY = "wasd-cookie-consent";
const CONSENT_MAX_AGE = 180 * 24 * 60 * 60 * 1000;

type CookiePreferences = { necessary: true; analytics: boolean; marketing: boolean };
type StoredConsent = { version: 1; savedAt: string; preferences: CookiePreferences };

const defaultPreferences: CookiePreferences = { necessary: true, analytics: false, marketing: false };

export function isConsentFresh(savedAt: string | null, now = Date.now()) {
  if (!savedAt) return false;
  const timestamp = Date.parse(savedAt);
  return Number.isFinite(timestamp) && now - timestamp <= CONSENT_MAX_AGE;
}

function readConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== 1 || !isConsentFresh(parsed.savedAt)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function loadAnalytics(preferences: CookiePreferences) {
  if (!preferences.analytics || document.querySelector("script[data-wasd-analytics]") || !import.meta.env.VITE_ANALYTICS_ENDPOINT || !import.meta.env.VITE_ANALYTICS_WEBSITE_ID) return;
  const script = document.createElement("script");
  script.defer = true;
  script.src = `${String(import.meta.env.VITE_ANALYTICS_ENDPOINT).replace(/\/$/, "")}/umami`;
  script.dataset.websiteId = String(import.meta.env.VITE_ANALYTICS_WEBSITE_ID);
  script.dataset.wasdAnalytics = "true";
  document.head.appendChild(script);
}

function removeAnalytics() {
  document.querySelector("script[data-wasd-analytics]")?.remove();
}

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent("wasd:open-cookie-preferences"));
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<StoredConsent | null>(() => readConsent());
  const [open, setOpen] = useState(() => !readConsent());
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [customizing, setCustomizing] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      const current = readConsent();
      setPreferences(current?.preferences ?? defaultPreferences);
      setCustomizing(true);
      setOpen(true);
    };
    window.addEventListener("wasd:open-cookie-preferences", handleOpen);
    return () => window.removeEventListener("wasd:open-cookie-preferences", handleOpen);
  }, []);

  useEffect(() => {
    if (consent) loadAnalytics(consent.preferences);
  }, [consent]);

  const save = (next: CookiePreferences) => {
    const saved: StoredConsent = { version: 1, savedAt: new Date().toISOString(), preferences: next };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(saved));
    setConsent(saved);
    if (!next.analytics) removeAnalytics();
    setOpen(false);
    setCustomizing(false);
  };

  if (!open) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-modal="true" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <div className="cookie-consent-card">
        <div className="cookie-consent-copy">
          <p className="cookie-kicker">PRIVACY / CONSENT</p>
          <h2 id="cookie-title">Your control.<br /><em>Your choice.</em></h2>
          <p id="cookie-description">We use only what is necessary to operate WASD. Optional analytics are disabled until you give explicit consent.</p>
          <p className="cookie-consent-links"><Link href="/cookie-policy">Cookie Policy</Link><span>·</span><Link href="/privacy-policy">Privacy Policy</Link></p>
        </div>
        {customizing && (
          <div className="cookie-preferences" aria-label="Cookie preferences">
            <label className="cookie-option"><span><strong>Technical / necessary</strong><small>Always active. Required for consent storage and site operation.</small></span><input type="checkbox" checked disabled aria-label="Technical cookies always active" /></label>
            <label className="cookie-option"><span><strong>Analytics</strong><small>Optional Umami analytics, loaded only after consent and only when configured.</small></span><input type="checkbox" checked={preferences.analytics} onChange={(event) => setPreferences({ ...preferences, analytics: event.target.checked })} /></label>
            <label className="cookie-option"><span><strong>Marketing / profiling</strong><small>No marketing or profiling tracker is currently configured.</small></span><input type="checkbox" checked={preferences.marketing} onChange={(event) => setPreferences({ ...preferences, marketing: event.target.checked })} /></label>
          </div>
        )}
        <div className="cookie-consent-actions">
          <button className="cookie-button cookie-button-quiet" onClick={() => save(defaultPreferences)}>Reject all</button>
          <button className="cookie-button cookie-button-outline" onClick={() => setCustomizing((value) => !value)}>{customizing ? "Close preferences" : "Customize"}</button>
          {customizing ? <button className="cookie-button cookie-button-primary" onClick={() => save(preferences)}>Save choices</button> : <button className="cookie-button cookie-button-primary" onClick={() => save({ necessary: true, analytics: true, marketing: false })}>Accept all</button>}
        </div>
      </div>
    </div>
  );
}

export { CONSENT_KEY, CONSENT_MAX_AGE };
