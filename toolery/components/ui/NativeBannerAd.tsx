"use client";

import { useEffect } from "react";

/**
 * NativeBannerAd — Adsterra "Native Banner" unit.
 *
 * Adsterra's invoke.js looks up its target container by this exact id and
 * injects the ad markup into it, so both the id and the script src must
 * stay in sync with what's issued in the Adsterra dashboard.
 *
 * The script is appended (and cleaned up) inside a useEffect rather than
 * pasted as a static <script> tag, because Next.js does client-side route
 * navigation — a static tag would only ever fire once for the whole
 * session. Re-adding it on every mount lets the banner refill correctly
 * whenever this component comes back into view.
 */
const SCRIPT_SRC =
  "https://pl30460856.effectivecpmnetwork.com/e20d64dad0794f832e5913c740a176cc/invoke.js";
const CONTAINER_ID = "container-e20d64dad0794f832e5913c740a176cc";

export default function NativeBannerAd() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = SCRIPT_SRC;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return <div id={CONTAINER_ID} className="w-full" />;
}
