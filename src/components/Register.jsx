import React, { useState, useRef } from "react";
import Preview from "./Preview";
import { ErrorPopup, PopupLoader, SuccessPopup } from "./Popup";
import { useTranslation } from "react-i18next";
import { register } from "../utils/service";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(""); // State for Base64 image
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewData, setPreviewData] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [status, setStatus] = useState({ state: "idle", message: "idle" }); // idle-success-error-loading

  // const [uin, setUin] = useState("");
  const fileInputRef = useRef(null);

  const { t } = useTranslation();

  // Function to generate a unique UIN
  // const generateUIN = () => `UIN-${Date.now().toString().slice(-6)}`;
  const { i18n } = useTranslation();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = async () => {
    setCameraOn(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks(); // Ensure tracks exist before stopping
      tracks.forEach((track) => track.stop()); // Stop each track
      videoRef.current.srcObject = null; // Clear video source
    }

    // Update state after stopping the camera
    setCameraOn(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageData = canvasRef.current.toDataURL("image/png"); // Convert to Base64
      setSelectedImage(imageData); // Store captured image
      setBase64Image(imageData); // Store Base64 for backend submission
      stopCamera(); // Stop the camera after capturing
    }
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // For preview
      setSelectedImage(imageUrl);

      // Convert the file to Base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result; // Base64 string
        setBase64Image(base64String); // Store Base64 string in state
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file); // Read the file as Base64
    } else {
      setSelectedImage(null); // Clear selected image if no file is chosen
      setBase64Image(""); // Clear Base64 image
    }
  };

  // Function to trigger file input when div is clicked
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!fullName.trim()) {
      newErrors.fullName = t("err_fn");
    }

    // Mobile number validation
    if (mobileNumber) {
      if (!/^\d+$/.test(mobileNumber)) {
        newErrors.mobileNumber = t("err_mn_n");
      } else if (mobileNumber.length < 8 || mobileNumber.length > 15) {
        newErrors.mobileNumber = t("err_mn_digits");
      }
    }
    // Date of Birth validation
    if (!dateOfBirth) {
      newErrors.dateOfBirth = t("err_dob");
    } else if (new Date(dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = t("err_dob_ftr");
    }

    if (!email.trim()) {
      newErrors.email = t("err_eml");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t("err_eml_inv");
    }

    if (!selectedImage) {
      newErrors.photo = t("err_pht");
    }

    // Consent validation
    if (!consent) {
      newErrors.consent = t("err_cnst");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission for preview
  const handlePreview = () => {
    if (validateForm()) {
      setPreviewData({
        fullName,
        dateOfBirth,
        mobileNumber,
        email,
        gender,
        address,
        selectedImage,
      });
    }
  };

  // Function to clear the form
  const handleClear = () => {
    setFullName("");
    setDateOfBirth("");
    setMobileNumber("");
    setEmail("");
    setGender("");
    setAddress("");
    setSelectedImage(null);
    setConsent(false);
    setErrors({});
    setBase64Image("");
  };
  const deletePhoto = () => {
    setSelectedImage(null);
    setBase64Image(""); // Clear Base64 image
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
    stopCamera(); // Stop camera if it's on
  };
  // Function to handle submit button click
  const handleSubmit = async () => {
    if (!validateForm()) return; // Validate the form before submission

    // const newUIN = generateUIN(); // Generate a unique UIN
    // setUin(newUIN); // Set the UIN in state
    setShowSuccessPopup(true); // Show success popup
    setPreviewData(null); // Close the preview popup
    handleClear(); // Clear the form

    const langs = {
      en: "eng",
      es: "spa",
      fr: "fre",
      ar: "ara",
    };
    // Prepare the userData object
    const userData = {
      fullName: [
        {
          language: langs[i18n.language],
          value: fullName,
        },
      ],
      phone: `${mobileNumber}`,
      email: email,
      dateOfBirth: dateOfBirth,
      gender: [
        {
          language: langs[i18n.language],
          value: gender,
        },
      ],
      address: [
        {
          language: langs[i18n.language],
          value: address,
        },
      ],
      photo: base64Image, // Use the Base64 string here
    };
    // Send data to backend through API
    register(userData, setStatus);
  };

  return (
    <div className="min-h-screen bg-[#0B1E48] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8">
        <h2 className="text-2xl font-semibold">{t("title")}</h2>
        <p className="text-gray-600 text-sm mb-6">{t("description")}</p>

        <form className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  {t("name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mt-1"
                  placeholder="Enter Full Name Here"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">{errors.fullName}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">
                  {t("date_of_birth")}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full border rounded p-2 mt-1"
                  value={dateOfBirth}
                  max={new Date().toISOString().split("T")[0]} // Restrict future dates
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">
                  {t("phone")}
                </label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mt-1"
                  placeholder="Enter 8 to 15 digits"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                {errors.mobileNumber && (
                  <p className="text-red-500 text-sm">{errors.mobileNumber}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">
                  {t("email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border rounded p-2 mt-1"
                  placeholder="Enter Email Here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  {t("photo")} <span className="text-red-500">*</span>
                </label>
                <div
                  className="border rounded-xl p-4 text-center flex flex-col items-center justify-center h-32 cursor-pointer"
                  style={{ width: "230px", height: "155px" }}
                >
                  {selectedImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={selectedImage}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePhoto();
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : cameraOn ? (
                    <div className="relative w-full h-full">
                      <video
                        ref={videoRef}
                        autoPlay
                        className="w-full h-full object-cover rounded-lg border"
                      ></video>
                    </div>
                  ) : (
                    <div onClick={handleUploadClick}>
                      <img
                        src="https://img.icons8.com/ios/50/000000/upload-to-cloud.png"
                        alt="Upload"
                        className="block border rounded-lg h-8 w-8 mb-2 p-1"
                      />
                      <p className="text-gray-500 text-sm">
                        <span className="text-blue-600 font-semibold">
                          {t("upload_photo")}
                        </span>{" "}
                        {t("photo_description")}
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                {errors.photo && (
                  <p className="text-red-500 text-sm">{errors.photo}</p>
                )}
                {cameraOn ? (
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="bg-green-600 max-w-40 text-white px-4 py-2 rounded-lg mt-4"
                  >
                    {t("capture_photo")}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startCamera}
                    className="bg-blue-600 max-w-40 text-white px-4 py-2 rounded-lg mt-4"
                  >
                    {t("capture_photo")}
                  </button>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">
                  {t("gender")}
                </label>{" "}
                {/* Removed * */}
                <select
                  className="w-full border rounded p-2 mt-1"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>{t("select")}</option>
                  <option>{t("male")}</option>
                  <option>{t("female")}</option>
                  <option>{t("other")}</option>
                </select>
              </div>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            className="hidden"
            width={320}
            height={240}
          ></canvas>

          <div className="mb-4" style={{ width: "100%" }}>
            <label className="block text-sm font-medium">{t("address")}</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              // placeholder="Enter Address Here"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </form>

        <div className="mt-4 text-sm">
          <p>{t("details")}</p>
          <input
            type="checkbox"
            className="mr-2"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          {t("consent")}
          {errors.consent && (
            <p className="text-red-500 text-sm">{errors.consent}</p>
          )}
        </div>

        <div className="flex sm:flex-col md:justify-end md:flex-row mt-6 ">
          <button
            className="border-2 px-4 py-2 rounded border-blue-300 text-blue-400 xl:mr-6 sm:mb-4 md:mb-0 "
            onClick={handleClear}
          >
            {t("clear")}
          </button>
          <button
            className={`bg-blue-600 text-white px-4 py-2 rounded ${
              !(fullName && dateOfBirth && email && selectedImage && consent)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              !(fullName && dateOfBirth && email && selectedImage && consent)
            }
            onClick={handlePreview}
          >
            {t("preview")}
          </button>
        </div>

        {/* Preview Popup */}
        {previewData && (
          <Preview
            handleSubmit={handleSubmit}
            setPreviewData={setPreviewData}
            previewData={previewData}
          />
        )}

        {/* Success Popup */}
        {showSuccessPopup &&
          (status.state === "success" ? (
            <SuccessPopup setShowSuccessPopup={setShowSuccessPopup} />
          ) : status.state === "error" ? (
            <ErrorPopup
              message={status.message}
              setShowSuccessPopup={setShowSuccessPopup}
            />
          ) : status.state === "loading" ? (
            <PopupLoader />
          ) : null)}
      </div>
    </div>
  );
};

export default Register;
