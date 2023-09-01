import React, { useState, useEffect } from 'react';

const CookieConsentBanner = () => {
  const [hasConsented, setHasConsented] = useState(null);

  // Check for existing consent in local storage
  useEffect(() => {
    const existingConsent = localStorage.getItem("cookieConsent");
    if (existingConsent !== null) {
      setHasConsented(existingConsent === "true");
    }
  }, []);

  // Handle user's click on 'Yes' or 'No'
  const handleConsent = (consent) => {
    localStorage.setItem("cookieConsent", consent);
    setHasConsented(consent);

    if (consent) {
      loadGoogleAnalytics();
    }
  };

  // Load Google Analytics script if user consents
  const loadGoogleAnalytics = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-B1809J6FHJ";
    document.head.appendChild(script);

    script.onload = function() {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-B1809J6FHJ');
    };
  };

  // If user hasn't yet given consent, show the banner
  if (hasConsented === null) {
    return (
        <div id="cookie-consent-banner">
        <p>We use cookies to improve your experience. Do you consent to the use of Google Analytics for data collection?</p>
        <div>
          <button onClick={() => handleConsent(true)}>Yes</button>
          <button onClick={() => handleConsent(false)}>No</button>
        </div>
        <div>
          <small>Note: Conversations are anonymously stored for service improvement and processed by OpenAI. This is mandatory and not optional.</small>
        </div>
      </div>
      
    );
  }

  // If user has already given consent, don't show anything
  return null;
};

export default CookieConsentBanner;
