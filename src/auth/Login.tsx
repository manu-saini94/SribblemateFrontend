import { LoginCredentialsType, LoginPropsType } from "authtypes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePassword,
} from "utility/validationutils/authValidationUtils";
import { loginUser } from "../api/services";
import withAuth from "./withAuth";

const Login = ({ setToken }: LoginPropsType) => {
  const [formValues, setFormValues] = useState<LoginCredentialsType>(
    {} as LoginCredentialsType
  );

  const [errors, setErrors] = useState<Partial<LoginCredentialsType>>(
    {} as Partial<LoginCredentialsType>
  );

  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const validateForm = (): Partial<LoginCredentialsType> => {
    const { email, password } = formValues;
    const newErrors: Partial<LoginCredentialsType> = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    return Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value)
    ) as Partial<LoginCredentialsType>;
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

  const handleLoginSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const { email, password } = formValues;
      const loginDetails = { email, password };
      loginUser(loginDetails)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.token) {
              localStorage.setItem("token", response.data.token);
              setToken(response.data.token); // Update the token state
              navigate("/note");
            } else {
              setApiError(response.data.message || "Invalid credentials");
            }
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

      <form onSubmit={handleLoginSubmit}>
        <div className="d-flex row justify-content-center">
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

            <div className="warning-text text-danger">{errors.password}</div>
          </div>

          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-warning">
              LOG IN
            </button>
          </div>
          <span className="d-flex justify-content-center fs-6 fw-light">
            Don't have an account?
          </span>
          <div
            className="d-flex justify-content-center"
            onClick={navigateToSignup}
          >
            <button type="button" className="btn btn-link">
              SIGN UP
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default withAuth(Login);
