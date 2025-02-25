import axios from "axios";


export const register = async (userData, setStatus) => {
  // console.error("Sending request:", userData);

  try {
    setStatus({ state: "loading", message: "" });

    const response = await axios.post(
      "http://localhost:8080/selfregistration/create",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          
        },
      }
    );
    console.log("success");
    console.log("API Response:", response.data);

    if (response.data?.response?.status === "ACTIVATED") {
      setStatus({ state: "success", message: "Registration successful!" });
    } else if (response.data?.response === null) {
      if (response.data?.errors[0].errorCode === "SELF_ERR-001")
        setStatus({ state: "error", message: "SELF_ERR-001" });
      else if (response.data?.errors[0].errorCode === "SELF_ERR-002")
        setStatus({ state: "error", message: "SELF_ERR-002" });
      else setStatus({ state: "error", message: "SELF_ERR-003" });
    }
  } catch (error) {
    console.error("Error:", error);
    let errorMessage = "SELF_ERR-003";

    if (error.response) {
      if (error.response.data?.errors[0].errorCode === "SELF_ERR-001")
        setStatus({ state: "error", message: "SELF_ERR-001" });
      else setStatus({ state: "error", message: "SELF_ERR-002" });
    } else setStatus({ state: "error", message: errorMessage });

    console.error("Error:", errorMessage);
  }
};
