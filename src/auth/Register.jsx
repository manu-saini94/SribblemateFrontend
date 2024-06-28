import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/services";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const validateForm = () => {
    try {
      const newErrors = {};
      if (!email) {
        newErrors.email = "Email is required";
      } else if (/^[a-zA-Z0-9_.]+@[a-zA-Z0-9.-]+(.[a-zA-Z]+)+$/.test(email)) {
        newErrors.email = "Email address is invalid";
      }
      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      } else if (
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*W)(?!.* ).{8}$/.test(password)
      ) {
        newErrors.password =
          "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8 characters long";
      }
      return newErrors;
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSignupSubmit = async (event) => {
    // console.log("inside ");
    // const newErrors = validateForm();
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    // } else {
    const registrationDetails = { fullName, email, password };
    await registerUser(registrationDetails)
      .then((response) => {
        if (response.success) {
          navigate("/note");
        } else {
          setApiError(response.message);
        }
      })
      .catch((error) => {
        setApiError("An error occurred. Please try again.", error);
      });
    // }
  };

  const handleFullnameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    // if (!event.target.value) {
    //   errors.email = "Email is required";
    // } else if (
    //   /^[a-zA-Z0-9_.]+@[a-zA-Z0-9.-]+(.[a-zA-Z]+)+$/.test(event.target.value)
    // ) {
    //   errors.email = "Email address is invalid";
    // } else {
    setEmail(event.target.value);
    // }
  };

  const handlePasswordChange = (event) => {
    // if (!event.target.value) {
    //   errors.password = "Password is required";
    // } else if (
    //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*W)(?!.* ).{8}$/.test(
    //     event.target.value
    //   )
    // ) {
    //   errors.password =
    //     "Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8 characters long";
    // } else {
    setPassword(event.target.value);
    // }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      {apiError && (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {apiError}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="card" style={{ width: "45rem" }}>
        <div className="card-body">
          <h1 className="d-flex justify-content-center mt-5 mb-5">
            SCRIBBLE MATE
          </h1>
          <form onSubmit={() => handleSignupSubmit()}>
            <div className="d-flex row justify-content-center">
              <div className="mb-4 row">
                <label
                  htmlFor="fullName"
                  className="col-sm-2 d-flex justify-content-end col-form-label fw-medium"
                >
                  Full Name :
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    onChange={(e) => handleFullnameChange(e)}
                  />
                </div>
              </div>
              <div className="mb-4 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 d-flex justify-content-end col-form-label fw-medium"
                >
                  Email :
                </label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    id="staticEmail"
                    onChange={(e) => handleEmailChange(e)}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
              </div>
              <div className="mb-4 row">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-2 d-flex justify-content-end col-form-label fw-medium"
                >
                  Password :
                </label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    onChange={(e) => handlePasswordChange(e)}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                  <span style={{ fontSize: "14px" }} className="fw-light">
                    (Password must contain one digit from 1 to 9, one lowercase
                    letter, one uppercase letter, one special character, no
                    space, and it must be 8 characters long)
                  </span>
                </div>
              </div>

              <div className="d-flex justify-content-center mb-3">
                <button type="submit" className="btn btn-warning">
                  SIGN UP
                </button>
              </div>
              <span className="d-flex justify-content-center fs-6 fw-light">
                Already have an account?
              </span>
              <div
                className="d-flex justify-content-center"
                onClick={() => navigateToLogin()}
              >
                <button type="button" className="btn btn-link">
                  LOG IN
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
