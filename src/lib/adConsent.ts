export const AD_CONSENT_STORAGE_KEY = "paragraphsplitter-ad-consent-v1";

export type AdConsentStatus = "pending" | "accepted" | "rejected";

export function readAdConsent(): AdConsentStatus {
  if (typeof window === "undefined") return "pending";
  try {
    const raw = window.localStorage.getItem(AD_CONSENT_STORAGE_KEY);
    if (raw === "accepted" || raw === "rejected") return raw;
  } catch {
    /* ignore private-mode / blocked storage */
  }
  return "pending";
}

export function writeAdConsent(status: Exclude<AdConsentStatus, "pending">) {
  try {
    window.localStorage.setItem(AD_CONSENT_STORAGE_KEY, status);
  } catch {
    /* ignore */
  }
}
