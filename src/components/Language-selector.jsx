import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", lang: "English", dir: "ltr" },
  { code: "es", lang: "Spanish", dir: "ltr" },
  { code: "fr", lang: "French", dir: "ltr" },
  { code: "ar", lang: "Arabic", dir: "rtl" },
];
const LanguageSelector = () => {
  const { i18n } = useTranslation();


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    const selectedLang = languages.find((lang) => lang.code === lng);
    document.documentElement.setAttribute("dir", selectedLang?.dir || "ltr");
  };

  useEffect(() => {
    const currentLang = i18n.language;
    const selectedLang = languages.find((lang) => lang.code === currentLang);
    document.documentElement.setAttribute("dir", selectedLang?.dir || "ltr");
  }, [i18n.language]);

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
      {languages.map((language) => (
        <div
          key={language.code}
          onClick={() => changeLanguage(language.code)}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          {language.lang}
        </div>
      ))}
    </div>
  );
};
export default LanguageSelector;
