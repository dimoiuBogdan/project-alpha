"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  COOKIE_CATEGORIES,
  DEFAULT_PREFERENCES,
  hasUserMadeChoice,
  savePreferences,
  type CookiePreferences,
} from "./cookieUtils";

const CookieConsent = () => {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const t = useTranslations("cookies.banner");
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    // Check if user has already made a choice
    if (!hasUserMadeChoice()) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    const acceptedPreferences: CookiePreferences = {
      ...DEFAULT_PREFERENCES,
      [COOKIE_CATEGORIES.ANALYTICS]: true,
      [COOKIE_CATEGORIES.MARKETING]: true,
      [COOKIE_CATEGORIES.PREFERENCES]: true,
    };

    savePreferences(acceptedPreferences);
    setShowBanner(false);
    // Enable analytics
    window.localStorage.setItem("analytics-enabled", "true");
    // Reload to apply changes
    window.location.reload();
  };

  const handleReject = () => {
    savePreferences(DEFAULT_PREFERENCES);
    setShowBanner(false);
    // Disable analytics
    window.localStorage.setItem("analytics-enabled", "false");
    // Reload to apply changes
    window.location.reload();
  };

  // Don't render anything until client-side hydration is complete
  if (!mounted) return null;
  if (!showBanner) return null;
  if (pathname.includes("cookie-preferences")) return null;

  return (
    <div
      suppressHydrationWarning
      className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-[var(--main-dark)] bg-[var(--main-lightest)] p-4 shadow-lg md:p-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <h2
              suppressHydrationWarning
              className="mb-2 text-lg font-semibold text-[var(--main-darker)]"
            >
              {t("title")}
            </h2>
            <p
              suppressHydrationWarning
              className="text-sm text-[var(--main-dark)]"
            >
              {t("description")}
            </p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <Link
              href="/cookie-preferences"
              className="text-[var(--main-darker)] underline"
            >
              {t("cookieLink")}
            </Link>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <Link
              href="/privacy-policy"
              className="text-[var(--main-darker)] underline"
            >
              {t("privacyLink")}
            </Link>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <Link
              href="/cookie-preferences"
              className="cursor-pointer rounded-md border text-center border-[var(--main-darker)] px-4 py-2 text-sm font-medium text-[var(--main-darker)] hover:bg-[var(--main-lighter)]"
            >
              {t("customize")}
            </Link>
            <button
              onClick={handleReject}
              className="cursor-pointer rounded-md border border-[var(--main-darker)] px-4 py-2 text-sm font-medium text-[var(--main-darker)] hover:bg-[var(--main-lighter)]"
            >
              {t("rejectAll")}
            </button>
            <button
              onClick={handleAccept}
              className="cursor-pointer rounded-md bg-[var(--main-darker)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--main-dark)]"
            >
              {t("acceptAll")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
