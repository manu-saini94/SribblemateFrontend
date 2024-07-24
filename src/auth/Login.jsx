import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/services";
import {
  EMAIL_REGEX,
  EMAIL_RQD,
  EMAIL_WARN,
  PWD_REGEX,
  PWD_RQD,
  PWD_WARN,
} from "../miscsUtils";

const Login = ({ setToken }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const validateEmail = (email) => {
    if (!email) {
      return EMAIL_RQD;
    } else if (!EMAIL_REGEX.test(email)) {
      return EMAIL_WARN;
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return PWD_RQD;
    } else if (!PWD_REGEX.test(password)) {
      return PWD_WARN;
    }
    return "";
  };

  const validateForm = () => {
    const { email, password } = formValues;

    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    return Object.keys(newErrors).reduce((acc, key) => {
      if (newErrors[key]) acc[key] = newErrors[key];
      return acc;
    }, {});
  };

  const handleChange = (event) => {
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

  const handleLoginSubmit = (event) => {
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
              response.message || "An error occurred. Please try again."
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
                  {errors.email && (
                    <div className="warning-text text-danger">
                      {errors.email}
                    </div>
                  )}
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
                  {errors.password && (
                    <div className="warning-text text-danger">
                      {errors.password}
                    </div>
                  )}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
