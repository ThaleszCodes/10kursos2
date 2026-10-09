import React from 'react';
import { track } from '@vercel/analytics';

// The Pixel ID is a public identifier. Configure it in Vercel as VITE_META_PIXEL_ID.
const pixelId = (import.meta.env.VITE_META_PIXEL_ID || '').trim();
const consentKey = 'newgen-meta-marketing-consent';
const preferencesEvent = 'newgen:privacy-preferences';

type PixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: PixelFunction;
    _fbq?: PixelFunction;
  }
}

function initializeMetaPixel(): void {
  if (!/^\d{8,25}$/.test(pixelId) || window.fbq) return;

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  }) as PixelFunction;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  fbq('init', pixelId);
  fbq('track', 'PageView');
}

export function trackCheckoutClick(offer: string, placement: string): void {
  // This is a CTA interaction, NOT InitiateCheckout. Kiwify sends
  // InitiateCheckout when the customer actually opens their checkout.
  track('checkout_click', { offer, placement });

  try {
    if (localStorage.getItem(consentKey) === 'accepted') {
      window.fbq?.('trackCustom', 'CheckoutClick', { offer, placement });
    }
  } catch {
    // Storage can be unavailable in strict browsing modes.
  }
}

export function openPrivacyPreferences(): void {
  window.dispatchEvent(new Event(preferencesEvent));
}

export function hasMetaPixelConfigured(): boolean {
  return /^\d{8,25}$/.test(pixelId);
}

export const MetaPixelConsent: React.FC = () => {
  const [choice, setChoice] = React.useState<'accepted' | 'declined' | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!hasMetaPixelConfigured()) return;

    let saved: string | null = null;
    try {
      saved = localStorage.getItem(consentKey);
    } catch {
      // The banner remains visible if localStorage cannot be read.
    }
    if (saved === 'accepted') initializeMetaPixel();
    setChoice(saved === 'accepted' || saved === 'declined' ? saved : null);
    setVisible(saved !== 'accepted' && saved !== 'declined');

    const showPreferences = () => setVisible(true);
    window.addEventListener(preferencesEvent, showPreferences);
    return () => window.removeEventListener(preferencesEvent, showPreferences);
  }, []);

  if (!hasMetaPixelConfigured() || !visible) return null;

  const save = (next: 'accepted' | 'declined') => {
    try {
      localStorage.setItem(consentKey, next);
    } catch {
      // Allow visitors to continue without persistent storage.
    }
    setVisible(false);
    if (next === 'accepted') initializeMetaPixel();
    else if (choice === 'accepted') window.location.reload();
    setChoice(next);
  };

  return (
    <aside
      role="dialog"
      aria-label="Preferências de privacidade"
      className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-xl rounded-2xl border border-white/20 bg-[#211433] p-4 text-left text-white shadow-2xl sm:bottom-5"
    >
      <p className="text-sm font-semibold">Sua privacidade importa</p>
      <p className="mt-2 text-xs leading-relaxed text-gray-200">
        Com sua autorização, usamos o Pixel da Meta para medir visitas e a interação com nossos anúncios.
        Você pode recusar sem impedir o acesso à página ou à compra.
      </p>
      <div className="mt-3 flex flex-wrap justify-end gap-2">
        <button type="button" onClick={() => save('declined')} className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold hover:bg-white/10">
          Recusar
        </button>
        <button type="button" onClick={() => save('accepted')} className="rounded-full bg-purple-500 px-4 py-2 text-xs font-semibold text-white hover:bg-purple-400">
          Aceitar
        </button>
      </div>
    </aside>
  );
};
