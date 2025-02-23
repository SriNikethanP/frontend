import React, { useState } from "react";
import background from "../assets/MOSIP_Horizontal_Black.png";
import { VscGlobe } from "react-icons/vsc";
import LanguageSelector from "./Language-selector";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const { i18n } = useTranslation();
  const languages = {
    en: "English",
    es: "Spanish",
    fr: "French",
    ar: "Arabic",
  };
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md h-18 flex items-center justify-between px-6 z-10">
      {/* MOSIP Logo on the left */}
      <div className="flex items-center">
        <img
          src={background}
          alt="MOSIP Logo"
          className="h-16" // Adjust height as needed
        />
      </div>
      {/* Language Dropdown on the right */}
      <div
        className="relative"
        onClick={() => setIsDropdownOpen((prev) => !prev)} // Open dropdown on hover
      >
        <button className="flex items-center text-blue-700 hover:text-blue-600 focus:outline-none">
          <VscGlobe
            data-testid="Language-Selector-Icon font-semibold"
            size={28}
            color={"var(--iw-color-languageGlobeIcon)"}
          />
          <span
            className="ml-2 text-black-600 font-semibold"
            style={{ color: "black" }}
          >
            {languages[i18n.language]}
          </span>
          <svg
            className="w-4 h-4 ml-2"
            fill="blue"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && <LanguageSelector />}
      </div>
    </div>
  );
};

export default Banner;
