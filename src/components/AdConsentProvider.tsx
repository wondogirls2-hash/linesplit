"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  readAdConsent,
  writeAdConsent,
  type AdConsentStatus,
} from "@/lib/adConsent";
import { ADSENSE_CLIENT_ID } from "@/lib/site";

type AdConsentContextValue = {
  status: AdConsentStatus;
  ready: boolean;
  accept: () => void;
  reject: () => void;
  adsAllowed: boolean;
};

const AdConsentContext = createContext<AdConsentContextValue | null>(null);

function loadAdSenseScript() {
  if (!ADSENSE_CLIENT_ID) return;
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[data-ad-client="${ADSENSE_CLIENT_ID}"]`)) {
    return;
  }
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT_ID)}`;
  script.crossOrigin = "anonymous";
  script.dataset.adClient = ADSENSE_CLIENT_ID;
  document.head.appendChild(script);
}

export function AdConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AdConsentStatus>("pending");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readAdConsent();
    setStatus(stored);
    setReady(true);
    if (stored === "accepted") loadAdSenseScript();
  }, []);

  const accept = useCallback(() => {
    writeAdConsent("accepted");
    setStatus("accepted");
    loadAdSenseScript();
  }, []);

  const reject = useCallback(() => {
    writeAdConsent("rejected");
    setStatus("rejected");
  }, []);

  const value = useMemo<AdConsentContextValue>(
    () => ({
      status,
      ready,
      accept,
      reject,
      adsAllowed: status === "accepted",
    }),
    [status, ready, accept, reject]
  );

  return (
    <AdConsentContext.Provider value={value}>
      {children}
    </AdConsentContext.Provider>
  );
}

const FALLBACK_CONSENT: AdConsentContextValue = {
  status: "pending",
  ready: false,
  accept: () => {},
  reject: () => {},
  adsAllowed: false,
};

export function useAdConsent() {
  return useContext(AdConsentContext) ?? FALLBACK_CONSENT;
}
