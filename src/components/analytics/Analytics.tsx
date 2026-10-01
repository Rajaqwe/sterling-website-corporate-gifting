"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export function Analytics() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-track-event]");
      if (!target) return;
      const eventName = target.dataset.trackEvent;
      if (!eventName) return;

      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, { page_path: window.location.pathname });
      } else {
        window.dataLayer?.push({ event: eventName, page_path: window.location.pathname });
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <>
      {GA_ID ? (
        <>
          <Script src={"https://www.googletagmanager.com/gtag/js?id=" + GA_ID} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};window.gtag=gtag;gtag('js',new Date());gtag('config','" + GA_ID + "',{send_page_view:true});"}
          </Script>
        </>
      ) : null}
      {CLARITY_ID ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {"(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','" + CLARITY_ID + "');"}
        </Script>
      ) : null}
    </>
  );
}
