import { ConfirmPasswordType, RegistrationDetailsType } from "authtypes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validatePassword,
} from "utility/validationutils/authValidationUtils";
import { registerUser } from "../api/services";
import { PWD_WARN } from "../utility/miscsUtils";

const Register = () => {
  const [formValues, setFormValues] = useState<
    RegistrationDetailsType & ConfirmPasswordType
  >({} as RegistrationDetailsType & ConfirmPasswordType);
  const [errors, setErrors] = useState<
    Partial<RegistrationDetailsType & ConfirmPasswordType>
  >({} as Partial<RegistrationDetailsType & ConfirmPasswordType>);
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = formValues;

    const newErrors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };

    // Filter out empty error messages
    return Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value)
    ) as Partial<RegistrationDetailsType & ConfirmPasswordType>;
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handleSignupSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const { fullName, email, password } = formValues;
      const registrationDetails = { fullName, email, password };
      registerUser(registrationDetails)
        .then((response) => {
          if (response.status === 200) {
            navigate("/login");
          } else {
            setApiError(
              response.data.error || "An error occurred. Please try again."
            );
          }
        })
        .catch((error) => {
          setApiError("An error occurred. Please try again.");
        });
    }
  };

  return (
    <>
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

      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="card" style={{ width: "45rem" }}>
          <div className="card-body">
            <h1 className="d-flex justify-content-center mt-5 mb-5">
              SCRIBBLE
            </h1>
            <form onSubmit={handleSignupSubmit}>
              <div className="d-flex row justify-content-center">
                <div className="col-sm-9 form-floating mb-3">
                  <input
                    type="text"
                    className="form-control custom-input"
                    id="fullName"
                    name="fullName"
                    placeholder="Abc Xyz"
                    value={formValues.fullName}
                    onChange={handleChange}
                  />

                  <label htmlFor="fullName" className="custom-label">
                    Full Name
                  </label>
                  <div className="warning-text text-danger">
                    {errors.fullName}
                  </div>
                </div>

                <div className="col-sm-9 form-floating mb-3">
                  <input
                    type="text"
                    className="form-control custom-input"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email" className="custom-label">
                    Email
                  </label>
                  <div className="warning-text text-danger">{errors.email}</div>
                </div>
                <div className="col-sm-9 form-floating mb-3">
                  <input
                    type="password"
                    className="form-control custom-input"
                    id="password"
                    name="password"
                    placeholder="Abc@12345"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="password" className="custom-label">
                    Password
                  </label>
                  {errors.password ? (
                    <div className="warning-text text-danger">
                      {errors.password}
                    </div>
                  ) : (
                    <span className="warning-text">({PWD_WARN})</span>
                  )}
                </div>

                <div className="col-sm-9 form-floating mb-3">
                  <input
                    type="password"
                    className="form-control custom-input"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Abc@12345"
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                  />
                  <label htmlFor="confirmPassword" className="custom-label">
                    Confirm Password
                  </label>

                  <div className="warning-text text-danger">
                    {errors.confirmPassword}
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
                  onClick={navigateToLogin}
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
    </>
  );
};

export default Register;
