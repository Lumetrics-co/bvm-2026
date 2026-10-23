import { t } from "@/lib/i18n";

export default function SkipLink() {
  return (
    <a href="#main-content" className="a11y-skip-link">
      {t("Providers.skipToMainContent")}
    </a>
  );
}
