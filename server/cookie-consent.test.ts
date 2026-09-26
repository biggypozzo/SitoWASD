import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CONSENT_MAX_AGE, isConsentFresh } from "../client/src/components/CookieConsent";

describe("cookie consent safeguards", () => {
  it("expires consent after the configured retention window", () => {
    const now = Date.parse("2026-09-21T12:00:00.000Z");
    expect(isConsentFresh(new Date(now - CONSENT_MAX_AGE + 1).toISOString(), now)).toBe(true);
    expect(isConsentFresh(new Date(now - CONSENT_MAX_AGE - 1).toISOString(), now)).toBe(false);
    expect(isConsentFresh(null, now)).toBe(false);
  });

  it("does not include a static analytics script in the document head", () => {
    const html = readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
    expect(html).not.toMatch(/VITE_ANALYTICS_ENDPOINT.*umami/i);
  });
});
