import { useTranslation } from "react-i18next";

const Preview = ({ previewData, handleSubmit, setPreviewData }) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 lg:px-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-start ">{t("confirm")}</h2>
        <hr className="border-t border-gray-400 my-4" />
        <div className="flex flex-row md:flex-row gap-6 p-8">
          {/* Left Column for Details */}
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("name")}
              </label>
              <p className="mt-1 text-lg font-bold">{previewData.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("date_of_birth")}
              </label>
              <p className="mt-1 text-lg font-bold">
                {previewData.dateOfBirth}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("gender")}
              </label>
              <p className="mt-1 text-lg font-bold">{previewData.gender}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("email")}
              </label>
              <p className="mt-1 text-lg font-bold">{previewData.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("address")}
              </label>
              <p className="mt-1 text-lg font-bold">{previewData.address}</p>
            </div>
          </div>

          {/* Right Column for Photo and Mobile Number */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="w-32 h-32 rounded-lg overflow-hidden">
              <label className="block text-sm font-medium text-gray-700">
                {t("photo")}
              </label>
              {previewData.selectedImage && (
                <img
                  src={previewData.selectedImage}
                  alt="Uploaded"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("phone")}
              </label>
              <p className="mt-1 text-lg font-bold">
                {previewData.mobileNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-8 space-x-4">
          <button
            className="border border-gray-300 text-gray-700 px-6 py-2 mx-2 rounded-lg hover:bg-gray-50"
            onClick={() => setPreviewData(null)}
          >
            {t("cancel")}
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 mx-2 rounded-lg hover:bg-blue-700"
            onClick={handleSubmit}
          >
            {t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
