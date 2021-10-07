import { useEffect } from "react";
import { useRouter } from "next/router";
import { USE_GOOGLE_ANALYTICS, GOOGLE_ANALYTICS_DEBUG } from "./_constants";

declare global {
  interface Window {
    ga?: Function;
  }
}

export function ga(hitType: string, value: string) {
  if (typeof window === "object" && typeof window.ga === "function") {
    window.ga("send", hitType, value);
  }
}

export function useGA(): (hitType: string, value: string) => void {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (USE_GOOGLE_ANALYTICS) {
        ga("pageview", url);
      }
    };
    // When the component is mounted, subscribe to router changes
    // and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return ga;
}

export function GAScripts() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-94373-1', 'auto');
ga('set', 'transport', 'beacon');
ga('send', 'pageview');`,
        }}
      ></script>

      <script
        src={`https://www.google-analytics.com/${
          GOOGLE_ANALYTICS_DEBUG ? "analytics_debug" : "analytics"
        }.js`}
        async
      ></script>
    </>
  );
}
