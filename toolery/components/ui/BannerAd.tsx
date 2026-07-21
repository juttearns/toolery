"use client";

import { useEffect, useRef } from "react";

/**
 * BannerAd — Adsterra "Banner" unit (highperformanceformat.com).
 *
 * This ad format's invoke.js uses document.write() to inject its iframe.
 * document.write() is only safe while a document is still being parsed —
 * calling it on the *main* page after React has already mounted can wipe
 * the whole DOM. So instead of injecting the script straight into the
 * page, we build a small standalone HTML document (with the two script
 * tags Adsterra gave us) and write *that* into a same-origin-safe child
 * <iframe>. document.write() then only ever touches the iframe's own
 * document, never the real page.
 */
const KEY = "8a793a8710c56816a374a2a292a6f8bb";
const WIDTH = 300;
const HEIGHT = 250;

export default function BannerAd() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(`<!DOCTYPE html>
<html>
  <head>
    <style>html,body{margin:0;padding:0;overflow:hidden;background:transparent;}</style>
  </head>
  <body>
    <script>
      atOptions = {
        'key': '${KEY}',
        'format': 'iframe',
        'height': ${HEIGHT},
        'width': ${WIDTH},
        'params': {}
      };
    <\/script>
    <script src="https://www.highperformanceformat.com/${KEY}/invoke.js"><\/script>
  </body>
</html>`);
    doc.close();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="Advertisement"
      width={WIDTH}
      height={HEIGHT}
      style={{ border: "none", overflow: "hidden", display: "block" }}
      scrolling="no"
    />
  );
}
