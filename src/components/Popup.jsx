import { useTranslation } from "react-i18next";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { TbLoader2 } from "react-icons/tb";

const SuccessPopup = ({ setShowSuccessPopup }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-[#0B1E48] bg-opacity-90 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md text-center border-green-600 border-t-4">
        {/* Right Symbol (✓) */}
        <div className="flex justify-center items-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-2xl">
              <RxCheck />
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">{t("congrats")}</h2>
        <p className="text-gray-600 mb-6 ">
          {t("uin_message")}
          {/* <span className="text-black-600 font-semibold"> {uin}</span> */}
          <br />
          {t("further_details")}
        </p>
        <button
          className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 w-full"
          onClick={() => setShowSuccessPopup(false)}
        >
          {t("okay")}
        </button>
      </div>
    </div>
  );
};
const ErrorPopup = ({ setShowSuccessPopup, message }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-[#0B1E48] bg-opacity-90 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-md text-center border-rose-600 border-t-4">
        {/* Cross Symbol (X) */}
        <div className="flex justify-center items-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-rose-600 text-2xl">
              <RxCross2 />
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">{t("error")}</h2>
        <p className="text-gray-600 mb-6 ">
          {/* {t("err_msg")} */}
          {message}
        </p>
        <button
          className="bg-rose-700 text-white px-6 py-2 rounded-lg hover:bg-rose-800 w-full"
          onClick={() => setShowSuccessPopup(false)}
        >
          {t("okay")}
        </button>
      </div>
    </div>
  );
};
const PopupLoader = () => {
  return (
    <div className="fixed inset-0 bg-[#0B1E48] bg-opacity-90 flex items-center justify-center">
      <div className="bg-white flex items-center justify-center rounded-xl p-8 w-full max-w-md text-center border-t-4">
        <TbLoader2 className="size-6 animate-spin text-gray-600 " />
      </div>
    </div>
  );
};

export { PopupLoader, SuccessPopup, ErrorPopup };
