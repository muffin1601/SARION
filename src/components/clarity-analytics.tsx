import Script from "next/script";

const CLARITY_PROJECT_ID = "xi3ar2t0rz";

/**
 * Microsoft Clarity. Renders only in production, same as the other
 * analytics scripts in the root layout.
 */
export function ClarityAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
      `}
    </Script>
  );
}
