// 参照サイト：https://lokalise.com/blog/how-to-internationalize-react-application-using-i18next/
// 参照GitHub：https://github.com/ShanikaNishadhi/React-Application-With-i18next/blob/main/src/translations/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import moment from "moment";

import { TRANSLATIONS_ES } from "./es/translations";
import { TRANSLATIONS_ZH } from "./zh/translations";
import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_ARAB } from "./arab/translations";

// 時刻の設定
i18n.init({
  interpolation: {
    format: function (value, format, lng) {
      if (value instanceof Date) return moment(value).format(format);
      if (typeof value === "number") return new Intl.NumberFormat().format(value);
      return value;
    }
  }
});

// 言語ファイル設定
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_EN
      },
      zh: {
        translation: TRANSLATIONS_ZH
      },
      arab: {
        translation: TRANSLATIONS_ARAB
      },
      es: {
        translation: TRANSLATIONS_ES
      }
  }
});

i18n.changeLanguage("arab");

export { i18n };