import React from "react";
import { useTranslation } from "react-i18next";
import "./translations/i18n";
 
export const Example = () => {
const { t } = useTranslation();
 
 return (
   <div>
      <p>
        {t("welcome")}
      </p>
      <p>
        {t("date_format_one", { date: new Date() })}
      </p>
      <p>
        {t("date_format_two", { date: new Date() })}
      </p>
   </div>
 );
};