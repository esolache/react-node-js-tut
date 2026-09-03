import { useEffect, useRef } from "react";

// Calendly's inline widget embed. The official pattern is: load their
// widget.js script once, then render a div with class "calendly-inline-widget"
// and a data-url pointing at your scheduling page -- their script finds
// that div and mounts an iframe into it.
const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL;

export default function BookOnline() {
  const widgetRef = useRef(null);

  useEffect(() => {
    // Avoid injecting the script twice if this component re-mounts
    // (e.g. React StrictMode in dev renders effects twice).
    const existingScript = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.Calendly && widgetRef.current) {
      // Script already loaded from a previous mount -- just re-init the
      // widget into this div manually.
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: widgetRef.current,
      });
    }
  }, []);

  if (!CALENDLY_URL) {
    return (
      <main className="px-6 py-16 max-w-[800px] mx-auto">
        <h1 className="text-3xl font-black text-neutral-900">Book Online</h1>
        <p className="mt-3 text-red-600">
          VITE_CALENDLY_URL is not set — add your Calendly scheduling link to
          frontend/.env to enable booking.
        </p>
      </main>
    );
  }

  return (
    <main className="px-6 py-16 max-w-[900px] mx-auto">
      <h1 className="text-3xl font-black text-neutral-900 mb-6">Book Online</h1>

      <div
        ref={widgetRef}
        className="calendly-inline-widget"
        data-url={CALENDLY_URL}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </main>
  );
}