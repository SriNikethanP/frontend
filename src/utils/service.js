import axios from "axios";

export const register = async (userData, setStatus, t) => {
  try {
    setStatus({ state: "loading", message: "" });

    const response = await axios.post(
      "https://api-internal.mosipcon.mosip.net/v1/selfregistration/create",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response:", response.data);

    if (response.data?.response?.status === "ACTIVATED") {
      setStatus({ state: "success", message: "Registration successful!" });
    } else {
      setStatus({
        state: "error",
        message: t("SELF_ERR-002"),
      });
    }
  } catch (error) {
    let errorMessage = t("SELF_ERR-002");

    if (error.response) {
      if (error.response.data?.errors[0].code === "SELF_ERR-001")
        setStatus({ state: "error", message: t("SELF_ERR-001") });
      else setStatus({ state: "error", message: t("SELF_ERR-002") });
    } else setStatus({ state: "error", message: errorMessage });

    console.error("Error:", errorMessage);
  }
};
